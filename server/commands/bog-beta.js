import { Command } from "../models/command";
// import { Role } from "../models/member";

export default new Command({
  desc: "Abcdef",
  roles: false
}, (req, res) => {
  res.nextRes.status(200).send(`Hello, World! ${req.args.length}`);
});
