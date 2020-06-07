
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

export default Role;
