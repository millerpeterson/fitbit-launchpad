function authorize(client, req, res) {
    client.getRequestToken().then(function (results) {
        var token, secret;
        token = results[0];
        secret = results[1];
        requestTokenSecrets[token] = secret;
        res.redirect("http://www.fitbit.com/oauth/authorize?oauth_token=" + token);
    }, function (error) {
        res.send(error);
    });
}

function oauthCallback(client, req, res) {
    var token = req.query.oauth_token,
        secret = requestTokenSecrets[token],
        verifier = req.query.oauth_verifier;
    client.getAccessToken(token, secret, verifier).then(function (results) {
        var accessToken = results[0],
            accessTokenSecret = results[1],
            userId = results[2].encoded_user_id;
        persistAccessToken(userId, accessToken, accessTokenSecret);
        res.status(200).send("Fitbit authorization successful.");
    }, function (error) {
        res.send(error);
    });
}

function persistAccessToken(userId, accessToken, accessTokenSecret) {
    console.log("Persist Access Token: " +
                [userId, accessToken, accessTokenSecret].join(' '));
}

module.exports.authorize = authorize;
module.exports.oauthCallback = oauthCallback;