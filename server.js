var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./lib/authorize.js'),
    pjson = require('./package.json'),
    fitbit_client = require('./lib/fitbit.js').client,
    util = require('util'),
    _ = require('underscore'),
    app = express();

var jsonParser = bodyParser.json();
app.post("/log", jsonParser, function(req, res) {
    console.log(req.body);
    res.status('204').send();
});

app.get("/", function(req, res) {
    res.send(util.format('FitBit Logger v%s', pjson.version));
});
app.get("/authorize", _.partial(auth.authorize, fitbit_client));
app.get("/oauth-callback", _.partial(auth.oauthCallback, fitbit_client));

var port = 80,
    server;

server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('FitBit Logger listening at http://%s:%s', host, port);
});