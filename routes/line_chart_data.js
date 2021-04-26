var express = require('express');
var router = express.Router();

const mysql = require('mysql');

// 这里按自己的数据库设计链接
var db = mysql.createConnection({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password:'662606',
  database:'covid',
})

router.get('/*', function(req, res) {
    // 这里要看解码路由转为查询
    var where = req.params['0']

    // line chart
    db.query(`select *from ${where} order by Updated;`,function(err,data){
  if(err){
    console.log('error/', err);
  }else{
    // console.log('成功链接数据库')
    var getData = JSON.parse(JSON.stringify(data));

    var x =[];
    var y1 =[];
    var y2=[];
    var y3=[];
    for( i =0;i<getData.length;i=i+1){
      
      x.push(getData[i]['Updated']);
      y1.push(getData[i]['Confirmed']);
      y2.push(getData[i]['Recovered']);
      y3.push(getData[i]['Deaths']);

    }
    
    res.send({x_out:x, y1_out:y1, y2_out:y2, y3_out:y3});
  }
})

  });

module.exports = router
