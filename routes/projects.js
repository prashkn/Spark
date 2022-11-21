const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const mongoose = require("mongoose");

// TODO: homepage feed includes projects only with users skills, creator of projects gets applicants
// and can accept or not

// Get all projects (testing purposes)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({ message: "OK", data: projects });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

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

// Get home feed
// body: {userId}
router.get("/homepage", async (req, res) => {
  try {
    const userId = req.body.userId;
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
    res.status(200).json({ message: "OK" });
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
    res.status(200).json({ message: "OK" });
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
      applicants: [],
      uninterested: [],
      participants: [],
    });
    await project.save();
    return res.status(201).json({ message: "Project created", data: project });
  } catch {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

module.exports = router;

module.exports = router;
