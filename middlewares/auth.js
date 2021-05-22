function auth(req, res, next) {
  let user = req.session.user;
  if (!user) {
    return res.redirect("/users/login");
  }
  next();
}

module.exports = auth;