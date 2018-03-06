var path = require('path');
var fs = require('fs')
var http = require('http')
var url = require('url')
var mime = require('./mime').types
var config = require("./config");
var zlib = require("zlib")
var utils = require("./utils")

var port = 8089;
var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var realpath = path.join("assets", path.normalize(pathname.replace(/\.\./g, "")))
    var ext = path.extname(realpath)
    ext = ext ? ext.slice(1):"unknown"
    var contentType = mime[ext] || "text/plain"
    fs.exists(realpath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            response.write("This request URL " + pathname + "was not found on this server");
            response.end();
        } else {
            response.setHeader("Content-Type",contentType);
            var stats = fs.statSync(realpath);
                if (request.headers["range"]) {
                    var range = utils.parseRange(request.headers["range"], stats.size);
                    if (range) {
                        response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
                        response.setHeader("Content-Length", (range.end - range.start + 1));
                        var stream = fs.createReadStream(realpath, {
                            "start": range.start,
                            "end": range.end
                        });
                        response.writeHead('206', "Partial Content");
                        stream.pipe(response);
                    } else {
                        response.removeHeader("Content-Length");
                        response.writeHead(416, "Request Range Not Satisfiable");
                        response.end();
                    }
                } else {
                    var stream = fs.createReadStream(realpath);
                    response.writeHead('200', "Partial Content");
                    stream.pipe(response);
                }
        }
    })
})

server.listen(port)

