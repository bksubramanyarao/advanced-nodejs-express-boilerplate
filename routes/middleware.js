

/**
 ** DESCRIPTION: allow if not logged-in to the route
 */
exports.isGuest = async (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    return res.status(401).redirect('/profile');
  }
  next();
};

/**
 ** DESCRIPTION: allow if user logged-in to the route
 */
exports.isUser = async (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    return next();
  } else {
    return res.status(401).redirect('/register');
  }
};


