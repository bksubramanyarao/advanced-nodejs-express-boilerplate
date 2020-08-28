require('dotenv').config();

const mongodb_con_url = 'mongodb://localhost:27017/advanced-nodejs-express-boilerplate';
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const reqFlash = require('req-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const mailer = require('express-mailer');
const fileUpload = require('express-fileupload');
const passport = require('passport');




const user_routes = require('./routes/user');
const web_routes = require('./routes/web');



/* ========= config start ========= */
app.locals.APP_URL = process.env.APP_URL;

app.disable('x-powered-by');


app.use(session({
	secret: process.env.APP_KEY,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000 * 60, //1h
		httpOnly: true,
		sameSite: 'strict'
	}
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(cookieParser());

// view engine setup
app.set('views', ['Views']);
app.set('view engine', 'ejs');

// static assets like css, js, icons, fonts
app.use(express.static('public'));

// smtp config
mailer.extend(app, {
	from: process.env.MAIL_FROM,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	transportMethod: process.env.MAIL_DRIVER,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD
	}
});

// file upload config
app.use(fileUpload({
	createParentPath: true
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(reqFlash({ locals: 'flash' }));


// csrf config
app.use(csurf());

// globals
app.use((req, res, next) => {
	console.info(req.session);

	res.locals.csrfToken = req.csrfToken();
	res.locals.isUser = req.isAuthenticated();
	res.locals.isGuest = req.isUnauthenticated();
	next();
});

/* ========= config end ========= */

// routes start
app.use(user_routes);
app.use(web_routes);
// routes end

app.use((err, req, res, next) => {
	if (process.env.APP_DEBUG === true) console.log(err);
	res.status(500).render('page/500');
});


// connect db and start server
async function main() {
	try {
		await mongoose.connect(
			mongodb_con_url,
			{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
		);
		app.listen(process.env.PORT, 'localhost', () => {
			console.log(`http://localhost:${process.env.PORT}/`);
		});
	} catch (err) {
		console.log(err);
	}
};
main();
