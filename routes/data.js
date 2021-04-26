var express = require('express');
var router = express.Router();

const mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password:'662606',
  database:'covid',
})

/* GET home page. */
router.get('/*', function(req, res) {
  // 这里要看解码路由转为查询
  var where = req.params['0']
  db.query(`select *from ${where} order by Updated DESC limit 1;`,function(err,data){
    if(err){
      console.log('error/', err);
    }else{
      var getData = JSON.parse(JSON.stringify(data));
      // console.log(getData);
      res.send(getData[0]);
    }
  })
});


module.exports = router;