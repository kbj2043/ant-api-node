var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('user');
});

module.exports = router;
