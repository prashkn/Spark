const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Project = require('../models/project')
const mongoose = require('mongoose')

// Get home feed
// body: {userId}
router.get('/homepage', async(req, res) => {
    try {
        const userId = req.body.userId
        const projects = await Projects.find()
        let data = []
        for (let i = 0; i < projects.length; i++) {
            const applicants = projects[i].applicants
            for (let j = 0; j < applicants.length; j++) {
                if (applicants[j] == userId) {
                    continue
                }
            }
            const uninterested = projects[i].uninterested
            for (let j = 0; j < uninterested.length; j++) {
                if (uninterested[j] == userId) {
                    continue
                }
            }
            const participants = projects[i].participants
            for (let j = 0; j < participants.length; j++) {
                if (participants[j] == userId) {
                    continue
                }
            }
            data.push(projects[i])
        }
        return res.status(200).json({message: "OK", data: data})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    }
})

// Swipe right on project
// body: {projectId, userId}
router.put('/swiperight', async(req, res) => {
    try {
        const project = await Project.findById(req.body.projectId)
        project.applicants.push(req.body.userId)
        await project.save()
        res.status(200).json({message: "OK"})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    }
})

// Swipe left on project
// body: {projectId, userId}
router.put('/swipeleft', async(req, res) => {
    try {
        const project = await Project.findById(req.body.projectId)
        project.uninterested.push(req.body.userId)
        await project.save()
        res.status(200).json({message: "OK"})
    } catch (err) {
        return res.status(500).json({message: err.message, data:{}})
    }
})

// Create project
// body: {title, description, skillset, timeline, creator}
router.post('/create', async(req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            skillset: req.body.skillset,
            timeline: req.body.timeline,
            creator: req.body.creator,
            applicants: [],
            uninterested: [],
            participants: []
        })
        await project.save()
        return res.status(201).json({message: "Project created", data: project})
    } catch {
        return res.status(500).json({message: err.message, data:{}})
    }
})

module.exports = router