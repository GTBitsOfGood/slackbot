import { register } from "server/actions/user";
import { success, failure } from "utils/blocks";

// @route   POST api/user/register
// @desc    User Registration
// @access  Public
const handler = (req, res) => {
  const slackId = req.body.user_id;
  const username = req.body.user_name;

  return register(slackId, username)
    .then(user => {
      const content = `Hello and welcome, *@${user.username}*! `
        + `To see a list of valid commands, simply click on my `
        + `profile picture. :tada:`;

      res.status(200).json({
        success: true,
        payload: user,
        blocks: success(content)
      });
    })
    .catch(error => {
      res.status(200).json({
        success: false,
        blocks: failure(error)
      });
    });
};

export default handler;
