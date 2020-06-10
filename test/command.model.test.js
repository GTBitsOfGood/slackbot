import * as chai from "chai";
import { Role } from "../server/models/member";
import { Command, Request, Response } from "../server/models/command";

/**
 * Command, Request, & Response model tests
 */

const { expect } = chai;
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
          it("should be a role string (Array)", function () {
            try {
              new Command({ desc: "Lorem ipsum", roles: 2 });
            } catch (e) {
              err = e;
            }
            expect(err).to.be.instanceof(Error);
            expect(err).to.have.property("name", "TypeError");
            expect(err).to.have.property("message", "options.roles must be an Array of role strings or role string; see the Role enum");

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

      it("should run with no errors", function () {
        try {
          new Command({ desc: "Lorem ipsum", roles: Role.EXEC }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;

        try {
          new Command({ desc: "Lorem ipsum", roles: [Role.EXEC] }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;

        try {
          new Command({ desc: "Lorem ipsum", roles: [Role.EXEC, Role.LEADER] }, () => {});
        } catch (e) {
          err = e;
        }
        expect(err).to.be.undefined;
      });
    });
  });
});
