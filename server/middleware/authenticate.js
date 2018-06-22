const User = require('../model/User');

// Grab the JWT from the request header and look for user in db
const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(err => res.status(401).send());
};

module.exports = authenticate;