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
  // console.log('rows: ', rows)
  res.json({ rows })
  res.end();
});

function params_check(params) {
  let res_data = {
    success: true,
    msg: '',
  };

  if (!params.username || !params.password || !params.type ||
    (params.type != 'wechat' &&
      params.type != 'username' &&
      params.type != 'email' &&
      params.type != 'phone' &&
      params.type != 'weibo')) {
    res_data.success = false;
    res_data.msg = 'Failed, username, type(wechat,username,email,phone,weibo) or password is NULL.';
    return res_data;
  }

  var reg_username = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[-_a-zA-Z0-9]){4,32}$/;
  var reg_mail = /[\d\w\._-]+@[\d\w]+\.[\w]+/;
  var reg_phone = /^1[34578]\d{9}$/;
  var reg_password = /([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]){8,32}$/;

  if (params.type == 'username') {
    if (!reg_username.test(params.username)) {
      res_data.success = false;
      res_data.msg = 'Failed, username wrong format, please intput a-z,A-Z and 0-9 in 4-32 bytes.';
    }
    else if (!reg_password.test(params.password)) {
      res_data.success = false;
      res_data.msg = 'Failed, password wrong format, please intput a-z,A-Z,0-9 and other characters in 8-32 bytes.';
    }
  }
  else if (params.type == 'email') {
    if (!reg_mail.test(params.username)) {
      res_data.success = false;
      res_data.msg = 'Failed, email wrong format, please intput a correct one.';
    }
    else if (!reg_password.test(params.password)) {
      res_data.success = false;
      res_data.msg = 'Failed, password wrong format, please intput a-z,A-Z,0-9 and other characters in 8-32 bytes.';
    }
  }
  else if (params.type == 'phone') {
    if (!reg_phone.test(params.username)) {
      res_data.success = false;
      res_data.msg = 'Failed, phone number wrong format, please intput 11 numbers.';
    }
    else if (!reg_password.test(params.password)) {
      res_data.success = false;
      res_data.msg = 'Failed, password wrong format, please intput a-z,A-Z,0-9 and other characters in 8-32 bytes.';
    }
  } else { //wechat and weibo token
    if (!reg_username.test(params.username)) {
      res_data.success = false;
      res_data.msg = '!Failed, username wrong format, please intput a-z,A-Z and 0-9 in 4-32 bytes.';
    }
  }
  return res_data;
}


router.post('/login', async (req, res) => {
  let params = req.body;

  let res_data = {
    success: false,
    msg: '',
  };

  console.log(req.body);
  res_data = params_check(params);
  if (!res_data.success) {
    return res.json(res_data);
  }
  res_data.success = false;

  await query('SELECT * FROM miai.users,miai.auth_user WHERE users.id = auth_user.user_id AND users.username=? AND auth_user.identity_type=? AND auth_user.credential=?', [params.username, params.type, params.password])
    .then((data) => {
      if (data.length > 0) {
        res_data.success = true;
        res_data.msg = 'OK';
        return res.json(res_data);
      } else {
        res_data.msg = 'Failed, username, type, password error or the user is not registered.';
        console.log(res_data.msg);
        return res.json(res_data);
      }
    }).catch((err) => {
      console.error(err.message)
      res_data.msg = err.message;
      return res.json(res_data);
    });
});

router.post('/register', async function (req, res, next) {
  let params = req.body;
  let res_data = {
    success: false,
    msg: '',
  };

  // console.log(req.body)
  res_data = params_check(params);
  if (!res_data.success) {
    console.log('---------------------01: ', res_data.success)
    return res.json(res_data);
  }
  console.log('---------------------02')

  res_data.success = false;
  await query('INSERT INTO miai.users(username,nickname,gender) VALUES(?,?,?)',
    [params.username, params.username, 0])
    .then(async (data) => {
      await query('INSERT INTO miai.auth_user(user_id,identity_type,identifier,credential) VALUES((SELECT id FROM miai.users WHERE username = ?),?,?,?)',
        [params.username, params.type, params.username, params.password])
        .then(() => {
          res_data.success = true;
          res_data.msg = 'OK';
          return res.json(res_data);
        })
        .catch((err) => {
          console.error(err.message)
          res_data.msg = err.message;
          return res.json(res_data);
        })
    }).catch((err) => {
      console.error(err.message)
      if (err.code == 'ER_DUP_ENTRY') {
        res_data.msg = 'Failed, user name aready exist.';
        return res.json(res_data);
      }
      res_data.msg = err.message;
      return res.json(res_data);
    });
});

module.exports = router;