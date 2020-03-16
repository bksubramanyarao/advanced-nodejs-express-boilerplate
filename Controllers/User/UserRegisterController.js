

const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');




const User = require('../../Models/User/User');



/**
 ** ROUTE_FILE: user.js
 ** URL: /register
 ** DESCRIPTION: user register page
 */
exports.getRegisterIndex = async (req, res, next) => {
	res.status(200).render('auth/register');
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /register
 */
exports.postUserRegisterValidation = [
	body('email', 'Invlid email')
		.isEmail()
		.normalizeEmail()
		.custom(async (email) => {
			let user = await User.findOne({ email });
			if (user) {
				throw new Error('E-mail already in use');
			}
		}),
	body('password', 'Invlid password')
		.trim()
		.isLength({ min: 4 })
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /register
 ** DESCRIPTION: registers a new user to db
 */
exports.postUserRegister = async (req, res, next) => {
	const mongo_id = mongoose.Types.ObjectId();
	var { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render(
			'auth/register', { flash: { errors: errors.array() } }
		);
	}
	try {
		password = await bcryptjs.hash(password, 12);
		const new_user = await User.create({
			_id: mongo_id, email, password
		});

		req.flash('success', 201);
		res.status(201).redirect('/register');
	} catch (err) {
		next(err);
	}
};
