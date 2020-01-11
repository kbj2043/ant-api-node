var express = require('express');
var router = express.Router();
var yahooFinance = require('yahoo-finance');

router.get('/', function(req, res, next) {
    yahooFinance.historical({
        symbol: '133690.KS',
        from: '2019-01-01',
        to: '2020-01-01',
        // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
        //...
        console.log(quotes);
        res.send(quotes);
    });
});

module.exports = router;
