// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    bio: String,
    skills: [String],
    projects: [String]  // TODO: image?
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
