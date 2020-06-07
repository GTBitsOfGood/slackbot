import * as chai from "chai";
import { TeamType } from "../server/models/team";

const { expect } = chai;

/**
 * TeamType model tests
 */

describe("the TeamType model", function () {
  it("should be an object", function () {
    expect(typeof TeamType).to.deep.eq("object");
  });

  it("should be frozen", function () {
    let err;
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
