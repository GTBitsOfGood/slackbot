import Connection from "server/connection";
import User from "server/models/user";
import Info from "server/models/info";
import errors from "utils/errors";
import bcrypt from "bcryptjs";

export async function register(slackId, username) {
  await Connection();

  if (await User.findOne({ slackId }))
    throw new Error(errors.user.ALREADY_EXISTS);
  return User.create({ slackId, username });
};

export async function checkin(slackId, password) {
  await Connection();

  const { checkinPassword, checkinActive } = await Info.findOne();
  const match = await bcrypt.compare(password, checkinPassword);
  const user = await User.findOne({ slackId });

  if (!user)
    throw new Error(errors.user.DOESNT_EXIST);
  else if (!checkinActive)
    throw new Error(errors.user.NOT_ACTIVE);
  else if (user.checkedIn)
    throw new Error(errors.user.ALREADY_CHECKED);
  else if (!match)
    throw new Error(errors.user.WRONG_PASSWORD);

  await User.updateOne(
    { slackId }, {
    $set: { checkedIn: true },
    $inc: { totalBits: 1 }
  });

  return user;
};
