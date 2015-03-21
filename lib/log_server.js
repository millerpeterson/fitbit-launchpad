var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get("/", function(req, res) {
    res.send("HI");
});

app.post("/log", function(req, res) {
    console.log(req.body);
    res.send("ACK");
});

var port = process.env.PORT || 1024;

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('FitBit logger listening at http://%s:%s', host, port);
})