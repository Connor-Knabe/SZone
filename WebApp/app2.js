var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('config/ssl/key.pem'),
  cert: fs.readFileSync('config/ssl/cert.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);
