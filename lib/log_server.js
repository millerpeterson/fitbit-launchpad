var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient(process.env.FITBIT_CONSUMER_KEY,
                                 process.env.FITBIT_CONSUMER_SECRET);

app.get("/", function(req, res) {
    res.send("HI");
});

var jsonParser = bodyParser.json();
app.post("/log", jsonParser, function(req, res) {
    console.log(req.body);
    res.status('204').send();
});

var requestTokenSecrets = {};

app.get("/authorize", function (req, res) {
    client.getRequestToken().then(function (results) {
        var token, secret;
        token = results[0];
        secret = results[1];
        requestTokenSecrets[token] = secret;
        res.redirect("http://www.fitbit.com/oauth/authorize?oauth_token=" + token);
    }, function (error) {
        res.send(error);
    });
});

app.get("/oauth-callback", function (req, res) {
    var token = req.query.oauth_token,
        secret = requestTokenSecrets[token],
        verifier = req.query.oauth_verifier;
    client.getAccessToken(token, secret, verifier).then(function (results) {
        var accessToken = results[0],
            accessTokenSecret = results[1],
            userId = results[2].encoded_user_id;
        console.log("Adding subscription...")
        return client.requestResource("/apiSubscriptions/1.json", "POST", accessToken, accessTokenSecret).then(function (results) {
            var response = results[0];
            res.send(response);
        });
    }, function (error) {
        res.send(error);
    });
});

var port = process.env.PORT || 1024,
    server;

server = app.listen(port, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log('FitBit logger listening at http://%s:%s', host, port);
});