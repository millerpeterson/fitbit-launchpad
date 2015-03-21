var express = require('express');
var app = express();

app.use(express.bodyParser());

app.get("/", function(req, res)) {
    res.send("Hi.")
}

app.get("/log", function(req, res) {
    console.log(req.body);
    res.send("ACK");
});

app.listen(80);