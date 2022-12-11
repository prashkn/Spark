// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var AvatarSchema = new mongoose.Schema(
  {
    user: String,
    sex: String,
    faceColor: String,
    hairStyle: String,
  },
  { versionKey: false }
);

// Export the Mongoose model
module.exports = mongoose.model("Avatar", AvatarSchema);
