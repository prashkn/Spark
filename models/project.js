// Load required packages
var mongoose = require('mongoose');

// Define our project schema
var ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    skillset: [String],
    timeline: String,
    creator: String,
    applicants: [String],
    uninterested: [String],
    participants: [String]
}, {versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('Project', ProjectSchema);
