const jwt = require('jsonwebtoken');

function getUser(req, res, next) {
  const token = req.headers('authorization');
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodeToken) => {
      if (err) {
        return res.json({ message: 'Access Denied' });
      } else {
        req.userId = decodeToken.userId;
        next();
      }
    });
  } else {
    return res.json({ message: 'Access Denied' });
  }
}

module.exports = getUser;
