




/**
 ** ROUTE_FILE: user.js
 ** URL: /profile
 ** DESCRIPTION: profile page
 */
exports.getProfileIndex = async (req, res, next) => {
  res.status(200).render('user/profile-index');
};





