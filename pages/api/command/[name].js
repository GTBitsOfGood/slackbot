import * as validateSlackRequest from "validate-slack-request";
import { debug as _debug } from "debug";
import config from "../../../utils/config";
import connection from "../../../server/connection";
import Member from "../../../server/models/member";
import { Request, Response } from "../../../server/models/command";

const debug = _debug("command");

// @route   POST api/command/[name]
// @desc    Call a command
// @access  Public
export default async (req, res) => {
  if (!req.body) {
    res.status(400).send("Bad Request");
    return;
  }

  const { command: name, text: args, user_id: slackId } = req.body;
  let command;

  // validate that the HTTP request was sent by Slack
  try {
    req.get = (str) => req.headers[str.toLowerCase()];
    if (!validateSlackRequest(config.slackSigningSecret, req)) {
      res.status(401).send("Unauthorized");
      return;
    }
  } catch (e) {
    debug(`Slack validation error: ${e}`);
    res.status(500).send("Internal Server Error");
    return;
  }

  // import the Command object for this command
  try {
    command = (await import(`./../../../server/commands/${name.slice(1)}`)).default;
  } catch (e) {
    debug(`command resolution error: ${e}`);
    res.status(404).send("Not Found");
    return;
  }


  // connect to the MongoDB database
  try {
    await connection();
  } catch (e) {
    debug(`MongoDB connection error: ${e}`);
    res.status(500).send("Internal Server Error");
    return;
  }

  // find the Member that has the Slack ID of the user who sent the command
  const member = await Member.findOne({ slackId }).catch();

  // run the handler for this command
  await command.handler(
    new Request({ member, args }),
    new Response(res)
  );
};