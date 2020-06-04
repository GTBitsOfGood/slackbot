const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const eventSchema = new Schema({
  // provides information regarding the event's purpose.
  // examples include meetings, donut dates, outings, etc.
  type: {
    type: String,
    required: true
  },
  // listing of all users associated with an event. will
  // be used to mark attendance & prevent double checkins.
  participants: {
    type: [ObjectId],
    ref: "User"
  },
  // unix timestamp of when an event was created/occurred.
  // useful for keeping track of dates, if they're needed.
  timestamp: {
    type: Date,
    default: Date.now
  },
  // represents whether a meeting's check-in window is open.
  // exclusively used for organization-wide, weekly meetings.
  active: {
    type: Boolean
  },
  // check-in code used to verify meeting attendenace. again,
  // will only be used in the organization's weekly meetings.
  code: {
    type: String
  }
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
