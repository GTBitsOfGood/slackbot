
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

/**
 * Returns whether a member with the given role is at the given permission level.
 * @param {Role} role The role of the member
 * @param {Role} permissionLevel The permission level
 */
Role.hasPermission = function hasPermission(role, permissionLevel) {
  const roles = Object.values(Role);
  const roleIndex = roles.indexOf(role);
  const permissionLevelIndex = roles.indexOf(permissionLevel);
  if (roleIndex === -1) {
    throw new Error("the role must be one of the values of the Role enum");
  }
  if (permissionLevelIndex === -1) {
    throw new Error("the permissionLevel must be one of the values of the Role enum");
  }
  return roleIndex <= permissionLevelIndex;
};

// prevent modification of the Role enum
Object.freeze(Role);

export default Role;
