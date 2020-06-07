import * as chai from "chai";
import connection from "../server/connection";
import Team from "../server/models/team";
import Member from "../server/models/member";
import clearModels from "./util";

const { expect } = chai;
let team;
let err;

describe("the Team model", function () {
  before(async function () {
    await connection();
    await clearModels(Team, Member);
  });

  beforeEach(function () {
    err = undefined;
  });

  describe("the 'name' field", function () {
    it("should be required", async function () {
      team = Team({ type: "project" });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: name: Path `name` is required.");
    });

    it("should be a string", async function () {
      team = Team({ name: {}, type: "project" });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: name: Cast to string failed for value \"{}\" at path \"name\"");
    });

    it("should be unique", async function () {
      team = Team({ name: "exec", type: "project" });
      await team.save();
      team = Team({ name: "exec", type: "project" });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "MongoError");
      expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error collection: bog-bot.teams index: name_1 dup key: { name: \"exec\" }"));

      await clearModels(Team);
    });
  });

  describe("the 'type' field", function () {
    it("should be required", async function () {
      team = Team({ name: "exec" });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: type: Path `type` is required.");
    });

    it("should be a string", async function () {
      team = Team({ name: "exec", type: {} });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: type: Cast to string failed for value \"{}\" at path \"type\"");
    });

    it("should be a TeamType enum value", async function () {
      team = Team({ name: "exec", type: "abcdef" });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: type: \"abcdef\" is not a value of the TeamType enum");
    });
  });

  describe("the 'members' field", function () {
    it("should have a default of []", async function () {
      team = Team({ name: "exec", type: "project" });
      expect(team).to.have.property("members");
      expect(Array.isArray(team.members)).to.be.true;
      expect(team.members).to.have.lengthOf(0);
    });

    it("should be an ObjectId Array", async function () {
      team = Team({ name: "exec", type: "project", members: {} });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: members: Cast to [ObjectId] failed for value \"[{}]\" at path \"members\"");
    });

    it("should refer to the Member model", async function () {
      let member = Member({
        slackId: "abcdef",
        username: "johnsmith",
        firstName: "John",
        lastName: "Smith",
        team: "578df3efb618f5141202a196"
      });

      member = await member.save();

      team = Team({
        name: "exec",
        type: "project",
        members: [member._id]
      });
      await team.save();
      team = await Team.findOne({ name: "exec" }).populate("members").exec();
      expect(member._id.toString()).to.eq(team.members[0]._id.toString());
    });
  });

  describe("the 'bytes' field", function () {
    it("should have a default of 0", function () {
      team = Team({ name: "exec", type: "project" });
      expect(team).to.have.property("bytes", 0);
    });

    it("should be a number", async function () {
      team = Team({ name: "exec", type: "project", bytes: {} });
      try {
        await team.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Team validation failed: bytes: Cast to Number failed for value \"{}\" at path \"bytes\"");
    });
  });

  after(async function () {
    await clearModels(Member, Team);
  });
});
