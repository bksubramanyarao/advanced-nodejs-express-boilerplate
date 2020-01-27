const mongodbConUrl = 'mongodb://localhost:27017/advanced-nodejs-express-boilerplate';
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const mailer = require('express-mailer');
const fileUpload = require('express-fileupload');
const passport = require('passport');




const user_routes = require('./routes/user');
const web_routes = require('./routes/web');



/* ========= config start ========= */
app.locals.main_url = 'http://localhost:3000';

app.disable('x-powered-by');


app.use(session({
  secret: 'foo',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 600 } //10h
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
  from: 'no-reply@example.com',
  host: 'smtp.mailtrap.io',
  port: 2525,
  transportMethod: 'SMTP',
  auth: {
    user: "1b72de9adecbe9",
    pass: "f5f2cb92f0d419"
  }
});

// file upload config
app.use(fileUpload({
  createParentPath: true
}));


app.use(passport.initialize());
app.use(passport.session());


// csrf config
app.use(csurf());

// globals
app.use((req, res, next) => {
  // console.info(req.session);
  res.locals.csrfToken = req.csrfToken();
  next();
});

/* ========= config end ========= */

// routes start
app.use(user_routes);
app.use(web_routes);
// routes end

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render('page/500');
});


const PORT = process.env.PORT || 3000;
// db connect
mongoose.connect(mongodbConUrl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, (result) => {
      console.log(`http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
