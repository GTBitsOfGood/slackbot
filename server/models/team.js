const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

const teamSchema = new Schema({
  // the name of the team in Bits of Good
  name: {
    type: String,
    unique: true,
    required: true
  },
  // the team type. Current values are
  // "project", "committee", and "exec"
  type: {
    type: String,
    required: true
  },
  // a list of the members in a Bits of Good team
  members: {
    type: [{
      type: ObjectId,
      ref: "Member"
    }],
    default: []
  },
  bytes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.Team || mongoose.model("Team", teamSchema);
