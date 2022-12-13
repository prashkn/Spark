// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    number: Number,
    bio: String,
    experience: String,
    location: String,
    skills: [String],
    projects: [String],
    applications: [{ projectId: String, status: String }],
    number: String,
  },
  { versionKey: false }
);

// Export the Mongoose model
module.exports = mongoose.model("User", UserSchema);
