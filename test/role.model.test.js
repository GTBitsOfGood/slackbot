import * as chai from "chai";
import Role from "../server/models/role";

const { expect } = chai;

/**
 * Role model tests
 */

describe("the Role model", function () {
  it("should be an object", function () {
    expect(typeof Role).to.deep.eq("object");
  });

  it("should be frozen", function () {
    let err;
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
