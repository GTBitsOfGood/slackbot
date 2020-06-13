import * as chai from "chai";
import { Role } from "../server/models/member";
import { Command, Request, Response } from "../server/models/command";

/**
 * Command, Request, & Response model tests
 */

const { expect } = chai;
let obj;
let err;

describe("Command + Request + Response", function () {
  beforeEach(function () {
    err = undefined;
  });

  describe("Command", function () {
    describe("constructor", function () {
      describe("the options object", function () {
        it("should be required", function () {
          try {
            new Command();
          } catch (e) {
            err = e;
          }
          expect(err).to.be.instanceof(Error);
          expect(err).to.have.property("name", "TypeError");
          expect(err).to.have.property("message", "the options argument must be an object");
        });

        describe("the desc(ription) field", function () {
          it("should be a non-empty string", function () {
            try {
              new Command({});
            } catch (e) {
              err = e;
            }
            expect(err).to.be.instanceof(Error);
            expect(err).to.have.property("name", "TypeError");
            expect(err).to.have.property("message", "commands must have a description");

            try {
              new Command({ desc: "" });
            } catch (e) {
              err = e;
            }
            expect(err).to.be.instanceof(Error);
            expect(err).to.have.property("name", "TypeError");
            expect(err).to.have.property("message", "commands must have a description");
          });
        });

        describe("the roles field", function () {
          it("should contain role strings if it is an Array", function () {
            try {
              new Command({ desc: "Lorem ipsum" }, () => {});
            } catch (e) {
              err = e;
            }
            expect(err).to.be.undefined;

            try {
              new Command({ desc: "Lorem ipsum", roles: [] });
            } catch (e) {
              err = e;
            }

            expect(err).to.be.instanceof(Error);
            expect(err).to.have.property("name", "TypeError");
            expect(err).to.have.property("message", "the options.roles Array must have at least 1 element");

            try {
              new Command({ desc: "Lorem ipsum", roles: [Role.EXEC, "abcdef"] });
            } catch (e) {
              err = e;
            }
            expect(err).to.be.instanceof(Error);
            expect(err).to.have.property("name", "TypeError");
            expect(err).to.have.property("message", "element 1 of the options.roles Array is not a role string; see the Role enum");
          });
        });
      });

      describe("the handler parameter", function () {
        it("should be a function", function () {
          try {
            new Command({ desc: "Lorem ipsum", roles: [Role.EXEC] });
          } catch (e) {
            err = e;
          }
          expect(err).to.be.instanceof(Error);
          expect(err).to.have.property("name", "TypeError");
          expect(err).to.have.property("message", "the handler argument must be a function");
        });
      });

      it("should create a Command object", function () {
        try {
          obj = new Command({ desc: "Lorem ipsum" }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.desc).to.eql("Lorem ipsum");
        expect(obj.roles).to.be.true;
        expect(typeof obj.handler).to.eql("function");

        try {
          obj = new Command({ desc: "Lorem ipsum", roles: false }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.desc).to.eql("Lorem ipsum");
        expect(obj.roles).to.be.false;
        expect(typeof obj.handler).to.eql("function");

        try {
          obj = new Command({ desc: "Lorem ipsum", roles: Role.EXEC }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.desc).to.eql("Lorem ipsum");
        expect(obj.roles).to.have.members([Role.EXEC]);
        expect(typeof obj.handler).to.eql("function");

        try {
          obj = new Command({ desc: "Lorem ipsum", roles: [Role.EXEC] }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.desc).to.eql("Lorem ipsum");
        expect(obj.roles).to.have.members([Role.EXEC]);
        expect(typeof obj.handler).to.eql("function");

        try {
          obj = new Command({ desc: "Lorem ipsum", roles: [Role.EXEC, Role.LEADER] }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.desc).to.eql("Lorem ipsum");
        expect(obj.roles).to.have.members([Role.EXEC, Role.LEADER]);
        expect(typeof obj.handler).to.eql("function");
      });
    });
  });

  describe("Request", function () {
    describe("constructor", function () {
      describe("the options object", function () {
        it("should be required", function () {
          try {
            new Request();
          } catch (e) {
            err = e;
          }
          expect(err).to.be.instanceof(Error);
          expect(err).to.have.property("name", "TypeError");
          expect(err).to.have.property("message", "the options argument must be an object");
        });
      });

      it("should create a Request object", function () {
        try {
          obj = new Request({ member: {}, args: "abcdef" });
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.member).to.eql({});
        expect(obj.args).to.eql("abcdef");
      });
    });
  });

  describe("Response", function () {
    describe("constructor", function () {
      describe("the target parameter", function () {
        it("should be a string", function () {
          try {
            new Response();
          } catch (e) {
            err = e;
          }
          expect(err).to.be.instanceof(Error);
          expect(err).to.have.property("name", "TypeError");
          expect(err).to.have.property("message", "the target parameter must be a string");
        });
      });

      it("should create a Response object", function () {
        try {
          obj = new Response("abc");
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
        expect(obj.target).to.eql("abc");
      });
    });
  });
});
