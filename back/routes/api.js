const express = require("express");
const router = express.Router();
var request = require("request");
const client = require('./mysql');
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const PORT = 7572;
const ACCOUNT = "Yama_coin";
const ID_STRING = "Angry";
const headers = {
  "content-type": "text/plain;"
};

var options = {
  url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
  method: "POST",
  headers: headers,
};




//explorer메인 최근 채굴한 블록
router.get('/LatestBlocks', (req,res)=>{
    var hashArr=[];
    var timeArr=[];
    var heightArr=[];
    var Arr = [];

    var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getbestblockhash","params":[]}`;

    options.body = dataString;
    callback = async(error, response, body) => {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body);
        let bestblock = data.result;

        hashArr.push(bestblock);
        

        // ////////console.log(i+1,"번쨰", options);
            options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${hashArr[0]}"]}`;;

        
         callback2 = (error2, response2, body2) =>{
            if (!error2 && response2.statusCode == 200){
                let data2 = JSON.parse(body2);
                hashArr.push(data2.result.previousblockhash);
                timeArr.push(data2.result.time);
                heightArr.push(data2.result.height);

                Arr.push({
                    hash :  hashArr[0],
                    time : timeArr[0],
                    height : heightArr[0],
                });
                    options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${hashArr[1]}"]}`;;       
                    callback3 = (error3, response3, body3) => {
                    if (!error3 && response3.statusCode == 200) {
                      let data3 = JSON.parse(body3);
                      hashArr.push(data3.result.previousblockhash);
                      timeArr.push(data3.result.time);
                      heightArr.push(data3.result.height);

                      Arr.push({
                        hash :  hashArr[1],
                        time : timeArr[1],
                        height : heightArr[1],
                    });

                        options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${hashArr[2]}"]}`;;                    
                        callback4 = (error4, response4, body4) => {
                        if (!error4 && response4.statusCode == 200) {
                          let data4 = JSON.parse(body4);
                          hashArr.push(data4.result.previousblockhash);
                          timeArr.push(data4.result.time);
                          heightArr.push(data4.result.height);
    
                          Arr.push({
                            hash :  hashArr[2],
                            time : timeArr[2],
                            height : heightArr[2],
                        });
    
                            options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${hashArr[3]}"]}`;;                    
                        
                            callback5 = (error5, response5, body5) => {
                            if (!error5 && response5.statusCode == 200) {
                              let data5 = JSON.parse(body5);

                              hashArr.push(data5.result.previousblockhash);
                              timeArr.push(data5.result.time);
                              heightArr.push(data5.result.height);
        
                              Arr.push({
                                hash :  hashArr[3],
                                time : timeArr[3],
                                height : heightArr[3],
                            });

                                options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${hashArr[4]}"]}`;;                    
                        
                        
                              callback6 = (error6, response6, body6) => {
                                if (!error6 && response6.statusCode == 200) {
                                  let data6 = JSON.parse(body6);

                                  hashArr.push(data6.result.previousblockhash);
                                  timeArr.push(data6.result.time);
                                  heightArr.push(data6.result.height);
                                  
                                  Arr.push({
                                    hash :  hashArr[4],
                                    time : timeArr[4],
                                    height : heightArr[4],
                                });
                                  
                                  res.send(Arr);
                                }
                              };
                              request(options, callback6);
                            }
                          };
                          request(options, callback5);
                        }
                      };
                      request(options, callback4);
                    }
                  };
                  request(options, callback3);
                
            }
        }
       request(options, callback2); 
      }
    };
     request(options,callback);
});

