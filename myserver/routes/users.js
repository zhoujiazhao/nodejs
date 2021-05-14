var express = require('express');
var mysql = require('mysql');

var query = require('./query');
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
    return;
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
      console.log('[USE ', element.name, ' ERROR] - ', error.message);
      return;
    }
  });
});

db.end()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let rows = await query('select * from miai.users')
  console.log('rows: ', rows)
  res.json({ rows })
  res.end();
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  let rows = await query('select * from miai.users')
  console.log('-----------rows: ', rows)
  res.json({
    code: 20000,
    msg: 'OK',
    data: rows
  })
  res.end();
});

router.post('/register', async function (req, res, next) {
  let params = req.body;
  console.log(req.body)

  if (!params.username || !params.password || !params.type ||
    (params.type != 'wechat' &&
      params.type != 'username' &&
      params.type != 'email' &&
      params.type != 'phone' &&
      params.type != 'weibo')) {

    return res.json({
      success: false,
      msg: 'Failed, username, type(wechat,username,email,phone,weibo) or password is NULL.',
    })
  }
  // await query('SELECT username FROM miai.users WHERE username = ?', [params.username])
  //   .then((data) => {
  //     if (data.length > 0) {
  //       return res.json({
  //         success: false,
  //         msg: 'Failed, check your username or password!',
  //       })
  //     }
  //   });
  await query('insert into miai.users(username,nickname,gender) values(?,?,?)',
    [params.username, params.username, 0])
    .then(async (data) => {
      await query('insert into miai.auth_user(user_id,identity_type,identifier,credential) values((select id from miai.users where username = ?),?,?,?)',
        [params.username, params.type, params.username, params.password])
        .then(() => {
          return res.json({
            success: true,
            msg: 'OK',
          })
        })
        .catch((err) => {
          console.error(err.message)
          return res.json({
            success: false,
            msg: err.message,
          })
        })
    }
    ).catch((err) => {
      console.error(err.message)
      if (err.code == 'ER_DUP_ENTRY') {
        return res.json({
          success: false,
          msg: 'Failed, user name aready exist!',
        })
      }

      return res.json({
        success: false,
        msg: err.message,
      })
    });
});

module.exports = router;