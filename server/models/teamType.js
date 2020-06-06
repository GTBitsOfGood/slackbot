
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
