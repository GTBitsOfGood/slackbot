const mongoose = require("mongoose");

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

const eventSchema = new Schema({
  // the name of the event
  name: {
    type: String,
    required: true
  },
  // A list of all the members who attended the event
  participants: {
    type: [{
      type: ObjectId,
      ref: "Member"
    }],
    default: []
  },
  // the check-in code used to verify meeting attendance
  code: {
    type: String,
    required: true
  },
  // the bits a member gets for checking into the event
  bits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
