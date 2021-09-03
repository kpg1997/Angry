

const express = require('express');
const router = express.Router();
const client = require('./mysql_sync');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

var request = require('request');

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const PORT = 7572;
const ACCOUNT = 'ANGRY_ADMIN';
const ID_STRING = 'Yama_Coin';
const headers = {
    'content-type': 'text/plain;',
};

// 야마코인 매도,매수 페이지
router.get('/', async (req, res) => {
    console.log('야마코인 페이지');
    const a = await client.query('select * from yamacoin order by  date desc');
    console.log(a);
    res.send({ yamacoin: a });
});

router.post('/sellbuy', async (req, res) => {
    // 매도 팔기: 1
    // 매수 사기: 0
    const { id, type, price, amount, sum, userpoint, usercoin, useraddress } = req.body.data;
    if (type == 0) {
        const result = await client.query('SELECT * FROM sellbuy where id NOT IN(?) and sellbuy = 1 and price = ? order by date asc;', [id, price]);
        if (result[0] == undefined) {
            await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                id,
                type,
                price,
                amount,
                sum,
                useraddress,
            ]);
            const leftpoint = userpoint - sum;
            await client.query('update users set point = ? where id =?', [leftpoint, id]);
            const results = await client.query('select * from users where id=?', [id]);
            res.send({ success: true, users: results[0] });
        } else {
            if (amount == result[0].amount) {
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('DELETE FROM sellbuy WHERE sellbuy=1 and id=? and date=?', [result[0].id, date]);
                const sellres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let buyUserPoint = userpoint - sum;
                let buyUserCoin = usercoin + amount;
                let sellUserPoint = sellres[0].point + sum;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    sellres[0].id,
                    id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[0].id]);
                const results = await client.query('select * from users where id=?', [id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                    method: 'POST',
                    headers: headers,
                    body: dataString,
                };
                callback = (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const data = JSON.parse(body);
                        console.log('options', options);
                        res.send({ success: true, users: results[0], data: data });
                    }
                };
                request(options, callback);
            } else if (amount < result[0].amount) {
                let leftamounts = result[0].amount - amount;
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('UPDATE sellbuy SET amount=? WHERE sellbuy=1 and id=? and date=?', [leftamounts, result[0].id, date]);
                const sellres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let buyUserPoint = userpoint - sum;
                let buyUserCoin = usercoin + amount;
                let sellUserPoint = sellres[0].point + sum;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    sellres[0].id,
                    id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[0].id]);
                const results = await client.query('select * from users where id=?', [id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[0].id}","${useraddress}","${amount}"]}`;
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                    method: 'POST',
                    headers: headers,
                    body: dataString,
                };
                callback = (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const data = JSON.parse(body);
                        res.send({ success: true, users: results[0], data: data });
                    }
                };
                request(options, callback);
            } else {
                try {
                    let leftamount = amount;
                    for (let i = 0; i < result.length; i++) {
                        if (leftamount >= result[i].amount) {
                            const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                            console.log('result[i].date', date);
                            await client.query('DELETE FROM sellbuy WHERE sellbuy=1 and id= ? and date= ?', [result[i].id, date]);
                            const sellres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let buyUserPoint = newres[0].point - result[i].amount * result[i].price;
                            let buyUserCoin = newres[0].have_yama + result[i].amount;
                            let sellUserPoint = sellres[0].point + result[i].amount * result[i].price;
                            let ressum = result[i].amount * result[i].price;
                            leftamount -= result[i].amount;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                sellres[0].id,
                                id,
                                price,
                                result[i].amount,
                                ressum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                            await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[i].id]);
                            let sendamount =0;
                            if (result.length - 1 == i && leftamount != 0) {
                                console.log('result.length - 1 == i && leftamount !=0');
                                await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                                    id,
                                    type,
                                    price,
                                    leftamount,
                                    price * leftamount,
                                    useraddress,
                                ]);
                                const leftpoint = buyUserPoint - sum;
                                await client.query('update users set point = ? where id =?', [leftpoint, id]);
                                sendamount = amount - leftamount;
                            }
                            const results = await client.query('select * from users where id=?', [id]);
                            /*
                                ex)
                                매수하는 사람이 만약 6개를 원하지만 판매하는 사람의 총 코인 수가 5개이면 나머지 하나가 insert 해야한다.
                                이 로직을 만들려면....
                                일단 여기까지 들어온거면 매수인이 원하는 코인 수가 총 코인 수보다 많다...
                                -> result.length -1 == i  이고 leftamount != 0이면 insert?
                            */
                                await client.query('insert into yamacoin (price) value (?)',[price]);
                                if(sendamount == 0){
                                    var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                                    var options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
                                            console.log('leftamount', i, leftamount);
                                            console.log('여기!!!', i);
        
                                            if (leftamount == 0 || (result.length - 1 == i && leftamount != 0)) {
                                                console.log('leftamount == 0', i);
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }else{
                                    var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${sendamount}"]}`;
                                    var options = {
                                        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                        method: 'POST',
                                        headers: headers,
                                        body: dataString,
                                    };
                                    callback = (error, response, body) => {
                                        if (!error && response.statusCode == 200) {
                                            const data = JSON.parse(body);
                                            console.log('leftamount', i, leftamount);
                                            console.log('여기!!!', i);

                                            if (leftamount == 0 || (result.length - 1 == i && leftamount != 0)) {
                                                console.log('leftamount == 0', i);
                                                res.send({ success: true, users: results[0], data: data });
                                            }
                                        }
                                    };
                                    request(options, callback);
                                }
                        } else {
                            console.log('남은거');
                            const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                            let lastamount = result[i].amount - leftamount;
                            await client.query('UPDATE sellbuy SET amount=?,sum=? WHERE sellbuy=1 and id=? and date=?', [
                                lastamount,
                                lastamount * price,
                                result[i].id,
                                date,
                            ]);
                            const sellres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let buyUserPoint = newres[0].point - leftamount * price;
                            let buyUserCoin = newres[0].have_yama + leftamount;
                            let sellUserPoint = sellres[0].point + leftamount * price;
                            let sellUserCoin = sellres[0].have_yama - leftamount;
                            let lastsum = leftamount * price;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                sellres[0].id,
                                id,
                                price,
                                leftamount,
                                lastsum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [buyUserPoint, buyUserCoin, id]);
                            await client.query('UPDATE users SET point=? where id=?', [sellUserPoint, result[i].id]);
                            const results = await client.query('select * from users where id=?', [id]);
                            console.log('여기');
                            await client.query('insert into yamacoin (price) value (?)',[price]);
                            var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${result[i].id}","${useraddress}","${amount}"]}`;
                            var options = {
                                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                method: 'POST',
                                headers: headers,
                                body: dataString,
                            };
                            leftamount = 0;
                            callback = (error, response, body) => {
                                if (!error && response.statusCode == 200) {
                                    const data = JSON.parse(body);
                                    console.log('남아서 여기로', i);
                                    if (leftamount == 0) {
                                        res.send({ success: true, users: results[0], data: data });
                                    }
                                }
                            };
                            request(options, callback);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } else if (type == 1) {
        // 수정해야함
        const result = await client.query('SELECT * FROM sellbuy where id NOT IN(?) and sellbuy = 0 and price = ? order by date asc;', [id, price]);
        if (result[0] == undefined) {
            await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                id,
                type,
                price,
                amount,
                sum,
                useraddress,
            ]);
            const leftcoin = usercoin - amount;
            await client.query('update users set have_yama = ? where id =?', [leftcoin, id]);
            const results = await client.query('select * from users where id=?', [id]);
            res.send({ success: true, users: results[0] });
        } else {
            if (amount == result[0].amount) {
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('DELETE FROM sellbuy WHERE sellbuy= 0 and id=? and date=?', [result[0].id, date]);
                const buyres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let sellUserPoint = userpoint + sum;
                let sellUserCoin = usercoin - amount;
                let buyUserCoin = buyres[0].have_yama + amount;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    id,
                    buyres[0].id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                await client.query('UPDATE users SET have_yama=? where id=?', [buyUserCoin, result[0].id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                const results = await client.query('select * from users where id=?', [id]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                    method: 'POST',
                    headers: headers,
                    body: dataString,
                };
                callback = (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const data = JSON.parse(body);
                        console.log('성공');
                        res.send({ success: true, users: results[0], data: data });
                    }
                };
                request(options, callback);
            } else if (amount < result[0].amount) {
                let leftamount = result[0].amount - amount;
                const date = moment(result[0].date).format('YYYY-MM-DD HH:mm:ss');
                await client.query('UPDATE sellbuy SET amount=? WHERE sellbuy= 0 and id=? and date=?', [leftamount, result[0].id, date]);
                const buyres = await client.query('SELECT * FROM users where id=?', [result[0].id]);
                let sellUserPoint = userpoint + sum;
                let sellUserCoin = usercoin - amount;
                let buyUserCoin = buyres[0].have_yama + amount;
                await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                    id,
                    buyres[0].id,
                    price,
                    amount,
                    sum,
                ]);
                await client.query('UPDATE users SET point=?,have_yama=? where id=?', [userpoint + sum, usercoin - amount, id]);
                await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + amount, result[0].id]);
                const results = await client.query('select * from users where id=?', [id]);
                await client.query('insert into yamacoin (price) value (?)',[price]);
                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                var options = {
                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                    method: 'POST',
                    headers: headers,
                    body: dataString,
                };
                callback = (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const data = JSON.parse(body);
                        res.send({ success: true, users: results[0], data: data });
                    }
                };
                request(options, callback);
            } else {
                try {
                    let leftamount = amount;
                    for (let i = 0; i < result.length; i++) {
                        if (leftamount >= result[i].amount) {
                            const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                            await client.query('DELETE FROM sellbuy WHERE sellbuy = 0 and id=? and date=?', [result[i].id, date]);
                            const buyres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let sellUserPoint = newres[0].point + result[i].amount * result[i].price;
                            let sellUserCoin = newres[0].have_yama - result[i].amount;
                            let buyUserPoint = buyres[0].point - result[i].amount * result[i].price;
                            let buyUserCoin = buyres[0].have_yama + result[i].amount;
                            let ressum = result[i].amount * result[i].price;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                id,
                                buyres[0].id,
                                price,
                                result[i].amount,
                                ressum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                            await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + result[i].amount, result[i].id]);
                            leftamount = leftamount - result[i].amount;
                            let sendamount =0;
                            if (result.length - 1 == i && leftamount != 0) {
                                console.log('result.length - 1 == i && leftamount !=0');
                                await client.query('insert into sellbuy (id,sellbuy,price,amount,sum,address) values (?,?,?,?,?,?)', [
                                    id,
                                    type,
                                    price,
                                    leftamount,
                                    price * leftamount,
                                    useraddress,
                                ]);
                                const leftcoin = sellUserCoin - leftamount;
                                sendamount = amount - leftamount;
                                await client.query('update users set have_yama = ? where id =?', [leftcoin, id]);
                            }
                            await client.query('insert into yamacoin (price) value (?)',[price]);
                            const results = await client.query('select * from users where id=?', [id]);

                            if(sendamount == 0){
                                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                                var options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftamount == 0 || (result.length - 1 == i && leftamount != 0))
                                            res.send({ success: true, users: results[0], data: data });
                                    }
                                };
                                request(options, callback);
                            }else{
                                var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${sendamount}"]}`;
                                var options = {
                                    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                    method: 'POST',
                                    headers: headers,
                                    body: dataString,
                                };
                                callback = (error, response, body) => {
                                    if (!error && response.statusCode == 200) {
                                        const data = JSON.parse(body);
                                        if (leftamount == 0 || (result.length - 1 == i && leftamount != 0))
                                            res.send({ success: true, users: results[0], data: data });
                                    }
                                };
                                request(options, callback);
                            }
                        } else {
                            let lastamount = result[i].amount - leftamount;
                            const date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
                            await client.query('UPDATE sellbuy SET amount=?,sum=? WHERE sellbuy=0 and id=? and date=?', [
                                lastamount,
                                lastamount * price,
                                result[i].id,
                                date,
                            ]);
                            const buyres = await client.query('SELECT * FROM users where id=?', [result[i].id]);
                            const newres = await client.query('SELECT * FROM users where id=?', [id]);
                            let sellUserPoint = newres[0].point + leftamount * price;
                            let sellUserCoin = newres[0].have_yama - leftamount;
                            let buyUserPoint = buyres[0].point - leftamount * price;
                            let buyUserCoin = buyres[0].have_yama + leftamount;
                            let lastsum = leftamount * price;
                            await client.query('INSERT INTO conclusion (sell_id,buy_id,price,amount,sum) VALUES (?,?,?,?,?)', [
                                id,
                                buyres[0].id,
                                price,
                                leftamount,
                                lastsum,
                            ]);
                            await client.query('UPDATE users SET point=?,have_yama=? where id=?', [sellUserPoint, sellUserCoin, id]);
                            await client.query('UPDATE users SET have_yama=? where id=?', [buyres[0].have_yama + leftamount, result[i].id]);
                            const results = await client.query('select * from users where id=?', [id]);
                            await client.query('insert into yamacoin (price) value (?)',[price]);
                            var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${result[0].address}","${amount}"]}`;
                            var options = {
                                url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
                                method: 'POST',
                                headers: headers,
                                body: dataString,
                            };
                            leftamount = 0;
                            callback = (error, response, body) => {
                                if (!error && response.statusCode == 200) {
                                    const data = JSON.parse(body);
                                    if (leftamount == 0) res.send({ success: true, users: results[0], data: data });
                                }
                            };
                            request(options, callback);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
});

