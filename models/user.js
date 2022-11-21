// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    bio: String,
    skills: [String],
    projects: [String]  // TODO: image?
},{versionKey: false});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
