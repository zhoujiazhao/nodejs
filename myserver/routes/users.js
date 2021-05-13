var express = require('express');
var mysql = require('mysql');

var config = require('../config');
var router = express.Router();

var db = mysql.createConnection({
  host: config.mysql.host,//'localhost',
  user: config.mysql.user, //'root'
  password: config.mysql.password,//'1233'
  // database : config.mysql.database
});

/* Create database: 'miai'. */
db.query('CREATE DATABASE IF NOT EXISTS ' + config.mysql.database, function (error, results, fields) {
  if (error) {
    console.log('[CREATE DATABASE IF NOT EXISTS ', config.mysql.database, ' ERROR] - ', error.message);
    return;
  } 
});

/* Use database: 'miai'. */
db.query('USE ' + config.mysql.database, function (error, results, fields) {
  if (error) {
    console.log('[USE ', config.mysql.database, ' ERROR] - ', error.message);
  }
});

/* Create talbes. */
config.mysql.tables.forEach(element => {
  /*
   * table1  : users(id, nickname, gender, phone, married, hight, age, constellation, education, career, salary, native_place, smoke, drink, current_city, hobby, avatar)
   * table2  : user_auth(id, user_id, identity_type, identifier, credential)
   * table3  : target_couple(id, user_id, age, hight, married, education, smoke, drink, hobby, life_attitude, other)
   */
  db.query('CREATE TABLE IF NOT EXISTS ' + element.name + element.key, function (error, results, fields) {
    if (error) {
      console.log('[USE ',  element.name, ' ERROR] - ', error.message);
    }
  });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
