var mysql = require('mysql');
// var config = JSON.parse(fs.readFileSync('config.json', 'utf8')).mysql;
config = require('./config');

var db = mysql.createConnection({
  host: config.mysql.host,//'localhost',
  user: config.mysql.user, //'root'
  password: config.mysql.password,//'1233'
  // database : config.mysql.database
});

//// database: 'miai';
//// table1  : users(id, nickname, gender, phone, married, hight, age, constellation, education, career, salary, native_place, smoke, drink, current_city, hobby, avatar)
//// table2  : user_auth(id, user_id, identity_type, identifier, credential)
//// table3  : target_couple(id, user_id, age, hight, married, education, smoke, drink, hobby, life_attitude, other)

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

config.mysql.tables.forEach(element => {
  //// Create Tables
  db.query('CREATE TABLE IF NOT EXISTS ' + element.name + element.key, function (error, results, fields) {
    if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
    // console.log(results);
  });
});

// Show tables
db.query('SHOW TABLES', function (error, results, fields) {
  if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
  console.log(results);
});

//// Drop tables(Dangerous operation)
// config.mysql.tables.forEach(element => {
//   //// Create Tables
//   db.query('CREATE TABLE IF NOT EXISTS ' + element.name + element.key, function (error, results, fields) {
//     if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
//     // console.log(results);
//   });
//   db.query('DROP TABLE IF EXISTS ' + element.name , function (error, results, fields) {
//     if (error && err.number != Client.ERROR_DB_CREATE_EXISTS) throw error;
//     // console.log(results);
//   });
// });


db.end();