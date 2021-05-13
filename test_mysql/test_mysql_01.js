var mysql      = require('mysql');

// **********************way 01
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1233'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
  connection.destroy();
});
// **********************way 02
// var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

// **********************way 03
// However, a connection can also be implicitly established by invoking a query:
// connection.query('SELECT 1', function (error, results, fields) {
//   if (error) throw error;
//   // connected!
// });

connection.end(function(err) {
  // The connection is terminated now
});

// connection.destroy();