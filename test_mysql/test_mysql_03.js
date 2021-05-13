var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1233',
  // database : 'miai'
});

var DB_NAME = 'miai';
var TABLE_NAME = 'users';

db.connect((err) =>{
  if (err) throw err;
  console.log('connected!')
});
 
db.query('show databases;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

db.query('CREATE DATABASE IF NOT EXISTS ' + DB_NAME, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS ) throw error;
  console.log('CREATE DATABASE IF NOT EXISTS ' + DB_NAME);
  //console.log(results);
});

db.query('USE ' + DB_NAME, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS ) throw error;
  console.log('USE ' + DB_NAME);
  //console.log(results);
});

// db.query('CREATE TABLE IF NOT EXISTS ' + TABLE_NAME + 
//   '( \
//   `id` INT UNSIGNED AUTO_INCREMENT KEY COMMENT \'用户编号\', \
//   `username` VARCHAR(20) NOT NULL UNIQUE COMMENT \'用户名\', \
//   `password` CHAR(32) NOT NULL COMMENT \'密码\',\
//   `email` VARCHAR(50) NOT NULL UNIQUE COMMENT \'邮箱\',\
//   `age` TINYINT UNSIGNED NOT NULL DEFAULT 18 COMMENT \'年龄\',\
//   `sex` ENUM(\'man\',\'woman\',\'baomi') NOT NULL DEFAULT \'baomi\' COMMENT \'性别\',\
//   `tel` CHAR(11) NOT NULL UNIQUE COMMENT '电话',\
//   `addr` VARCHAR(50) NOT NULL DEFAULT 'beijing' COMMENT '地址',\
//   `card` CHAR(18) NOT NULL UNIQUE COMMENT '身份证号',\
//   `married` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0代表未结婚，1代表已结婚',\
//   `salary` FLOAT(8,2) NOT NULL DEFAULT 0 COMMENT '薪水'\
//   ) ENGINE=INNODB DEFAULT CHARSET=UTF8; \
//   ', function (error, results, fields) {
//   if (error && err.number != Client.ERROR_DB_CREATE_EXISTS ) throw error;
//   console.log('CREATE TABLE IF NOT EXISTS ' + TABLE_NAME);
//   //console.log(results);
// });

db.end();