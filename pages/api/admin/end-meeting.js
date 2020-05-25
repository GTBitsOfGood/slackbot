import { endMeeting } from "server/actions/admin";
import { success, failure } from "utils/blocks";

// @route   POST api/admin/end-meeting
// @desc    Ends Weekly Meeting
// @access  Public
const handler = (req, res) => {
  const slackId = req.body.user_id;

  return endMeeting(slackId)
    .then(count => {
      const content = `Today's meeting has been successfully `
        + `concluded. In total, there ${count ? "was" : "were"} `
        + `*${count}* attendant${count ? "" : "s"}! :fire:`;

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
