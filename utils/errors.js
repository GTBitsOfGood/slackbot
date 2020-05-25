export default {
  user: {
    ALREADY_CHECKED: "It seems you've already checked in this week. You're not trying to get _extra_ bits, are you?",
    WRONG_PASSWORD: "Hmmm, that doesn't look quite right. Are you sure you provided the correct verification code?",
    NOT_ACTIVE: "The check-in period is closed for the time being. It'll open back up during the weekly meeting!",
    DOESNT_EXIST: "Huh, I can't seem to find you in our database. Try running */register* before proceeding.",
    ALREADY_EXISTS: "It would appear you're already registered in our database. You should be good to go!"
  },
  admin: {
    ADMINS_ONLY: "Hold it right there, pal. You don't have the privileges required to run this command.",
    HASNT_ENDED: "It looks like you haven't ended your previous meeting. To fix this, try running */end-meeting* first.",
    HASNT_STARTED: "It would appear there exists no meeting to end. To fix this, try creating one with */start-meeting*."
  }
};
