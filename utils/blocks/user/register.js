export default (user) => {
  const content =
    `Hello and welcome, *@${user.username}*! `
    + "To see a list of valid commands, simply "
    + "click on my icon. :blobhappy:"

  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": content
      },
      "accessory": {
        "type": "image",
        "image_url": "https://bit.ly/3chk9L8",
        "alt_text": "Right Symbol"
      }
    },
    {
      "type": "divider"
    }
  ];
};
