var express = require('express');
var router = express.Router();
var http = require('http')


// miailist["name"] = "小四";
// console.log(miailist);

// var data = {
//   code:'20000',
//   uid:'id',
//   delete_time: 0
// }

// var jsonstr = JSON.stringify(data);

// fs.writeFile('routes/portal/index/miailist.json', jsonstr, function(err) {
//   if (err) {
//      console.error(err);
//   }else{
//       console.log('----------修改成功-------------');
//   }

// }); 
/* GET users listing. */
router.post('/', function (req, res) {
  //console.log('req.headers: ', req.headers)
  console.log('req.body   : ', req.body)
  JSCODE = req.body.code
  console.log('req.body.code     : ', req.body.code)
  console.log('JSCODE     : ', JSCODE)
  console.log('WECHAT_AUTH_URL     : ', WECHAT_AUTH_URL)
  // var data = {
  //   data: {
  //     code: '20000',
  //     uid: 'id',
  //     delete_time: 0
  //   }
  // }

  // http.request({
  //   WECHAT_AUTH_URL, success(res) {
  //     console.log('------------------------e: ', res.data)
  //   }
  // });
//   var jsonstr = JSON.stringify(miailist)
  // miailist.uid
  console.log('tx: ', jsonstr)
  res.send(jsonstr);
  //res.send('respond with a resource');
});

module.exports = router;