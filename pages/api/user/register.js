import { register } from "server/actions/user";
import failure from "utils/blocks/user/failure";
import success from "utils/blocks/user/register";

// @route   POST api/register
// @desc    User Registration
// @access  Public
const handler = (req, res) => {
  const slackId = req.body.user_id;
  const username = req.body.user_name;

  return register(slackId, username)
    .then(user => {
      res.status(200).json({
        success: true,
        payload: user,
        blocks: success(user)
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
