const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { body, param, query, validationResult } = require('express-validator');


const BlogPost = require('../Models/BlogPost');


/**
 ** ROUTE_FILE: user.js
 ** URL: /blog
 */
exports.getBlogIndexValidation = [
	// query('', '')
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog
 ** DESCRIPTION: lists blog posts
 */
exports.getBlogIndex = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('blog/blog-index', {
			errors: errors.array()
		});
	}

	const page_id = parseInt(req.query.page_id) || 1;
	try {
		const blog = await BlogPost.paginate({},
			{ page: page_id }
		);

		res.status(200).render('blog/blog-index', {
			blog: blog.docs, totalPages: blog.totalPages, page: blog.page
		});
	} catch (err) {
		next(err);
	}
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/create
 ** DESCRIPTION: creates new blog post page
 */
exports.getBlogCreate = async (req, res, next) => {
	try {
		res.status(200).render('blog/blog-create');
	} catch (err) {
		next(err);
	}
};

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog
 */
exports.postBlogStoreValiation = [
	body('post_title', 'Please enter post title')
		.trim()
		.escape()
		.isLength({ min: 4, max: 26 }),
	body('post_slug', 'Please enter post slug')
		.trim()
		.escape()
		.isSlug()
		.isLength({ min: 4, max: 26 }),
	body('post_body', 'Please enter post body')
		.trim()
		.escape()
		.isLength({ min: 1, max: 500 })
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog
 ** DESCRIPTION: store new blog post
 */
exports.postBlogStore = async (req, res, next) => {
	const errors = validationResult(req);
	const mongo_id = mongoose.Types.ObjectId();
	const user_id = req.user._id;
	if (!errors.isEmpty()) {
		return res.status(422).render('blog/blog-create', {
			errors: errors.array()
		});
	}

	let { post_title, post_slug, post_body } = req.body;
	try {
		const blog = {
			_id: mongo_id, user_id, post_title, post_slug, post_body
		};

		const new_blog = await BlogPost.create(blog);

		req.flash('success_msg', 201);
		res.status(201).redirect(`/blog`);
	} catch (err) {
		next(err);
	}
};

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 */
exports.getBlogShowValidation = [
	// param('', '')
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 ** DESCRIPTION: show single blog post
 */
exports.getBlogShow = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('blog/blog-show', {
			errors: errors.array()
		});
	}

	const { blog_id } = req.params;
	try {
		const blog = await BlogPost.findById(blog_id)
		res.status(200).render('blog/blog-show', { blog });
	} catch (err) {
		next(err);
	}
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog/edit_id
 */
exports.getBlogEditValidation = [
	// param('', '')
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog/edit_id
 ** DESCRIPTION: edit blog post page
 */
exports.getBlogEdit = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('blog/blog-edit', {
			errors: errors.array()
		});
	}

	const { blog_id } = req.params;
	try {
		const blog = await BlogPost.findById(blog_id);

		res.status(200).render('blog/blog-edit', { blog });
	} catch (err) {
		next(err);
	}
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 */
exports.putBlogUpdateValidation = [
	body('post_title', 'Please enter post title')
		.trim()
		.escape()
		.isLength({ min: 4, max: 26 }),
	body('post_slug', 'Please enter post slug')
		.trim()
		.escape()
		.isSlug()
		.isLength({ min: 4, max: 26 }),
	body('post_body', 'Please enter post body')
		.trim()
		.escape()
		.isLength({ min: 1, max: 500 })
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 ** DESCRIPTION: update blog post
 */
exports.putBlogUpdate = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('blog/blog-edit', {
			errors: errors.array()
		});
	}
	const { blog_id } = req.params;

	let { post_title, post_slug, post_body } = req.body;
	try {
		const blog = {
			post_title, post_slug, post_body
		};

		const updated_blog = await BlogPost.findByIdAndUpdate(blog_id, blog);

		req.flash('success_msg', 200);
		res.status(200).redirect(`/blog`);
	} catch (err) {
		next(err);
	}
};


/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 */
exports.deleteBlogDestroyValidation = [
	// param('', '')
];

/**
 ** ROUTE_FILE: user.js
 ** URL: /blog/:blog_id
 ** DESCRIPTION: delete blog post
 */
exports.deleteBlogDestroy = async (req, res, next) => {
	const { blog_id } = req.params;
	try {
		await BlogPost.findByIdAndDelete(blog_id);
		res.status(200).redirect(`/blog`);
	} catch (err) {
		next(err);
	}
};





