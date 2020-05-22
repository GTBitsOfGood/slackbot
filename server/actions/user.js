import Connection from "server/connection";
import User from "server/models/user";
import errors from "utils/errors";

export async function register(slackId, username) {
  await Connection();

  return User.findOne({ slackId })
    .then(user => {
      if (user) {
        const err = errors.user.ALREADY_EXISTS;
        return Promise.reject(new Error(err));
      } else {
        Promise.resolve(user);
        return User.create({ slackId, username });
      }
    })
};
