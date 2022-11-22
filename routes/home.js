var secrets = require("../config/secrets");

module.exports = function (router) {
  var homeRoute = router.route("/");

  homeRoute.get(function (req, res) {
    var connectionString = secrets.token;
    res.json({ message: "My connection string is " + connectionString });
  });

  return router;
};

/*
Request -- Reasoning
POST /project -- When a user creates a post
GET /project -- Loading in the user feed
POST /user -- When a user signs up for the platform
GET /user -- When a user clicks on their own profile, or another user's profile
PUT /project -- When a user swipes right on a post
PUT /project -- When a creator accepts users
*/
