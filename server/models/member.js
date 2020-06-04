const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema({
  // alphanumeric string provided by slack -- cannot be
  // changed. used as a unique identifier in queries.
  slackid: {
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
  // determines whether a user has permission to use a
  // command. hierarchy: member → leader → executive.
  role: {
    type: String,
    default: "Member"
  },
  // listing of all activites a user has been involved in.
  // will be used for record-keeping & future reference.
  activity: {
    type: [ObjectId],
    ref: "Event"
  },
  // users are assigned a project-team early on in the
  // semester. will be used to group members together.
  team: {
    type: ObjectId,
    ref: "Team"
  },
  // total number of "bits" a user has accumulated. used
  // to quantify one's contributions to the organization.
  bits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
