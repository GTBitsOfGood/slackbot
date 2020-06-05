const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const eventSchema = new Schema({
  // the name of the event
  name: {
    type: String,
    required: true
  },
  // A list of all the members who attended the event
  participants: {
    type: [ObjectId],
    ref: "Member",
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

export default (mongoose.models.Event || mongoose.model("Event", eventSchema));
