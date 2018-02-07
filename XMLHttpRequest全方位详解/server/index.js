let express = require('express');
let http = require('http');
let routes = require('./routes');
let fs = require('fs');

let app = express();
let httpServer = http.createServer(app);
let port = 5389;


routes(app);
// error page
app.use(function (err, req, res, next) {

});
//未处理奔溃，系统奔溃
process.on('uncaughtException', (err) => {
    fs.writeSync(1, `Caught exception: ${err}\n`);
});
//promise错误未处理
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
httpServer.listen(port, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    console.log('Example app listening at http://%s:%s', "127.0.0.1", port);
});