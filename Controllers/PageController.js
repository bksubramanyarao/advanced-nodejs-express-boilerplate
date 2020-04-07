


/**
 ** ROUTE_FILE: web.js
 ** URL: /
 ** DESCRIPTION: home page
 */
exports.getHome = (req, res, next) => {
	res.status(200).render('page/home');
};


/**
 ** ROUTE_FILE: web.js
 ** URL: /about
 ** DESCRIPTION: about page
 */
exports.getAbout = (req, res, next) => {
	res.status(200).render('page/about');
};

