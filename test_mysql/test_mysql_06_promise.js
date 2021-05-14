var mysql = require('mysql');

config = require('./query');

router.post('/login', async (req, res) => {
  // res.send(req.body);
  // res.end();
  let rows = await query('select * from users')
  console.log('-----------rows: ', rows)
  res.json({
    code: 20000,
    msg: 'OK',
    data: rows
  })
  res.end();
});