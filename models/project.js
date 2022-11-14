// Load required packages
var mongoose = require('mongoose');

// Define our project schema
var ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    skillset: [String],
    timeline: Date,
    creator: String,
    applicants: [String],
    participants: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('Project', ProjectSchema);
