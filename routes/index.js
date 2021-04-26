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
router.get('/', function(req, res) {
  // 主页这里应该是get全国的
  db.query('select *from china order by Updated DESC limit 1;',function(err,data){
    if(err){
      console.log('error/', err);
    }else{
      // console.log(JSON.parse(JSON.stringify(data)));
      var getData = JSON.parse(JSON.stringify(data));
  
      res.render('app_index',{全国:getData[0]});
    }
});
});

module.exports = router;
