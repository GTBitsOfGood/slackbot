import Connection from "server/connection";
import User from "server/models/user";
import errors from "utils/errors";

export async function register(slackId, username) {
  await Connection();

  if (await User.findOne({ slackId }))
    throw new Error(errors.user.ALREADY_EXISTS);
  return User.create({ slackId, username });
};

export async function checkin(slackId, password) {
  await Connection();

  const user = await User.findOne({ slackId });
  const info = await User.findOne({ slackId: "INFO" });  // fixme (!)
  const match = (password === info.username);            // fixme (!)

  if (user) {
    if (match && !user.checkedIn) {
      await User.updateOne(
        { slackId }, {
        $inc: { totalBits: 1 },
        $set: { checkedIn: true }
      });
      return user;
    }
    throw new Error(user.checkedIn
      ? errors.user.ALREADY_CHECKED
      : errors.user.WRONG_PASSWORD);
  }
  throw new Error(errors.user.DOESNT_EXIST);
};
