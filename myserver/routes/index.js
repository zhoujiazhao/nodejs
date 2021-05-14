var express = require('express');
var router = express.Router();
var api = require('./api.js')
// console.log('api: ', api.getUid)

router.use(api.getUid,  require(__dirname + api.getUid));
// router.use(api.returnPay,  require(__dirname + api.returnPay));

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
