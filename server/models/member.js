import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;
const { ObjectId } = SchemaTypes;

/**
 * The roles of a Bits of Good member.
 * @enum {string}
 */
const Role = {
  EXEC: "exec", // Exec members
  LEADER: "leader", // Leadership: PM's, EM's, etc.
  MEMBER: "member" // An ordinary member
};

/**
   * Returns whether a string is a valid role.
   * @param {string} string A string
   */
Role.isRole = function isRole(string) {
  return Object.values(Role).indexOf(string) !== -1;
};

// prevent modification of the Role enum
Object.freeze(Role);

/**
 * The Member model for Bits of Good members.
 */

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
    default: "member",
    validate: {
      validator: (role) => Role.isRole(role),
      message: (props) => `"${props.value}" is not a value of the Role enum`
    }
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

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export { Role, Member };
