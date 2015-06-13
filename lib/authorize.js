var storage = require('node-persist'),
    requestTokenSecrets = {};

// OAuth

function authorizeRedirect(client, req, res) {
    client.getRequestToken().then(
        function (results) {
            var token, secret;
            token = results[0];
            secret = results[1];
            requestTokenSecrets[token] = secret;
            res.redirect("http://www.fitbit.com/oauth/authorize?oauth_token=" + token);
        },
        function (error) {
            res.send(error);
        });
}

function oauthCallback(client, req, res) {
    var token = req.query.oauth_token,
        secret = requestTokenSecrets[token],
        verifier = req.query.oauth_verifier;
    client.getAccessToken(token, secret, verifier).then(
        function (results) {
            var accessToken = results[0],
                accessTokenSecret = results[1],
                userId = results[2].encoded_user_id;
            persistAccessToken(userId, accessToken, accessTokenSecret);
            res.status(200).send("Authorization successful for user " + userId);
        },
        function (error) {
            res.send(error);
        });
}

// Access token persistence

storage.initSync();

function persistAccessToken(userId, accessToken, accessTokenSecret) {
    var tokenData = { "accessToken": accessToken,
                      "accessTokenSecret": accessTokenSecret };
    try {
        storage.setItemSync(userId, tokenData);
    } catch(err) {
        console.log("Failed to persist token for user " + userId +
                    " : " + err);
    }
}

function getAccessToken(userId) {
    return storage.getItemSync(userId);
}

module.exports.authorizeRedirect = authorizeRedirect;
module.exports.oauthCallback = oauthCallback;
module.exports.getAccessToken = getAccessToken;