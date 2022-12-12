// Load required packages
var mongoose = require("mongoose");

// Define our project schema
var ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    skillset: [String],
    timeline: String,
    creator: String,
    membersNeeded: Number,
    applicants: [String],
    uninterested: [String],
    participants: [String],
    summary: String,
  },
  { versionKey: false }
);

// Export the Mongoose model
module.exports = mongoose.model("Project", ProjectSchema);
