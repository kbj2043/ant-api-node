const express = require('express');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 로그인 처리
 * definitions:
 *   Auth_email_request:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         description: 이메일
 *       password:
 *         type: string
 *         description: 비밀번호
 *   Auth_social_request:
 *     type: object
 *     required:
 *       - provider
 *       - user_id
 *     properties:
 *       provider:
 *         type: string
 *         description: 소셜 로그인 제공 사업자
 *       user_id:
 *         type: string
 *         description: 제공 사업자 측 유저 아이디
 *   Auth_response:
 *     type: object
 *     required:
 *       - status
 *     properties:
 *       status:
 *         type: string
 *         description: 로그인 성공 여부- error, success
 *       token:
 *         type: object
 *         description: 계정 정보
 *   Response_error:
 *     type: object
 *     required:
 *       - status
 *     properties:
 *       message:
 *         type: string
 *         description: 오류 사유
 *       status:
 *         type: integer
 *         description: response code
 */


/**
 * @swagger
 *  paths:
 *    /auth/login/email:
 *      post:
 *        tags:
 *        - "Auth"
 *        summary: "Email Login process"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "회원 인증 후 토큰을 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_email_request"
 *        responses:
 *          200:
 *            description: "인증 결과와 토큰"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "인증 오류 & 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.post('/login/email', (req, res, next) => {
  res.send('email');
});

/**
 * @swagger
 *  paths:
 *    /auth/login/social:
 *      post:
 *        tags:
 *        - "Auth"
 *        summary: "Social Login process"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "소셜 로그인 인증 후 토큰을 전달"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/Auth_social_request"
 *        responses:
 *          200:
 *            description: "인증 결과와 토큰"
 *            schema:
 *              $ref: "#/definitions/Auth_response"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "인증 오류 & 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.post('/login/social', (req, res, next) => {
  res.send('social');
});

module.exports = router;
