var express = require('express');
var router = express.Router();
var app = express();
var http = require('http').app;
app.io = require('socket.io')(http, { cors: { origin: '*', methods: ['*'] }, path: '/socket' }); 


const WebSocket = require('ws');

let recvData = '';

app.io.on('connection', function (socket) {
    console.log('socket connected...');
    function tradeServerConnect(codes) {
        let ws = new WebSocket('wss://api.upbit.com/websocket/v1');
        ws.on('open', () => {
            console.log('trade websocket is connected');
            const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]}]`;
            ws.send(str);
        });
        ws.on('close', () => {
            console.log('trade websocket is closed');
            setTimeout(function () {
                console.log('trade 재접속');
                tradeServerConnect(codes);
            }, 1000);
        });
        ws.on('message', (data) => {
            try {
                let str = data.toString('utf-8');
                recvData = JSON.parse(str);
            } catch (e) {
                console.log(e);
            }
        });
    }

    async function start() {
        tradeServerConnect('KRW-BTC');
        function print() {
            console.log([recvData.trade_time, recvData.low_price, recvData.trade_price, recvData.trade_price, recvData.high_price]);
            socket.emit('tasks', [recvData.trade_time, recvData.low_price, recvData.opening_price, recvData.trade_price, recvData.high_price]);
        }
        setInterval(print, 3000);
    }

    start();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
