import { checkin } from "server/actions/user";
import { success, failure } from "utils/blocks";

// @route   POST api/checkin
// @desc    Weekly Check-In
// @access  Public
const handler = (req, res) => {
  const slackId = req.body.user_id;
  const password = req.body.text.trim();

  return checkin(slackId, password)
    .then(user => {
      const content = `Thanks for coming, *@${user.username}*! `
        + `You've received a bit for your attendance, putting `
        + `you at a total of *${user.totalBits + 1}* `
        + `${!user.totalBits ? "bit" : "bits"}. :bobeyebrow:`;

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
