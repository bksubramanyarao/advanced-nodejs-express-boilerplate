
/**
 ** ROUTE_FILE: web.js
 ** URL: /
 ** DESCRIPTION: home page
 */
exports.getHome = async (req, res, next) => {
	try {
		res.status(200).render('page/home');
	} catch (err) {
		next(err);
	}
};


/**
 ** ROUTE_FILE: web.js
 ** URL: /about
 ** DESCRIPTION: about page
 */
exports.getAbout = (req, res, next) => {
	res.status(200).render('page/about');
};

