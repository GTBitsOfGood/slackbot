import * as chai from "chai";
import { Role, Member } from "../server/models/member";
import { Team } from "../server/models/team";
import { connection, clearModels } from "./util";

const { expect } = chai;
let member;
let err;

/**
 * Role enum & Member model tests
 */

describe("Member + Role", function () {
  beforeEach(function () {
    err = undefined;
  });

  describe("Member", function () {
    before(async function () {
      await connection();
      await clearModels(Member, Team);
    });

    describe("the 'slackId' field", function () {
      it("should be required", async function () {
        member = Member({
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: slackId: Path `slackId` is required.");
      });

      it("should be a string", async function () {
        member = Member({
          slackId: {},
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: slackId: Cast to string failed for value \"{}\" at path \"slackId\"");
      });

      it("should be unique", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        await member.save();
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "MongoError");
        expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error"));

        await clearModels(Member);
      });
    });

    describe("the 'username' field", function () {
      it("should be required", async function () {
        member = Member({
          slackId: "abcdef",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: username: Path `username` is required.");
      });

      it("should be a string", async function () {
        member = Member({
          slackId: "abcdef",
          username: {},
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: username: Cast to string failed for value \"{}\" at path \"username\"");
      });

      it("should be unique", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        await member.save();
        member = Member({
          slackId: "fedcba",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "MongoError");
        expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error"));

        await clearModels(Member);
      });
    });

    describe("the 'firstName' field", function () {
      it("should be required", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: firstName: Path `firstName` is required.");
      });

      it("should be a string", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: {},
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: firstName: Cast to string failed for value \"{}\" at path \"firstName\"");
      });
    });

    describe("the 'lastName' field", function () {
      it("should be required", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: lastName: Path `lastName` is required.");
      });

      it("should be a string", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: {},
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: lastName: Cast to string failed for value \"{}\" at path \"lastName\"");
      });
    });

    describe("the 'role' field", function () {
      it("should have a default of 'member'", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        expect(member).to.have.property("role", "member");
      });

      it("should be a string", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          role: {},
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: role: Cast to string failed for value \"{}\" at path \"role\"");
      });

      it("should be a Role enum value", async function () {
        member = Member({
          slackId: "fedcba",
          username: "smithjohn",
          firstName: "John",
          lastName: "Smith",
          role: "leader",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;

        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          role: "abcdef",
          team: "578df3efb618f5141202a196"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: role: \"abcdef\" is not a value of the Role enum");
      });
    });

    describe("the 'team' field", function () {
      it("should be required", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith"
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: team: Path `team` is required.");
      });

      it("should be an ObjectId", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: {}
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: team: Cast to ObjectId failed for value \"{}\" at path \"team\"");
      });

      it("should refer to the Team model", async function () {
        let team = Team({ name: "exec", type: "project" });

        team = await team.save();

        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: team._id
        });
        await member.save();
        member = await Member.findOne({ slackId: "abcdef" }).populate("team").exec();
        expect(team._id.toString()).to.eq(member.team._id.toString());
      });
    });

    describe("the 'bits' field", function () {
      it("should have a default of 0", function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196"
        });
        expect(member).to.have.property("bits", 0);
      });

      it("should be a number", async function () {
        member = Member({
          slackId: "abcdef",
          username: "johnsmith",
          firstName: "John",
          lastName: "Smith",
          team: "578df3efb618f5141202a196",
          bits: {}
        });
        try {
          await member.save();
        } catch (e) {
          err = e;
        }
        expect(err).to.be.instanceof(Error);
        expect(err).to.have.property("name", "ValidationError");
        expect(err).to.have.property("message", "Member validation failed: bits: Cast to Number failed for value \"{}\" at path \"bits\"");
      });
    });

    after(async function () {
      await clearModels(Member, Team);
    });
  });

  describe("Role", function () {
    it("should be an object", function () {
      expect(typeof Role).to.deep.eq("object");
    });

    it("should be frozen", function () {
      try {
        Role.newProp = "Hello";
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "TypeError");
      expect(err).to.have.property("message", "Cannot add property newProp, object is not extensible");
    });

    it("should have key-value pairs for enum values", function () {
      expect(Role).to.have.property("EXEC", "exec");
      expect(Role).to.have.property("LEADER", "leader");
      expect(Role).to.have.property("MEMBER", "member");
    });

    describe("the isType property", function () {
      it("should be a function", function () {
        expect(typeof Role.isRole).to.deep.eq("function");
      });

      it("should return whether a string is a valid team type", function () {
        expect(Role.isRole(undefined)).to.be.false;
        expect(Role.isRole(Role.EXEC)).to.be.true;
        expect(Role.isRole(Role.LEADER)).to.be.true;
        expect(Role.isRole(Role.MEMBER)).to.be.true;
      });
    });
  });
});
