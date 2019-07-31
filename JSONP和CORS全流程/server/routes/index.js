var express = require('express');
var router = express.Router();


router.all('*', function (req, res, next) {
  // //允许跨域的客户端域名
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  // //允许客户端携带的请求头域，包括自定义的请求头域，否则会失败。
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , X-PINGOTHER');
  // //允许客户端发起的请求体方法。
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // //允许客户端访问的响应头域
  res.header('Access-Control-Expose-Headers', ['token', 'tag']);
  // //允许携带cookie信息
  res.header('Access-Control-Allow-Credentials',true);
  // //CORS认证的有效期
  // res.header("Access-Control-Max-Age", "3600");

  if (req.method == 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world");
});

module.exports = router;