// 매도, 매수 목록
router.get('/waittrade', async (req, res) => {
    const buylist = await client.query(
        'select sellbuy,price,sum(amount) as sum from sellbuy where sellbuy = ? group by price order by price desc limit 5',
        [0]
    );
    const selllist = await client.query(
        'select sellbuy,price,sum(amount) as sum from sellbuy where sellbuy = ? group by price order by price asc limit 5',
        [1]
    );
    console.log('buylist', buylist, 'selllist', selllist);
    res.send({ selllist: selllist, buylist: buylist });
});

// point 충전
router.post('/pointcharge', async (req, res) => {
    const { usertoken, putpointcharge } = req.body.data;
    console.log('usertoken, putpointcharge', usertoken, putpointcharge);
    // front에서 token 따로 만들어서 가져오기
    const userIdResult = await client.query('select * from users where token = ?', [usertoken]);
    console.log("userIdResult",userIdResult[0].id)
    const loginUserId = userIdResult[0].id;
    const userPointResult = await client.query('select * from users where id = ?', [loginUserId]);
    console.log("userPointResult[0].point",userPointResult[0].point)
    const loginUserPoint = userPointResult[0].point + putpointcharge;
    await client.query('update users set point = ? where id =? ', [loginUserPoint, loginUserId]);
    const afterResult = await client.query('select * from users where id =?', [loginUserId]);
    res.send({ success: true, result: afterResult });
});

