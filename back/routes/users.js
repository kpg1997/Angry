var express = require('express');
var router = express.Router();

var app = express();
var http = require('http').app;
app.io = require('socket.io')(http, { cors: { origin: '*', methods: ['*'] }, path: '/socket' });

const WebSocket = require('ws');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const request2 = new XMLHttpRequest();
const url2 = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC';
request2.open('GET', url2, false);
request2.send();
var obj2 = JSON.parse(request2.responseText);

//비트
let check = 0;
const data = [];
let startdate = new Date().toISOString();
//이더리움
let check1 = 0;
const data1 = [];
let startdate1 = new Date().toISOString();
//도지
let check2 = 0;
const data2 = [];
let startdate2 = new Date().toISOString();

while (true) {
    const request = new XMLHttpRequest();

    const url = `https://api.upbit.com/v1/candles/minutes/30?market=KRW-BTC&count=100&to=${startdate}`;
    request.open('GET', url, false);
    request.send();
    var obj = JSON.parse(request.responseText);
    // console.log(obj);

    for (let i = obj.length - 1; i >= 0; i--) {
        let timedate = String(obj[i].timestamp).substring(0, 10);
        let gotime = Number(timedate) + 32400;
        // console.log({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
        data.push({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
    }
    let compdate = new Date(String(obj[obj.length - 1].candle_date_time_kst));
    let nextdate = new Date(compdate.setMinutes(compdate.getMinutes() - 30)).toISOString();
    startdate = nextdate;
    if (check == 4) {
        break;
    }
    check++;
}
while (true) {
    const request2 = new XMLHttpRequest();

    const url2 = `https://api.upbit.com/v1/candles/minutes/30?market=KRW-ETH&count=100&to=${startdate1}`;
    request2.open('GET', url2, false);
    request2.send();
    var obj = JSON.parse(request2.responseText);
    // console.log(obj);

    for (let i = obj.length - 1; i >= 0; i--) {
        let timedate = String(obj[i].timestamp).substring(0, 10);
        let gotime = Number(timedate) + 32400;
        // console.log({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
        data1.push({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
    }
    let compdate = new Date(String(obj[obj.length - 1].candle_date_time_kst));
    let nextdate = new Date(compdate.setMinutes(compdate.getMinutes() - 30)).toISOString();
    startdate = nextdate;
    if (check1 == 4) {
        break;
    }
    check1++;
}
while (true) {
    const request3 = new XMLHttpRequest();

    const url3 = `https://api.upbit.com/v1/candles/minutes/30?market=KRW-ETH&count=100&to=${startdate2}`;
    request3.open('GET', url3, false);
    request3.send();
    var obj = JSON.parse(request3.responseText);
    // console.log(obj);

    for (let i = obj.length - 1; i >= 0; i--) {
        let timedate = String(obj[i].timestamp).substring(0, 10);
        let gotime = Number(timedate) + 32400;
        // console.log({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
        data2.push({ time: gotime, open: obj[i].opening_price, high: obj[i].high_price, low: obj[i].low_price, close: obj[i].trade_price });
    }
    let compdate = new Date(String(obj[obj.length - 1].candle_date_time_kst));
    let nextdate = new Date(compdate.setMinutes(compdate.getMinutes() - 30)).toISOString();
    startdate = nextdate;
    if (check2 == 4) {
        break;
    }
    check2++;
}
router.get('/', function (req, res, next) {
    res.json(data);
});

router.get('/ethchart', function (req, res, next) {
    res.json(data1);
});
router.get('/dogechart', function (req, res, next) {
    res.json(data1);
});

module.exports = router;