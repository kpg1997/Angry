var express = require('express');
var router = express.Router();
const request = require('request');
const client = require('./mysql');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const PORT = 7572;
const ACCOUNT = "Yama_coin";
const ID_STRING = "Angry";
const headers = {
    "content-type": "text/plain;"
};

//====================================회원가입============================
router.post('/sign_up', (req, res) => {

    let id = req.body.id;
    let pw = req.body.pw;
    let encryptedPassword = bcrypt.hashSync(pw, 10)
    let address;
    var nickname = req.body.nickname;
    var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getnewaddress","params":["${id}"]}`;
    var options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
        method: "POST",
        headers: headers,
        body: dataString
    };

    callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            //   console.log('데이타', data)
            //   console.log('데이타.결과', data.result)
            address = data.result;
            client.query('insert into users (id, password, nickname, address) values (?,?,?,?)', [id, encryptedPassword, nickname, address ], (err,result) => {
                if (err) { res.send({ success: false, err }) }
                else { res.send({ success: true }) }
            })
        }
    };
    request(options, callback);
})


//====================================ID중복확인 ============================

router.post('/IDCheck', (req, res)=>{
    let id = req.body.id;
    console.log(id)
    client.query('select * from users where id = ?',[id], (err,data)=>{
        if(data.length == 1){
            res.send({IDCheck : false, message: "이미 중복된 ID 입니다."})
        }
        else{ res.send({IDCheck : true, message : "사용 가능한 ID 입니다." })}
    });
});
//====================================닉네임 중복확인 ============================

router.post('/NickCheck', (req, res)=>{
    let nickname = req.body.nickname;
    console.log(nickname)
    client.query('select * from users where nickname = ?',[nickname], (err,data)=>{
        if(data.length > 0){
            res.send({NickCheck : false, message : "이미 중복된 닉네임 입니다."})
        }
        else{res.send({NickCheck : true, message : "사용 가능한 닉네임 입니다."})}
    });
});
//======================================로그인================================================================================

router.post('/login', (req, res) => {
    //요청된 이메일이 DB에 있는지 찾는다.
    client.query('select * from users where id = ?', [req.body.id], (err, user) => {
        //아이디 있나 없나 검색해서 없으면
        console.log("user",user)
        if (user.length != 1) {
            return res.json({
                loginSuccess: false,
                message: '아이디에 해당하는 유저가 없습니다.'
            });
        }
        //있으면 비밀번호 일치여부 확인
        let isValid = bcrypt.compareSync(req.body.password, user[0].password)
        if (!isValid) {
            res.send({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' })
        }
        let userid = user[0].id;
        console.log("userid",userid);
        //비번이 맞다면 토큰생성
        let token = jwt.sign(userid, 'AngryToken')
        //지금 지갑으로 테스트 해볼까요?
        var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getbalance","params":["${req.body.id}",0]}`;
        var options = {
            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString
        };
        callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log('여기로 오는가요?/body',body)
                const data = JSON.parse(body);
                client.query("update users set token = ? , have_yama = ? where id = ?", [token, data.result, req.body.id], (err1, data1) => {
                    console.log("response.statusCode",response.statusCode);
                    if (err1) return res.status(400).send(err);
                    //토큰을 저장해야하는데 쿠키, 로컬스토리지등이 있다.
                    else {
                        res.cookie('Angry_auth', token).status(200).json({
                            loginSuccess: true,
                            userId: req.body.id,
                            nickname : user[0].nickname,
                            point : user[0].point,
                            have_yama : data.result,
                            address : user[0].address,
                            token: token,
                         });
                    }
                })
            }
        };
        request(options, callback);
    });
});
    
//======================================로그아웃================================================================================
router.get('/logout',(req, res) =>{
    let token = req.cookies.Angry_auth;
    client.query("update users set token = '' where token = ?",[token], (err, data)=>{
        if(err){
            return res.send({message : "로그아웃따위를 실패함"})
        }
        else {
            res.clearCookie("Angry_auth", token).status(200).send({message: "로그아웃!"})
        }
    })
  });
//==============================================================================================================================
router.post('/login_token', (req, res) => {
    console.log("시발", req.body)
    //요청된 이메일이 DB에 있는지 찾는다.
    client.query('select * from users where token = ?', [req.body.token], (err, user) => {
        //아이디 있나 없나 검색해서 없으면
        if (user.length != 1) {
            return res.json({
                loginSuccess: false,
                message: '다시 로그인해주세요'
            });
        }
        var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getbalance","params":["${user[0].id}",0]}`;
        var options = {
            url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
            method: "POST",
            headers: headers,
            body: dataString
        };
        callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log('여기로 오는가요?/body', body)
                const data = JSON.parse(body);
                let token = jwt.sign(user[0].id, 'AngryToken')
                client.query("update users set have_yama = ? where id = ?", [data.result, req.body.id], (err1, data1) => {
                    console.log("response.statusCode", response.statusCode);
                    if (err1) return res.status(400).send(err);
                    //토큰을 저장해야하는데 쿠키, 로컬스토리지등이 있다.
                    else {
                        res.cookie('Angry_auth', token).status(200).json({
                            loginSuccess: true,
                            userId: user[0].id,
                            nickname: user[0].nickname,
                            point: user[0].point,
                            have_yama: data.result,
                            address: user[0].address,
                            token: token,
                        });
                    }
                })
            }
        };
        request(options, callback);

    });
});
//
router.get('/alluserinfo', (req,res)=>{
    client.query('SELECT nickname,address,have_yama FROM users', (err,data)=>{
        if(err){
            return res.send({message : "좀 곤란함.. 이거 에러뜨면",success : false})
        }else{
            return res.send({
                message : "성공 찡긋",
                user : data,
                success : true
            })
        }
    })
})

   

module.exports = router;
