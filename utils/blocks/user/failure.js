export default (error) => {
  const content = `*Error:* ${error.message}`

  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": content
      },
      "accessory": {
        "type": "image",
        "image_url": "https://bit.ly/3dntFhi",
        "alt_text": "Wrong Symbol"
      }
    },
    {
      "type": "divider"
    }
  ];
};
