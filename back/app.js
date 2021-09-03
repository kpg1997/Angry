var createError = require("http-errors");
var express = require("express");
var path = require("path");
var client = require("./routes/mysql_sync");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var yamacoinRouter = require("./routes/yamacoin");
var userRouter = require("./routes/user");
var apiRouter = require("./routes/api");

var cors = require("cors");
var app = express();
var http = require("http").app;
app.io = require("socket.io")(http, {
  cors: { origin: "*", methods: ["*"] },
  path: "/socket",
});
// const { user } = require('./data/data');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/yamacoin", yamacoinRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const WebSocket = require("ws");

let recvData = "";
let recvData2 = "";
let recvData3 = "";
let recvData4 = "";
let recvData5 = "";
let recvData6 = "";
app.io.on("connection", function (socket) {
  console.log("socket connected...");
  /////////////////////////비트
  function tradeServerConnect(codes) {
    let ws = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws.on("open", () => {
      console.log("trade websocket is connected");
      // const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]}]`;
      const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]},{"type":"orderbook","codes":["KRW-BTC.5"]}]`;

      ws.send(str);
    });
    ws.on("close", () => {
      console.log("trade websocket is closed");
      setTimeout(function () {
        console.log("trade 재접속");
        tradeServerConnect(codes);
      }, 1000);
    });
    ws.on("message", (data) => {
      try {
        let str = data.toString("utf-8");

        // recvData = JSON.parse(str);
        if (JSON.parse(str).type == "ticker") {
          recvData = JSON.parse(str);
        } else {
          recvData2 = JSON.parse(str);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  //   function tradeServerConnect2(codes) {
  //       let ws2 = new WebSocket('wss://api.upbit.com/websocket/v1');

  //       ws2.on('open', () => {
  //           console.log('trade websocket is connected');
  //           // const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]}]`;
  //           const str = `[{"ticket":"UNIQUE_TICKET"},{"type":"orderbook","codes":["${codes}"]}]`;

  //           ws2.send(str);
  //       });
  //       ws2.on('close', () => {
  //           console.log('trade websocket is closed');
  //           setTimeout(function () {
  //               console.log('trade 재접속');
  //               tradeServerConnect2(codes);
  //           }, 1000);
  //       });
  //       ws2.on('message', (data) => {
  //           try {
  //               let str = data.toString('utf-8');

  //               recvData2 = JSON.parse(str);
  //           } catch (e) {
  //               console.log(e);
  //           }
  //       });
  //   }
  // ////////////////////////////////////이더리움

  function tradeServerConnect3(codes) {
    let ws3 = new WebSocket("wss://api.upbit.com/websocket/v1");

    ws3.on("open", () => {
      console.log("trade websocket is connected");
      // const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]}]`;
      const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]},{"type":"orderbook","codes":["KRW-ETH.5"]}]`;

      ws3.send(str);
    });
    ws3.on("close", () => {
      console.log("trade websocket is closed");
      setTimeout(function () {
        console.log("trade 재접속");
        tradeServerConnect3(codes);
      }, 1000);
    });
    ws3.on("message", (data) => {
      try {
        let str = data.toString("utf-8");
        if (JSON.parse(str).type == "ticker") {
          recvData3 = JSON.parse(str);
        } else {
          recvData4 = JSON.parse(str);
        }
        // recvData3 = JSON.parse(str);
      } catch (e) {
        console.log(e);
      }
    });
  }

  // function tradeServerConnect4(codes) {
  //     let ws4 = new WebSocket('wss://api.upbit.com/websocket/v1');

  //     ws4.on('open', () => {
  //         console.log('trade websocket is connected');
  //         // const str = `[{"ticket":"find"},{"type":"ticker","codes":["${codes}"]}]`;
  //         const str = `[{"ticket":"UNIQUE_TICKET"},{"type":"orderbook","codes":["${codes}"]}]`;

  //         ws4.send(str);
  //     });
  //     ws4.on('close', () => {
  //         console.log('trade websocket is closed');
  //         setTimeout(function () {
  //             console.log('trade 재접속');
  //             tradeServerConnect4(codes);
  //         }, 1000);
  //     });
  //     ws4.on('message', (data) => {
  //         try {
  //             let str = data.toString('utf-8');

  //             recvData4 = JSON.parse(str);
  //         } catch (e) {
  //             console.log(e);
  //         }
  //     });
  // }

  ///////////////////////////////
  async function start() {
    tradeServerConnect("KRW-BTC");
    function print() {
      // console.log("ㄱㄱㄱ");
      socket.emit("tasks", [
        recvData.trade_price,
        recvData.change,
        recvData.signed_change_price,
        recvData.signed_change_rate,
        recvData.trade_timestamp,
      ]);
      socket.emit("tasks2", [
        recvData2.orderbook_units,
        recvData2.total_ask_size,
        recvData2.total_bid_size,
      ]);
    }
    setInterval(print, 5000);
  }

  // async function start2() {
  //     tradeServerConnect2('KRW-BTC.5');
  //     function print() {

  //         socket.emit('tasks2', [recvData2.orderbook_units, recvData2.total_ask_size, recvData2.total_bid_size]);

  //     }
  //     setInterval(print, 5000);
  // }
  // //////////////////////////////////////////////////////
  async function start3() {
    tradeServerConnect3("KRW-ETH");
    function print() {
      socket.emit("tasks3", [
        recvData3.trade_price,
        recvData3.change,
        recvData3.signed_change_price,
        recvData3.signed_change_rate,
        recvData3.trade_timestamp,
      ]);
      socket.emit("tasks4", [
        recvData4.orderbook_units,
        recvData4.total_ask_size,
        recvData4.total_bid_size,
      ]);
    }
    setInterval(print, 5000);
  }

  // async function start4() {
  //     tradeServerConnect4('KRW-ETH.5');
  //     function print() {

  //         socket.emit('tasks4', [recvData4.orderbook_units, recvData4.total_ask_size, recvData4.total_bid_size]);

  //     }
  //     setInterval(print, 5000);
  // }
  ///////////////////////////////////////////////////////////////////

  async function start5() {
    const buylist = await client.query(
      "select sellbuy,price,sum(amount) as sum from sellbuy where sellbuy = ? group by price order by price desc limit 5",
      [0]
    );
    const selllist = await client.query(
      "select sellbuy,price,sum(amount) as sum from sellbuy where sellbuy = ? group by price order by price asc limit 5",
      [1]
    );
    let totalbuyamount = await client.query(
      "SELECT sum(amount) as sum from sellbuy GROUP BY sellbuy HAVING sellbuy = 0"
    );
    let totalsellamount = await client.query(
      "SELECT sum(amount) as sum from sellbuy GROUP BY sellbuy HAVING sellbuy = 1"
    );
    const conclusion = await client.query(
      "SELECT * FROM conclusion order by num asc"
    );
    const mysell = await client.query("select* from sellbuy where sellbuy = 1");
    const mybuy = await client.query("select* from sellbuy where sellbuy = 0");

    if (totalbuyamount[0] == undefined) {
      console.log("aa");
      totalbuyamount = 0;
    } else {
      totalbuyamount = totalbuyamount[0].sum;
    }
    if (totalsellamount[0] == undefined) {
      console.log("bb");
      totalsellamount = 0;
    } else {
      totalsellamount = totalsellamount[0].sum;
    }
    socket.emit("yamadata", {
      buylist: buylist,
      selllist: selllist,
      totalbuyamount: totalbuyamount,
      totalsellamount: totalsellamount,
      conclusion: conclusion,
      mysell: mysell,
      mybuy: mybuy,
    });
  }
  setInterval(start5, 5000);

  // start();
  // start2();
  // start3();
  // start4();
  // start5();
});

console.log("rrr");

module.exports = app;