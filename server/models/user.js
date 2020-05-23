const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  slackId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true   
  },
  totalBits: {
    type: Number,
    required: false,
    default: 0
  },
  teamId: {
    type: String,
    required: false,
    default: "None"
  },
  checkedIn: {
    type: Boolean,
    required: false,
    default: false
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
