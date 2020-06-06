import mongoose from "mongoose";
import TeamType from "./teamType";

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

const teamSchema = new Schema({
  // the name of the team in Bits of Good
  name: {
    type: String,
    unique: true,
    required: true
  },
  // the team type. See the TeamType enum
  type: {
    type: String,
    required: true,
    validate: {
      validator: (type) => TeamType.isType(type),
      message: (props) => `"${props.value}" is not a value of the TeamType enum`
    }
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

export default (mongoose.models.Team || mongoose.model("Team", teamSchema));
