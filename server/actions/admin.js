import Connection from "server/connection";
import User from "server/models/user";
import Info from "server/models/info";
import errors from "utils/errors";
import words from "random-words";

export async function startMeeting(slackId) {
  await Connection();

  const { admins, checkinActive } = await Info.findOne();
  const checkinPassword = words({ exactly: 3, join: "-" });

  if (!admins.includes(slackId))
    throw new Error(errors.admin.ADMINS_ONLY);
  if (checkinActive)
    throw new Error(errors.admin.HASNT_ENDED);

  await User.updateMany({}, { $set: { checkedIn: false }});
  await Info.updateOne({}, { $set: { checkinPassword, checkinActive: true }});
  return checkinPassword;
};

export async function endMeeting(slackId) {
  await Connection();

  const { admins, checkinActive } = await Info.findOne();

  if (!admins.includes(slackId))
    throw new Error(errors.admin.ADMINS_ONLY);
  if (!checkinActive)
    throw new Error(errors.admin.HASNT_STARTED);

  await Info.updateOne({}, {$set: { checkinActive: false }});
  return User.countDocuments({ checkedIn: true }, (err, val) => { return val });
}
