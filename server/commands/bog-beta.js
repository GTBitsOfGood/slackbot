import { Command } from "../models/command";
import { Role } from "../models/member";

export default new Command({
  desc: "Abcdef",
  roles: Role.EXEC
}, (req, res) => {
  res.nextRes.status(200).send("Hello, World!");
});
