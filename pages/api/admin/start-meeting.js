import { startMeeting } from "server/actions/admin";
import { success, failure } from "utils/blocks";

// @route   POST api/admin/start-meeting
// @desc    Starts Weekly Meeting
// @access  Public
const handler = (req, res) => {
  const slackId = req.body.user_id;

  return startMeeting(slackId)
    .then(code => {
      const content = `Today's meeting has been successfully `
        + `created. The verification code is *${code}*. :eyes:`;

      res.status(200).json({
        success: true,
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
