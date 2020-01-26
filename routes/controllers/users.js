const express = require('express');
const Status = require('http-status');
const userModel = require('../../database/models').user;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt-nodejs');

const router = express.Router();

// Login By Email
router.post('/email/login',
  [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('passWord').isLength({ min: 5 })
  ],
  async (req, res, next) => {
  let {email, passWord} = req.body;
  const authType = 'email';
  const errors = validationResult(req);
  passWord = bcrypt.hashSync(passWord);
  if (!errors.isEmpty()) {
    return res.status(Status.BAD_REQUEST)
      .json({
        type: 'ValidationError',
        details: errors.array()
      })
  }

  try {
    const user = await userModel.findOne({where: {authType, authId: email, passWord}});
    console.log('user : ' + user);
    return res
      .status(Status.OK)
      .json(user.toJSON());
  } catch(error) {
    console.log('error: ' + error);
    return res.status(Status.NOT_FOUND)
      .json({
        type: 'NotFoundError',
        details: error.details
      })
  }
});

// Create User By Email
router.post('/email',
  [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('passWord').isLength({ min: 5 }),
    check('nickName')
  ],
  async (req, res, next) => {
  let {email, passWord, nickName} = req.body;
  const errors = validationResult(req);
  passWord = bcrypt.hashSync(passWord);
  if (!errors.isEmpty()) {
    return res.status(Status.BAD_REQUEST)
      .json({
        type: 'ValidationError',
        details: errors.array()
      })
  }
  passWord = bcrypt.hashSync(passWord);
  const authType = 'email';

  try {
    const user = await userModel.create({authType, authId: email, passWord, nickName});
    return res
      .status(Status.OK)
      .json(user.toJSON());
  } catch(error) {
    console.log('error: ' + error);
    return res.status(Status.CONFLICT)
      .json({
        type: 'UserConflictError',
        details: "User Conflict Error"
      })
  }

});


module.exports = router;
