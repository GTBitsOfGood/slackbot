import * as chai from "chai";
import Event from "../server/models/event";
import Member from "../server/models/member";
import { connection, clearModels } from "./util";

/**
 * Event model tests
 */

const { expect } = chai;
let event;
let err;

describe("the Event model", function () {
  before(async function () {
    await connection();
    await clearModels(Member, Event);
  });

  beforeEach(function () {
    err = undefined;
  });

  describe("the 'name' field", function () {
    it("should be required", async function () {
      event = Event({ code: "orange" });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: name: Path `name` is required.");
    });

    it("should be a string", async function () {
      event = Event({ code: "orange", name: {} });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: name: Cast to string failed for value \"{}\" at path \"name\"");
    });
  });

  describe("the 'code' field", function () {
    it("should be required", async function () {
      event = Event({ name: "orange" });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: code: Path `code` is required.");
    });

    it("should be a string", async function () {
      event = Event({ name: "orange", code: {} });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: code: Cast to string failed for value \"{}\" at path \"code\"");
    });
  });

  describe("the 'bits' field", function () {
    it("should have a default of 0", function () {
      event = Event({ name: "orange", code: "red" });
      expect(event).to.have.property("bits", 0);
    });

    it("should be a number", async function () {
      event = Event({ name: "orange", code: "red", bits: {} });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: bits: Cast to Number failed for value \"{}\" at path \"bits\"");
    });
  });

  describe("the 'participants' field", function () {
    it("should have a default of []", async function () {
      event = Event({ name: "orange", code: "red" });
      expect(event).to.have.property("participants");
      expect(Array.isArray(event.participants)).to.be.true;
      expect(event.participants).to.have.lengthOf(0);
    });

    it("should be an ObjectId Array", async function () {
      event = Event({ name: "orange", code: "red", participants: {} });
      try {
        await event.save();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property("name", "ValidationError");
      expect(err).to.have.property("message", "Event validation failed: participants: Cast to [ObjectId] failed for value \"[{}]\" at path \"participants\"");
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

      event = Event({
        name: "orange",
        code: "red",
        participants: [member._id]
      });
      await event.save();
      event = await Event.findOne({ name: "orange" }).populate("participants").exec();
      expect(member._id.toString()).to.eq(event.participants[0]._id.toString());
    });
  });

  after(async function () {
    await clearModels(Member, Event);
  });
});
