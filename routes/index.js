const express = require('express');
const usersRouter = require('./controllers/users');
const stocksRouter = require('./controllers/stocks');
const authRouter = require('./controllers/auth');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendStatus(202);
});

router.use('/users', usersRouter);
router.use('/stocks', stocksRouter);
router.use('/auth', authRouter);


module.exports = router;
