var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1233',
  // database : 'miai'
});

var DB_NAME = 'miai';
// table: users(id, nickname, gender, phone, married, hight, age, constellation, education, career, salary, native_place, smoke, drink, current_city, hobby, avatar)
// table: user_auth(id, user_id, identity_type, identifier, credential)
// table: target_couple(id, user_id, age, hight, married, education, smoke, drink, hobby, life_attitude, other)
var TB_USERS = 'users';
var TB_AUTH_USER = 'auth_user'
var TB_TARGET_COUPLE = 'target_couple'
var KEY_USERS =`(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '用户编号',
  username VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
  nickname VARCHAR(100) NOT NULL COMMENT '昵称',
  gender TINYINT NOT NULL DEFAULT 0 COMMENT '0未知，1男，2女',
  phone CHAR(11) UNIQUE COMMENT '电话',
  married TINYINT DEFAULT 0 COMMENT '0位置，1未婚，2已婚',
  hight FLOAT DEFAULT 160 COMMENT '身高',
  age TINYINT UNSIGNED DEFAULT 18 COMMENT '年龄',
  constellation VARCHAR(100) COMMENT '星座',
  education VARCHAR(64) COMMENT '学历',
  career VARCHAR(64) COMMENT '职业',
  salary INT DEFAULT 5000 COMMENT '薪水',
  native_place VARCHAR(64) COMMENT '籍贯',
  smoke TINYINT DEFAULT 0 COMMENT '0未知，1吸，2不吸',
  drink TINYINT DEFAULT 0 COMMENT '0未知，1喝，2不喝',
  current_city VARCHAR(64) COMMENT '当前城市',
  hobby VARCHAR(20) COMMENT '业余爱好',
  avatar BLOB COMMENT '头像'
  )ENGINE=InnoDB DEFAULT CHARSET=utf8`

var KEY_AUTH_USER = `(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '用户认证编号',
  user_id INT UNSIGNED  NOT NULL COMMENT '用户编号',
  identity_type ENUM('wechat','username','email','phone','weibo') NOT NULL UNIQUE COMMENT '认证类型',
  identifier VARCHAR(20) NOT NULL COMMENT '唯一标识',
  credential VARCHAR(1024) COMMENT '密码/token'
  )ENGINE=InnoDB DEFAULT CHARSET=utf8`;

let KEY_TARGET_COUPLE = `(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '未来另一半编号',
  user_id INT UNSIGNED  NOT NULL COMMENT '用户编号',
  age TINYINT UNSIGNED DEFAULT 18 COMMENT '年龄',
  hight FLOAT DEFAULT 160 COMMENT '身高',
  married TINYINT DEFAULT 0 COMMENT '0位置，1未婚，2已婚',
  education VARCHAR(64) COMMENT '学历',
  smoke TINYINT DEFAULT 0 COMMENT '0未知，1吸，2不吸',
  drink TINYINT DEFAULT 0 COMMENT '0未知，1喝，2不喝',
  hobby VARCHAR(20) COMMENT '业余爱好',
  life_attitude VARCHAR(64) COMMENT '生活态度',
  other VARCHAR(1024) COMMENT '其它'
  )ENGINE=InnoDB DEFAULT CHARSET=utf8`;

db.connect((err) => {
  if (err) throw err;
  console.log('connected!')
});

db.query('show databases;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

db.query('CREATE DATABASE IF NOT EXISTS ' + DB_NAME, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log('CREATE DATABASE IF NOT EXISTS ' + DB_NAME);
  //console.log(results);
});

db.query('USE ' + DB_NAME, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log('USE ' + DB_NAME);
  //console.log(results);
});

//// Create Tables
db.query( 'CREATE TABLE IF NOT EXISTS ' + TB_USERS + KEY_USERS, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query( 'CREATE TABLE IF NOT EXISTS ' + TB_AUTH_USER + KEY_AUTH_USER, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query( 'CREATE TABLE IF NOT EXISTS ' + TB_TARGET_COUPLE + KEY_TARGET_COUPLE, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

// Show tables
db.query( 'SHOW TABLES', function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log(results);
});

//// Drop tables(Dangerous operation)
// db.query('DROP TABLE IF EXISTS ' + TB_USERS , function (error, results, fields) {
//   if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
//   // console.log(results);
// });

// db.query('DROP TABLE IF EXISTS ' + TB_AUTH_USER , function (error, results, fields) {
//   if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
//   // console.log(results);
// });

// db.query('DROP TABLE IF EXISTS ' + TB_TARGET_COUPLE , function (error, results, fields) {
//   if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
//   //console.log(table_user);
//   console.log(results);
// });

db.end();