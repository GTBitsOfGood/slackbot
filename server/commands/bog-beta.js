import { Command } from "../models/command";
// import { Role } from "../models/member";

const options = {
  desc: "A dummy command",
  roles: false
};

export default new Command(
  options,
  async (req, res) => {
    try {
      await res.reply({
        text: "Hello, World!"
      });
    } catch (e) {
      console.log(e);
    }
  }
);
