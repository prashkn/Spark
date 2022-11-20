const mongoose = require("mongoose");
var Project = require("../models/project.js");
var User = require("../models/user.js");

module.exports = function (router) {
  var projectsRoute = router.route("/projects");
  var projectsIdRoute = router.route("/projects/:id");

  projectsRoute.get(function (req, res) {});

  projectsRoute.post(async function (req, res) {});

  projectsIdRoute.get(function (req, res) {});

  projectsIdRoute.put(async function (req, res) {});

  projectsIdRoute.delete(async function (req, res) {});

  return router;
};
