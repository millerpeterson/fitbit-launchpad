var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./lib/authorize.js'),
    pjson = require('package.json'),
    util = require('util'),
    app = express();

var jsonParser = bodyParser.json();
app.post("/log", jsonParser, function(req, res) {
    console.log(req.body);
    res.status('204').send();
});

app.get("/", function(req, res) {
    res.send(util.format('FitBit Logger v%s', pjson.version));
});
app.get("/authorize", auth.authorize);
app.get("/oauth-callback", auth.oauthCallback);

var port = 80,
    server;

server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('FitBit Logger listening at http://%s:%s', host, port);
});