// 체결 나오는 백
router.get('/conclusion', async (req, res) => {
    const conres = await client.query('select * from conclusion order by num asc');
    // console.log("conres",conres);
    res.send({ success: true, result: conres });
});

// 로그인 유저 매도 매수 나오는거
router.post('/mysellbuy', async (req, res) => {
    // 매도 팔기: 1
    // 매수 사기: 0
    console.log('aaaaa');
    const { token } = req.body;
    console.log("token",token);
    if(token !=''){
        const tokenres = await client.query('select * from users where token = ?', [token]);
        const mysell = await client.query('select * from sellbuy where sellbuy = 1 and id = ? order by date desc', [tokenres[0].id]);
        const mybuy = await client.query('select * from sellbuy where sellbuy = 0 and id = ? order by date desc', [tokenres[0].id]);
        res.send({ success: true, mysell: mysell, mybuy: mybuy });
    }else{
        res.send({ success: true, mysell: [], mybuy: [] });
    }
});

// 로그인 유저 매도 매수 삭제
router.post('/mysellbuy/delete', async (req, res) => {
    const { token, date, price, type, amount } = req.body;
    const fdate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const tokenres = await client.query('select * from users where token = ?', [token]);
    // tokenres[0].point
    // tokenres[0].have_yama
    if (type == 1) {
        await client.query('update users set have_yama = ? where id = ?', [tokenres[0].have_yama + amount, tokenres[0].id]);
    } else {
        const sum = price * amount;
        await client.query('update users set point = ? where id = ?', [tokenres[0].point + sum, tokenres[0].id]);
    }
    await client.query('delete from sellbuy where id = ? and date = ?', [tokenres[0].id, fdate]);

    // select sellbuy
    const mysell = await client.query('select * from sellbuy where sellbuy = 1 and id = ? order by date desc', [tokenres[0].id]);
    const mybuy = await client.query('select * from sellbuy where sellbuy = 0 and id = ? order by date desc', [tokenres[0].id]);
    const updateres = await client.query('select * from users where id = ?', [tokenres[0].id]);
    res.send({ success: true, mysell: mysell, mybuy: mybuy, updateres: updateres[0] });
});

module.exports = router;