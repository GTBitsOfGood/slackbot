const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

const memberSchema = new Schema({
  // alphanumeric string provided by slack -- cannot be
  // changed. used as a unique identifier in queries.
  slackId: {
    type: String,
    unique: true,
    required: true
  },
  // unique, self-assigned pseudonym -- can be changed.
  // will be primarily used for @mentions in messages.
  username: {
    type: String,
    unique: true,
    required: true
  },
  // the first name of the member
  firstName: {
    type: String,
    required: true
  },
  // the last name of the member
  lastName: {
    type: String,
    required: true
  },
  // determines whether a member has permission to use a
  // command. Current roles are "member", "leader", and "exec"
  role: {
    type: String,
    default: "member"
  },
  // the team (project, committee, etc.) a member is in
  team: {
    type: ObjectId,
    ref: "Team",
    required: true
  },
  // the total number of Bits a member has accumulated.
  bits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.Member || mongoose.model("Member", memberSchema);
