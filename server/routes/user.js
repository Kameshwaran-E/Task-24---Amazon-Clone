const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', (req, res) => {
  res.json({ msg: 'from user route' });
});

router.post('/signup', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt(req.body.password, salt);
  const user = await User.create({
    email: req.body.email,
    password: passwordHash,
  });
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kamesh1620@gmail.com',
      pass: 'hoqyotwkhvzrlaeu',
    },
  });
  let info = await transporter.sendMail({
    from: 'Amazon <kamesh1620@gmail.com>',
    to: req.body.email,
    subject: 'Verify your Email - Amazon Team',
    html: `
    <div>
    <strong>$(req.body.email)</strong>, we welcome to our platform.
    <a style="background-color:yellow;color:white;" href="http://localhost:3000/user/verify/${token}"
    <div>
    <p>Thanks and Regards</p>
    <p>From Amazon Team</p>
    </div>
    </div>
    `,
  });
  if (info) {
    console.log(info);
  }
  res.json({ msg: 'Account created successfully. Please verify your email' });
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  const result = await User.findOne({ email: email });
  if (result) {
    if (result.verified) {
      bcrypt.compare(password, result.password).then((passwordResult) => {
        if (passwordResult) {
          jwt.sign(
            { userId: result._id },
            process.env.SECRET_KEY,
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.json({
                  success: true,
                  msg: 'Login Successfull',
                  token,
                });
              }
            }
          );
        } else {
          res.json({ success: false, msg: 'Incorrect Password' });
        }
      });
    } else {
      res.json({ success: false, msg: 'Please verify your email.' });
    }
  } else {
    res.json({ success: false, msg: 'User not registered' });
  }
});

router.get('/data', verifyToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
