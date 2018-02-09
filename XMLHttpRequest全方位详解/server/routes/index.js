module.exports = function (app) {
    app.all('*', function (req, res, next) {
        //允许跨域的客户端域名
        res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
        //允许客户端携带的请求头域，包括自定义的请求头域，否则会失败。
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , X-PINGOTHER');
        //允许客户端发起的请求体方法。
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        //允许客户端访问的响应头域
        res.header('Access-Control-Expose-Headers', 'token');
        //允许携带cookie信息
        res.header('Access-Control-Allow-Credentials',true);
        //CORS认证的有效期
        res.header("Access-Control-Max-Age", "3600");
        if (req.method == 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    });
    //get请求
    app.get('/', (req, res) => {
        res.json({
            name: "黄成都",
            password: "123456",
            "requestParams":JSON.stringify(req.query)
        });
    });
    //post请求
    app.post('/', (req, res) => {
        //设置cookie，只有客户端和服务端都配置好以后才能成功
        res.cookie((new Date()), "黄成都");
        //设置自定义的响应头域，可以存放认证信息或者响应给客户端的信息。
        res.header("token",(new Date()));
        res.json({
            name: "黄成都",
            password: "123456",
            "requestParams":JSON.stringify(req.body)
        });
    });
}