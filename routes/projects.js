const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const mongoose = require("mongoose");

// TODO: homepage feed includes projects only with users skills

// Get all projects (testing purposes)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({ message: "OK", data: projects });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get home feed
// query: {userId}
router.get("/homepage", async (req, res) => {
  try {
    if (req.query.userId == null) {
      return res
        .status(400)
        .json({ message: "userId must be in query params" });
    }
    const userId = req.query.userId;
    const projects = await Project.find();
    let data = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].creator == userId) {
        continue;
      }
      let shouldSkip = false;
      const applicants = projects[i].applicants;
      for (let j = 0; j < applicants.length; j++) {
        if (applicants[j] == userId) {
          shouldSkip = true;
        }
      }
      const uninterested = projects[i].uninterested;
      for (let j = 0; j < uninterested.length; j++) {
        if (uninterested[j] == userId) {
          shouldSkip = true;
        }
      }
      const participants = projects[i].participants;
      for (let j = 0; j < participants.length; j++) {
        if (participants[j] == userId) {
          shouldSkip = true;
        }
      }
      if (!shouldSkip) {
        data.push(projects[i]);
      }
    }
    return res.status(200).json({ message: "OK", data: data });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Swipe right on project
// body: {projectId, userId}
router.put("/swiperight", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    if (project == null) {
      return res
        .status(404)
        .json({ message: "Project does not exist", data: {} });
    }
    let shouldAdd = true;
    for (let i = 0; i < project.applicants.length; i++) {
      if (project.applicants[i] == req.body.userId) {
        shouldAdd = false;
        break;
      }
    }
    if (shouldAdd) {
      project.applicants.push(req.body.userId);
      await project.save();
    }
    const user = await User.findById(req.body.userId);
    user.applications.push({"projectId": req.body.projectId, "status": "Under review"});
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Swipe left on project
// body: {projectId, userId}
router.put("/swipeleft", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    if (project == null) {
      return res
        .status(404)
        .json({ message: "Project does not exist", data: {} });
    }
    let shouldAdd = true;
    for (let i = 0; i < project.uninterested.length; i++) {
      if (project.uninterested[i] == req.body.userId) {
        shouldAdd = false;
        break;
      }
    }
    if (shouldAdd) {
      project.uninterested.push(req.body.userId);
      await project.save();
    }
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Create project
// body: {title, description, skillset, timeline, creator}
router.post("/create", async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      skillset: req.body.skillset,
      timeline: req.body.timeline,
      creator: req.body.creator,
      membersNeeded: req.body.membersNeeded,
      applicants: [],
      uninterested: [],
      participants: [],
    });

    //save to a var so we can access the id
    const savedProject = await project.save();

    //update user to include the project id in their project list
    await User.findOneAndUpdate(
      { _id: req.body.creator },
      {
        $push: { projects: savedProject._id },
      }
    );

    return res
      .status(201)
      .json({ message: "Project created", data: savedProject });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get the projects a user created
// query: {userId}
router.get("/createdprojects", async (req, res) => {
  try {
    if (
      req.query.userId == null ||
      !mongoose.Types.ObjectId.isValid(req.query.userId)
    ) {
      return res
        .status(400)
        .json({ message: "userId must be in present and valid." });
    }
    const data = await Project.find({ creator: req.query.userId });
    return res.status(200).json({ message: "OK", data: data });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Accept an applicant into project
// body: {userId, projectId}
router.put("/check", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    for (let i = 0; i < project.applicants.length; i++) {
      if (project.applicants[i] == req.body.userId) {
        project.applicants.splice(i, 1);
      }
    }
    project.participants.push(req.body.userId);
    await project.save();
    const user = await User.findById(req.body.userId);
    for (let i = 0; i < user.applications.length; i++) {
      if (user.applications[i].projectId == req.body.projectId) {
        user.applications[i].status = "Accepted";
        await user.save();
        break;
      }
    }
    return res.status(200).json({ message: "OK", data: {} });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Uncheck an applicant from project
// body: {userId, projectId}
router.put("/uncheck", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectId);
    for (let i = 0; i < project.participants.length; i++) {
      if (project.participants[i] == req.body.userId) {
        project.participants.splice(i, 1);
      }
    }
    project.applicants.push(req.body.userId);
    await project.save();
    const user = await User.findById(req.body.userId);
    for (let i = 0; i < user.applications.length; i++) {
      if (user.applications[i].projectId == req.body.projectId) {
        user.applications[i].status = "Under review";
        await user.save();
        break;
      }
    }
    return res.status(200).json({ message: "OK", data: {} });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get project info
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project", data: {} });
    }
    return res.status(200).json({ message: "OK", data: project });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Modify a project
//body: {}
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res
        .status(404)
        .json({ message: "Project does not exist", data: {} });
    }
    if (req.body.title != null) {
      project.title = req.body.title;
    }
    if (req.body.description != null) {
      project.description = req.body.description;
    }
    if (req.body.skillset != null) {
      project.skillset = req.body.skillset;
    }
    if (req.body.timeline != null) {
      project.timeline = req.body.timeline;
    }
    if (req.body.membersNeeded != null) {
      project.membersNeeded = req.body.membersNeeded;
    }
    await project.save()
    return res.status(200).json({ message: "Project modified", data: project })
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
})

// Delete project (testing purposes)
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res
        .status(404)
        .json({ message: "Project does not exist", data: {} });
    }
    await project.remove();
    return res.status(200).json({ message: "Project deleted", data: {} });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

module.exports = router;
