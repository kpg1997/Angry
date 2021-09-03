var mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const client = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: 'Angry',
    port: '3306',
});


module.exports = client;