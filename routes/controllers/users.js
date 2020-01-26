const express = require('express');
const Status = require('http-status');
// eslint-disable-next-line import/order
const userModel = require('../../database/models').user;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt-nodejs'); // 비밀번호 암호화
const jwt = require('jsonwebtoken'); // 인증 토큰 관련
const { JWT_SECRET } = require('../../config/config');

const router = express.Router();

const getToken = (responseUser) => jwt.sign(responseUser, JWT_SECRET, {
  expiresIn: '15m', // 유효기간 15분 => 15분 이후 토큰이 재발급 됨
  issuer: 'ant-api',
});

// Login By Email
router.post('/email/login',
  [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('passWord').isLength({ min: 5 }),
  ],
  async (req, res, next) => {
    const { email, passWord } = req.body;
    const authType = 'email';
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(Status.BAD_REQUEST)
        .json({
          type: 'ValidationError',
          details: errors.array(),
        });
    }

    try {
      const user = await userModel.findOne({ where: { authType, authId: email } });
      if (!bcrypt.compareSync(passWord, user.passWord)) {
        return res.status(Status.FORBIDDEN)
          .json({
            type: 'PasswordIncorrectError',
            details: ['Password incorrect error'],
          });
      }

      const { nickName, authId } = user;
      const responseUser = {
        nickName, authType, authId,
      };
      const token = getToken(responseUser);

      return res.status(Status.OK)
        .json({
          token,
          responseUser,
        });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(Status.NOT_FOUND)
        .json({
          type: 'NotFoundError',
          details: error.details,
        });
    }
  });

// Create User By Email
router.post('/email',
  [
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('passWord').isLength({ min: 5 }),
    check('nickName'),
  ],
  async (req, res, next) => {
    const { email, nickName } = req.body;
    let { passWord } = req.body;
    const errors = validationResult(req);
    passWord = bcrypt.hashSync(passWord);
    if (!errors.isEmpty()) {
      return res.status(Status.BAD_REQUEST)
        .json({
          type: 'ValidationError',
          details: errors.array(),
        });
    }
    const authType = 'email';

    try {
      const user = await userModel.create({
        authType, authId: email, passWord, nickName,
      });
      const { authId } = user;
      const responseUser = {
        nickName, authType, authId,
      };
      const token = getToken(responseUser);
      return res
        .status(Status.OK)
        .json({
          token,
          responseUser,
        });
    } catch (error) {
      console.log(`error: ${error}`);
      return res.status(Status.CONFLICT)
        .json({
          type: 'UserConflictError',
          details: 'User Conflict Error',
        });
    }
  });


module.exports = router;
