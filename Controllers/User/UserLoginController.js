

const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');



const User = require('../../Models/User/User');



/**
 ** ROUTE_FILE: user.js
 ** URL: /login
 ** DESCRIPTION: passport local authentication strategy
 */
passport.use(
	'user',
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: 'That email is not registered' });
			}
			const isPasswordMatch = await bcrypt.compare(password, user.password);
			if (isPasswordMatch) {
				delete user._doc.password;
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (err) {
			return done(null, false, { message: err });
		}
	})
);
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});


/**
 ** ROUTE_FILE: user.js
 ** URL: /login
 ** DESCRIPTION: user login page
 */
exports.getLoginIndex = async (req, res, next) => {
	res.status(200).render('auth/login');
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /login
 */
exports.postUserLoginValidation = [
	body('email', 'Invalid email')
		.isEmail()
		.normalizeEmail(),
	body('password', 'Invalid password')
		.trim()
		.isLength({ min: 4 })
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /login
 ** DESCRIPTION: logins a user
 */
exports.postUserLogin = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	passport.authenticate('user', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (user) {
			let { _id, email } = user;
			req.session.passport = {
				user: {
					_id, email
				}
			};
			req.session.save((err) => {
				res.status(201).redirect('/profile');
			});
		} else {
			res.status(409).render('auth/login', {
				errors: [{ msg: info.message }]
			});
		}
	})(req, res, next);
};

exports.deleteUserLogout = async (req, res, next) => {
	try {
		delete req.session.passport;
		res.status(200).redirect('/');
	} catch (err) {
		next(err);
	}
};