//해쉬 값 블록 정보
router.get("/block/:hash", (req,res)=>{
  ////////console.log(req.params.hash);
  var dataGetblock = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${req.params.hash}"]}`;
  var options = {
      url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
      method: "POST",
      headers: headers,
      body: dataGetblock
    };

    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        ////////console.log("들어오냐??===>>",data)
        res.send(data);
      }
    };
    request(options,callback);
});
//listTransactions 정보 불렁로기
router.get("/listtransactions", (req,res)=>{
  var listtransactions = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"listtransactions","params":[]}`;
  var options = {
      url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
      method: "POST",
      headers: headers,
      body: listtransactions
    };

    callback = async (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        let Arr = data.result;
        let txArr = [];
        let sendArr = [];
        let sendArray = []
        let k = 0;
        console.log("Arr",Arr)//
        for(let i = 0; i < 10; i++){
          txArr.push(Arr[i].txid)
        }
        for(let i = 0; i< 10; i++){
          if(txArr[i]!=txArr[i+1]){
            if(i!=9){
              sendArr.push({
                timereceived : Arr[i].timereceived,
                txid : Arr[i].txid,
                amount : Arr[i].amount
              })
            }
          }
        }
        for(let i = (sendArr.length-1); (sendArr.length-5)<=i; i--){
          sendArray.push(sendArr[i])
        }
        res.send(sendArray)
      }
    };
    request(options,callback);
});
//explorer에서 address 검색시 가는 곳
router.post("/address",(req,res)=>{
  var address = req.body.address;
  var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${address}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/getblockcount",(req,res)=>{
  var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblockcount","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  };
  request(options, callback);
});
router.get("/test5/:txid",(req,res)=>{
  var dataString = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"gettransaction","params":["${req.params.txid}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
    method: "POST",
    headers: headers,
    body: dataString
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  };
  request(options, callback);
});


// getrawtransaction
router.get("/Txinfo1/:txid", (req, res) => {
  options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getrawtransaction","params":["${req.params.txid}"]}`;
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"decoderawtransaction","params":["${data.result}"]}`;
      callback1 = (error1, response1, body1) => {
        if (!error1 && response1.statusCode == 200) {
          const data1 = JSON.parse(body1);
         
                  let firstAmount = data1.result.vout[0].value;
                  
                  let TxInfo = {
                    txid : req.params.txid,
                    amount : firstAmount,
                    fee : (data1.result.vsize / 1000 * 0.02),
                    sendAddress : "Unknown",
                    sendid: "Unknown",
                    sendNickname: "Unknown",
                    receiveAddress : data1.result.vout[0].scriptPubKey.addresses[0],
                    receiveid: "Unknown",
                    receiveNickname: "Unknown",
                  }
                  res.send(TxInfo)
                }
              }
              
      request(options, callback1);
    }
  };
  request(options, callback);
});

router.get('/txinfo/:txid', (req,res) =>{
  options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"gettransaction","params":["${req.params.txid}"]}`;
    callback = (error, response, body) =>{
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        if(data.result.details.length == 1){
          let result = data.result.details[0];
          if(result.category=="send"){
            client.query("select address, nickname from users where id = ?",[result.account],(err, data1) =>{
              let sendAddress = data1[0].address;
              res.send({
                txid : req.params.txid ,
                sendid: result.account,
                sendAddress: sendAddress,
                sendNickname: data1[0].nickname,
                receiveid: "Unknown",
                receiveAddress: result.address,
                receiveNickname: "Unknown",
                amount: Math.abs(result.amount),
                fee: Math.abs(result.fee)
              })
            })
          }
          else if(result.category=="receive"){
            client.query("select nickname from users where id = ?",[result.account],(err, data1) =>{
              let receiveNickname = data1[0].nickname;
              res.send({
                txid : req.params.txid ,
                sendid: "Unknown",
                sendAddress: "Unknown",
                sendNickname: "Unknown",
                receiveid: result.account,
                receiveAddress: result.address,
                receiveNickname: receiveNickname,
                amount: Math.abs(result.amount),
                fee: "Unknown"
              })
            })
          }
          else{
            res.send({
              txid : req.params.txid ,
              sendid: "Generation Reward",
              sendAddress: "Generation Reward",
              sendNickname: "Generation Reward",
              receiveid: result.account,
              receiveAddress: result.address,
              receiveNickname: "Unknown",
              amount: Math.abs(result.amount),
              fee: 0
            })
          }
        }
        //거래일때
        else{
          let Sendinfo = data.result.details[0];
          let receiveInfo = data.result.details[1];
          let sendAddress,receiveAddress,sendNickname,receiveNickname;
          let sendid = Sendinfo.account;
          let amount = Math.abs(Sendinfo.amount);
          let receiveid =Sendinfo.label;
          let fee = Math.abs(Sendinfo.fee);
          client.query("SELECT id, address, nickname FROM users WHERE id = ? or id = ?",[sendid,receiveid], (err, data1)=>{

              if(data1[1].id==sendid){
                let sendAddress = data1[1].address;
                let sendNickname = data1[1].nickname;
                let receiveAddress = data1[0].address;
                let receiveNickname = data1[0].nickname;
                let txinfo = {
                  txid : req.params.txid ,
                  sendid : sendid,
                  sendAddress : sendAddress,
                  sendNickname : sendNickname,
                  receiveid : receiveid,
                  receiveAddress : receiveAddress,
                  receiveNickname : receiveNickname,
                  amount : amount,
                  fee : fee
                }
                res.send(txinfo)
              }else{
                let sendAddress = data1[0].address;
                let sendNickname = data1[0].nickname;
                let receiveAddress = data1[1].address;
                let receiveNickname = data1[1].nickname;
                let txinfo = {
                  txid : req.params.txid ,
                  sendid : sendid,
                  sendAddress : sendAddress,
                  sendNickname : sendNickname,
                  receiveid : receiveid,
                  receiveAddress : receiveAddress,
                  receiveNickname : receiveNickname,
                  amount : amount,
                  fee : fee
                }
                res.send(txinfo)
              }
       
          }
          )

        };
      }
    }
    request(options, callback);
})
//getrawtransaction
router.get("/txinfo1/:txid", (req, res) => {
 
  // var getrawtransaction = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getrawtransaction","params":["${req.params.txid}"]}`;
  options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getrawtransaction","params":["${req.params.txid}"]}`;
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"decoderawtransaction","params":["${data.result}"]}`;
      callback1 = (error1, response1, body1) => {
        if (!error1 && response1.statusCode == 200) {
          const data1 = JSON.parse(body1);

          if (!data1.result.vin[0].txid) {
            let firstAmount = data1.result.vout[0].value;
            let TxInfo = {
              txid: req.params.txid,
              amount: firstAmount,
              fee: 0,
              receiveAdress: data1.result.vout[0].scriptPubKey.addresses[0],
              sendAdress: "Generation Reward"
            }
            res.send(TxInfo)
          }
          else {
            options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getrawtransaction","params":["${data1.result.vin[0].txid}"]}`
            callback2 = (error2, response2, body2) => {
              if (!error2 && response2.statusCode == 200) {
                const data2 = JSON.parse(body2)
                options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"decoderawtransaction","params":["${data2.result}"]}`;
                callback3 = (error3, response3, body3) => {
                  if (!error3 && response3.statusCode == 200) {
                    const data3 = JSON.parse(body3)

                    let TotalAmount = data3.result.vout[0].value;
                    if(!data3.result.vout[1]){
                      let TotalAmount =+ data3.result.vout[1].value;
                      let firstAmount = data1.result.vout[0].value;
                      let secondAmount = data1.result.vout[1].value;
  
                      let fee = TotalAmount - firstAmount - secondAmount;
                      
                      let TxInfo = {
                        txid: req.params.txid,
                        amount: firstAmount,
                        fee: fee,
                        receiveAdress: data1.result.vout[0].scriptPubKey.addresses[0],
                        sendAdress: data3.result.vout[0].scriptPubKey.addresses[0]
                      }
                      res.send(TxInfo)
                    }
                  else{

                    let firstAmount = data1.result.vout[0].value;
                    let secondAmount = data1.result.vout[1].value;
                    
                    let fee = TotalAmount - firstAmount - secondAmount;
                    
                    let TxInfo = {
                      txid: req.params.txid,
                      amount: firstAmount,
                      fee: fee,
                      receiveAdress: data1.result.vout[0].scriptPubKey.addresses[0],
                      sendAdress: data3.result.vout[0].scriptPubKey.addresses[0]
                    }
                    res.send(TxInfo)
                  }
                  }
                }
                request(options, callback3);
              }
            }
            request(options, callback2);
          }
        }
      };
      request(options, callback1);
    }
  };
  request(options, callback);
});
            //getrawtransaction
router.post("/sendfrom", (req, res) => {
  let id = req.body.id;
  let address = req.body.address;
  let amount = req.body.amount;
  console.log("id,address,amount",id,',',address,',',amount);
  var sendfrom = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"sendfrom","params":["${id}","${address}","${amount}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
    method: "POST",
    headers: headers,
    body: sendfrom
  };
  
  callback = (error, response, body) => {
    console.log('body ===========> ',body);
    console.log("error",error,"amount",amount,"response",response);
    console.log("!error && response.statusCode == 200",!error , response.statusCode);
    if (!error && response.statusCode == 200) {
      client.query(`update users set have_yama = have_yama - ${amount} where id = ?`,[id],(err,data)=>{
        client.query(`update users set have_yama = have_yama + ${amount} where address = ?`,[address], (err1,data1)=>{
          const data2 = JSON.parse(body);
          res.send({data : data2, success : true});
        })
      } )
    }
    else{
      res.send({success:false});
    }
  };
  request(options, callback);
});
//검색
router.post('/getblockhash_result', (req, res) => {
  let index = req.body.index;
  console.log('tt',req.body.index)
  var getblockhash = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblockhash","params":[${index}]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
    method: "POST",
    headers: headers,
    body: getblockhash
  };
  
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log("index",data)
    }else{
      res.send('<script>alert("잘 못 입력하였습니다. 다시 입력해주세요")</script>')
    }
  };
  request(options, callback);
});


router.get('/blockPage/:hash', (req, res) => {
  options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"getblock","params":["${req.params.hash}"]}`;
  let arr12 = [];
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      const dr = data.result.tx;
      // res.send(dr);
      for (let i = 0; i < (dr.length); i++) {
        options.body = `{"jsonrpc":"1.0","id":"${ID_STRING}","method":"gettransaction","params":["${dr[i]}"]}`;
        callback1 = (error, response, body) => {
          let data2 = JSON.parse(body);
         console.log("data2.result",data2.result);
          if (!error && response.statusCode == 200) {
            let data1 = JSON.parse(body);
            arr12.push({ txid: data1.result.txid, url: `/tx/${data1.result.txid}` });
          }
          if (i == (dr.length - 1)) {
            // console.log('arr12',arr12)
            res.send(arr12)
          }
        }
        request(options, callback1);

      }
    }
  }
  request(options, callback);
})

module.exports = router;