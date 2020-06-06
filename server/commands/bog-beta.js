import { Command } from "../models/command";
import Role from "../models/role";

export default new Command({
  name: "bog-beta",
  desc: "Abcdef",
  permissionLevel: Role.MEMBER
}, (req, res) => {
  console.log(req.args);
  res.nextRes.status(200).send("Hello, World!");
});
