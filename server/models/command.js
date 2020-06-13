import { Role } from "./member";

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
 * @param {String} options.desc The description of the command.
 * @param {Role|Role[]} [options.roles] The role(s) that can use this command;
 *  see {@link Role}; leave unset to handle role permissions yourself
 *  must include at least one role.
 * @param {handler} handler The handler function that gets executed.
 *  when the command is called.
 *
 * @throws {Error}
 * @throws {TypeError}
 */
function Command(options, handler) {
  if (typeof options !== "object") throw new TypeError("the options argument must be an object");
  if (typeof options.desc !== "string" || !options.desc.length) throw new TypeError("commands must have a description");
  this.desc = options.desc;
  if (Role.isRole(options.roles)) {
    this.roles = [options.roles];
  } else if (Array.isArray(options.roles)) {
    if (options.roles.length === 0) {
      throw new TypeError("the options.roles Array must have at least 1 element");
    }
    options.roles.forEach((role, i) => {
      if (!Role.isRole(role)) throw new TypeError(`element ${i} of the options.roles Array is not a role string; see the Role enum`);
    });
    this.roles = options.roles;
  }
  if (typeof handler !== "function") throw new TypeError("the handler argument must be a function");
  this.handler = handler;
}

/**
 * @class
 * @classdesc A command request.
 * @param {Object} options The options object.
 * @param {Object} [options.member] The member who called the command; see the Member model.
 * @param {string} [options.args] The arguments string after the command.
 *
 * @throws {TypeError}
 */
function Request(options) {
  if (typeof options !== "object") throw new TypeError("the options argument must be an object");
  this.member = options.member;
  this.args = options.args;
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
  Command, Request, Response
};
