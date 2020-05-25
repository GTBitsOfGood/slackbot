const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  admins: {
    type: [String],
    required: false
  },
  checkinPassword: {
    type: String,
    required: true
  },
  checkinActive: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.models.Info || mongoose.model("Info", infoSchema);
