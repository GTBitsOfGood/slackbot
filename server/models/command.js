import Role from "./role";

/**
 * @class
 * @classdesc A command argument.
 * @param {string} name The name of the command argument.
 * @param {boolean} [isOptional=false] Whether the command argument is optional; defaults to false.
 *
 * @throws {TypeError}
 */
function Argument(name, isOptional = false) {
  if (!name || typeof name !== "string") throw new TypeError("command arguments must have a name");
  this.name = name;
  this.isOptional = isOptional;
}

/**
 * The handler function for a command; see {@link Command}.
 * @callback handler
 * @param {Request} req The command request.
 * @param {Response} res The command response.
 */

/**
 * @class
 * @classdesc A bot command.
 * @param {Object} options The options object.
 * @param {string} options.name The name of the command.
 * @param {desc} options.desc The description of the command.
 * @param {Argument[]} [options.args=[]] The expected command arguments; defaults to [].
 * @param {number} [options.minArgs=0] The minimum number of arguments; defaults to 0.
 * @param {Role} options.permissionLevel The permission level of the command;
 *  see {@link Role} for possible values. The permission level of a command
 *  is hierarchial: for example, if the value is Role.MEMBER, then members with
 *  a role of either Role.LEADER or Role.EXEC would also have permission to
 *  call the command.
 * @param {handler} handler The handler function that gets executed
 *  when the command is called.
 *
 * @throws {Error}
 * @throws {TypeError}
 */
function Command(options, handler) {
  if (typeof options !== "undefined") throw new TypeError("the options argument must be an object");
  if (!options.name || typeof options.name !== "string") throw new TypeError("commands must have a name");
  this.name = options.name;
  if (!options.desc || typeof options.desc !== "string") throw new TypeError("commands must have a description");
  this.desc = options.desc;
  this.args = options.args || [];
  if (!Array.isArray(this.args)) throw new TypeError("options.args must be an Array");
  this.args.forEach((arg) => {
    if (!(arg instanceof Argument)) throw new TypeError("the options.args Array for a Command must only contain objects of type Argument.");
  });
  this.minArgs = options.minArgs || 0;
  if (typeof this.minArgs !== "number" || this.minArgs < 0 || !Number.isInteger(this.minArgs)) throw new TypeError("options.minArgs must be a positive integer");
  if (this.minArgs > this.args.length) throw new Error("the minimum number of arguments cannot exceed the length of the options.args Array");
  if (typeof options.permissionLevel !== "string" || !Role.isRole(options.permissionLevel)) throw new TypeError("options.permissionLevel must be a valid role string. See the Role enum.");
  this.permissionLevel = options.permissionLevel;
  if (typeof handler !== "function") throw new TypeError("the handler argument must be a function");
  this.handler = handler;
}

/**
 * @class
 * @classdesc A command request.
 * @param {Object} options The options object.
 * @param {Object} options.member The member who called the command; see the Member model.
 * @param {String[]} [options.args=[]] The command arguments passed in.
 *
 * @throws {TypeError}
 */
function Request(options) {
  if (typeof options !== "undefined") throw new TypeError("the options argument must be an object");
  this.member = options.member;
  this.args = options.args || [];
  if (!Array.isArray(this.args)) throw new TypeError("options.args must be an Array");
  this.args.forEach((arg) => {
    if (typeof arg !== "string") throw new TypeError("the options.args Array for a Request must only contain strings.");
  });
}

/**
 * @class
 * @classdesc A command response.
 *
 * @param {Object} res A Next.js request object
 */
function Response(res) {
  if (typeof res !== "object") throw new TypeError("the res argument must be an object");
  this.nextRes = res;
}

// TODO add Response helper functions

export {
  Argument, Command, Request, Response
};
