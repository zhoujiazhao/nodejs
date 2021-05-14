const mysql = require('mysql')
var config = require('../config');

const pool = mysql.createPool({
  host: config.mysql.host,//'localhost',
  user: config.mysql.user, //'root'
  password: config.mysql.password,//'1233'
  database: config.mysql.database
})

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

let query = function (sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, res) => {
          if (err) {
            reject(err)
          } else {
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            resolve(res)
          }
          ///停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
          connection.release(function (err) {
            if (err) {
              reject(err)
            }
          });
        })
      }
    })
  })
}

module.exports = query