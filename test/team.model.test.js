import * as chai from "chai";
import { TeamType, Team } from "../server/models/team";
import { Member } from "../server/models/member";
import { connection, clearModels } from "./util";

const { expect } = chai;
let team;
let err;

/**
 * TeamType enum & Team model tests
 */

describe("Team + TeamType", function () {
  beforeEach(function () {
    err = undefined;
  });

  describe("Team", function () {
    before(async function () {
      await connection();
      await clearModels(Team, Member);
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
        expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error"));

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
        team = Team({ name: "NPP", type: "project" });
        try {
          await team.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;

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

  describe("TeamType", function () {
    it("should be an object", function () {
      expect(typeof TeamType).to.deep.eq("object");
    });

    it("should be frozen", function () {
      try {
        TeamType.newProp = "Hello";
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "TypeError");
      expect(err).to.have.property("message", "Cannot add property newProp, object is not extensible");
    });

    it("should have key-value pairs for enum values", function () {
      expect(TeamType).to.have.property("EXEC", "exec");
      expect(TeamType).to.have.property("PROJECT", "project");
      expect(TeamType).to.have.property("COMMITTEE", "committee");
    });

    describe("the isType property", function () {
      it("should be a function", function () {
        expect(typeof TeamType.isType).to.deep.eq("function");
      });

      it("should return whether a string is a valid team type", function () {
        expect(TeamType.isType(undefined)).to.be.false;
        expect(TeamType.isType(TeamType.EXEC)).to.be.true;
        expect(TeamType.isType(TeamType.PROJECT)).to.be.true;
        expect(TeamType.isType(TeamType.EXEC)).to.be.true;
      });
    });
  });
});
