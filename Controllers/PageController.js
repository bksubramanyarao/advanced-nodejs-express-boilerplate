


/**
 ** ROUTE_FILE: web.js
 ** URL: /
 ** DESCRIPTION: home page
 */
exports.getHome = async (req, res, next) => {
  res.status(200).render('page/home');
};


