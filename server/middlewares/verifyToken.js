const jwt = require('jsonwebtoken');
const { User } = require('../models');

function verifyToken(req, res, next) {
  const token = req.headers('authorization');
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        return res.json({ message: 'Access denied' });
      } else {
        const data = await User.findById(decodedToken.userId).select(
          '-__v-password'
        );
        if (data) {
          req.user = data;
          next();
        } else {
          return res.json({ message: 'Access denied' });
        }
      }
    });
  } else {
    return res.json({ message: 'Access denied' });
  }
}

module.exports = verifyToken;
