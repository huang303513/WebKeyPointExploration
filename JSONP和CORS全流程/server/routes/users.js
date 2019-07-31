var express = require('express');
var router = express.Router();

//get请求
router.get('/', (req, res) => {
      res.json({
          name: "黄成都",
          password: "123456",
          "requestParams":JSON.stringify(req.query)
      });
  });
  //post请求
  router.post('/', (req, res) => {
      //设置cookie，只有客户端和服务端都配置好以后才能成功
    //   res.cookie('name', 'huangchengdu');
      //设置自定义的响应头域，可以存放认证信息或者响应给客户端的信息。
      res.header("token",(new Date()).toISOString());
      res.header("tag",'123455');
      res.json({
          name: "黄成都",
          password: "123456",
          "requestParams":JSON.stringify(req.body)
      });
  });

module.exports = router;
