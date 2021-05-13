var mysql = require('mysql');
// var config = JSON.parse(fs.readFileSync('config.json', 'utf8')).mysql;
config = require('./config');

var db = mysql.createConnection({
  host: config.mysql.host,//'localhost',
  user: config.mysql.user,
  password: config.mysql.password,
  // database : config.mysql.database
});

////table: users(id, nickname, gender, phone, married, hight, age, constellation, education, career, salary, native_place, smoke, drink, current_city, hobby, avatar)
////table: user_auth(id, user_id, identity_type, identifier, credential)
////table: target_couple(id, user_id, age, hight, married, education, smoke, drink, hobby, life_attitude, other)

db.connect((err) => {
  if (err) throw err;
  console.log('connected!')
});

db.query('show databases;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

db.query('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database);
  //console.log(results);
});

db.query('USE ' + config.mysql.database, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log('USE ' + config.mysql.database);
  //console.log(results);
});

//// Create Tables
db.query('CREATE TABLE IF NOT EXISTS ' + config.mysql.tables[0].name + config.mysql.tables[0].key, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query('CREATE TABLE IF NOT EXISTS ' + config.mysql.tables[1].name + config.mysql.tables[1].key, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query('CREATE TABLE IF NOT EXISTS ' + config.mysql.tables[2].name + config.mysql.tables[2].key, function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log(results);
});

// Show tables
db.query('SHOW TABLES', function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log(results);
});

//// Drop tables(Dangerous operation)
db.query('DROP TABLE IF EXISTS ' + config.mysql.tables[0].name , function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query('DROP TABLE IF EXISTS ' + config.mysql.tables[1].name , function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

db.query('DROP TABLE IF EXISTS ' + config.mysql.tables[2].name , function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  // console.log(results);
});

// Show tables
db.query('SHOW TABLES', function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log('---------Drop completed!: ', results);
});

db.end();