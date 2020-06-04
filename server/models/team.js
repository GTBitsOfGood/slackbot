const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const teamSchema = new Schema({
  // the project's team name assigned by bits of good.
  // will be used as a unique indentifier in queries.
  name: {
    type: String,
    unique: true,
    required: true
  },
  // listing of users associated with a specific team.
  // used to group team members with one another.
  members: {
    type: [ObjectId],
    ref: "User"
  },
  // listing of all activites a team has been involved in.
  // will be used for record-keeping & future reference.
  activity: {
    type: [ObjectId],
    ref: "Event"
  },
  // total number of bytes a team has accumulated. will be
  // used to track contributions and byte-brawl outcomes.
  bytes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.Team || mongoose.model("Team", teamSchema);
