const router = require('express').Router();
const { v4: uuid } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { Checkout } = require('../models');
const getUser = require('../middlewares/getUser');

router.get('/', (req, res) => {
  res.json({ msg: 'from checkout route' });
});

router.post('/create-payment-intentt', getUser, async (req, res) => {
  const { total, items } = req.body;

  const orderId = uuid();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: 'inr',
    metadata: {
      orderId: orderId,
    },
  });
  await Checkout.create({
    items,
    total,
    order_id: orderId,
    payment_id: paymentIntent.id,
    user: req.userId,
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

router.get('/orders', getUser, async (req, res) => {
  const orders = await Checkout.find({ user: req.userId }).populate(
    'user',
    '-password'
  );
  res.json(orders);
});

module.exports = router;
