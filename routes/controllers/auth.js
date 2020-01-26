const express = require('express');
const Status = require('http-status');
const models = require('./models');

const router = express.Router();

const getUser = async (ctx) => {
  const {id} = ctx.body
}
// Login By Email
router.post('/email/login', (req, res, next) => {
  res
    .status(Status.OK)
    .json(user);
});

// Create User By Email
router.post('/email', (req, res, next) => {
  req.body.par
  res
    .status(Status.OK)
    .json({
      'token': "1234"
    });
});


module.exports = router;
