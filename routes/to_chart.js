var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
    // 这里要看解码路由转为查询
    // console.log("male");
    var where = req.params['0'];
    // console.log(where);
    res.render('echarts_data', {region:where})
  });

module.exports = router