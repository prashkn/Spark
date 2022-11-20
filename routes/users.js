var User = require("../models/user.js");
var Project = require("../models/project.js");
var mongoose = require("mongoose");

module.exports = function (router) {
  var usersRoute = router.route("/users");
  var usersIdRoute = router.route("/users/:id");

  usersRoute.get(function (req, res) {});

  usersRoute.post(async function (req, res) {});

  usersIdRoute.get(function (req, res) {});

  usersIdRoute.put(async function (req, res) {});

  usersIdRoute.delete(async function (req, res) {});

  return router;
};
