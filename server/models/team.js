import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

/**
 * The different types of teams for Bits of Good.
 * @enum {string}
 */
const TeamType = {
  EXEC: "exec", // The executive board
  PROJECT: "project", // Project teams
  COMMITTEE: "committee" // Committees
};

/**
 * Returns whether a string is a valid team type.
 * @param {string} string A string
 */
TeamType.isType = function isType(string) {
  return Object.values(TeamType).indexOf(string) !== -1;
};

// prevent modification of the TeamType enum
Object.freeze(TeamType);

export default TeamType;

/**
 * The Team model for Bits of Good teams.
 */

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

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export { TeamType, Team };
