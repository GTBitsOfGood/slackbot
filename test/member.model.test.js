import * as chai from "chai";
import connection from "../server/connection";
import Member from "../server/models/member";
import Team from "../server/models/team";
import clearModels from "./util";

const { expect } = chai;
let member;
let err;

describe("the Member model", function () {
  before(async function () {
    await connection();
    await clearModels(Member, Team);
  });

  beforeEach(function () {
    err = undefined;
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
      console.log(err.message);
      expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error collection"));

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
      expect(err.message).to.be.a("string").and.satisfy((msg) => msg.startsWith("E11000 duplicate key error collection"));

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
