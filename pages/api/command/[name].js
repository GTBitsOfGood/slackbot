import connection from "../../../server/connection";
import Member from "../../../server/models/member";
import { Request, Response } from "../../../server/models/command";

// @route   POST api/command/[name]
// @desc    Call a command
// @access  Public
export default async (req, res) => {
  // TODO properly get slackId & other params
  // from the Next.js req object
  const {
    query: { name, slackId }
  } = req;
  let member;
  let command;

  try {
    command = await import(name);
  } catch (e) {
    // TODO send back a message saying
    // the command was not found
  }
  await connection();
  try {
    member = await Member.findOne({ slackId });
  } catch (_) {
    // do nothing
  }
  await command.handler(
    // TODO add the other options to the Request
    new Request({ member }),
    new Response(res)
  );
};
