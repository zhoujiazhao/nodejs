var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1233',
  database: 'miai'
});
// var mysql      = require('mysql');
// let resData;
// router.use((req,res,next)=>{
//   resData = {
//     code:200,//200表示得到了返回值，后面可以定义其他的返回代码
//     message:""
//   }
// })



conn.connect();

conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
// conn.query('SELECT * FROM sys.databases;', function (error, results, fields) {  
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
