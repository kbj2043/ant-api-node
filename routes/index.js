const express = require('express');
const usersRouter = require('./controllers/users');
const stocksRouter = require('./controllers/stocks');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendStatus(202);
});

router.use('/users', usersRouter);
router.use('/stocks', stocksRouter);


module.exports = router;
