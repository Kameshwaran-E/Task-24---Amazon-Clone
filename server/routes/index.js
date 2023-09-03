const router = require('express').Router();
const useRouter = require('./user');
const checkoutRouter = require('./checkout');

router.use('/user', useRouter);
router.use('/checkout', checkoutRouter);

module.exports = router;
