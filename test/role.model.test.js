import * as chai from "chai";
import Role from "../server/models/role";

const { expect } = chai;

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

  describe("the hasPermission property", function () {
    it("should be a function", function () {
      expect(typeof Role.hasPermission).to.deep.eq("function");
    });

    it("should throw an error when the arguments are not roles", function () {
      expect(Role.hasPermission).to.throw("the role must be one of the values of the Role enum");
      expect(Role.hasPermission.bind(Role, "abcdef")).to.throw("the role must be one of the values of the Role enum");
      expect(Role.hasPermission.bind(Role, Role.EXEC)).to.throw("the permissionLevel must be one of the values of the Role enum");
      expect(Role.hasPermission.bind(Role, Role.EXEC, "abcdef")).to.throw("the permissionLevel must be one of the values of the Role enum");
    });

    it("should return whether a member with the given role is at the given permission level", function () {
      expect(Role.hasPermission(Role.EXEC, Role.LEADER)).to.be.true;
      expect(Role.hasPermission(Role.MEMBER, Role.EXEC)).to.be.false;
      expect(Role.hasPermission(Role.LEADER, Role.LEADER)).to.be.true;
    });
  });
});
