export function success(content) {
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

export function failure(error) {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Error:* ${error.message}`
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
