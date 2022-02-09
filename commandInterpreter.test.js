const chai = require("chai");
const expect = chai.expect;
const commandInterpreter = require("./commandInterpreter");
const robotCommander = require("./robotCommander");
const RobotController = require("./RobotController");

describe("command", () => {
    before(() => {
        const controller = new RobotController();
        commandInterpreter.setController(controller);
        robotCommander.setController(controller);
    });
    context("interpret", () => {
        it("should return false from nonsense", () => {
            expect(commandInterpreter.interpret("lajfdlkjfalkdsj")).to.equal(
                false
            );
        });
        it("should return false from badly formed commands before a robot is placed", () => {
            expect(commandInterpreter.interpret("place123")).to.equal(false);
            expect(commandInterpreter.interpret("leff")).to.equal(false);
            expect(commandInterpreter.interpret("rihgt")).to.equal(false);
            expect(commandInterpreter.interpret("")).to.equal(false);
            expect(commandInterpreter.interpret("place 1,1,blorth")).to.equal(
                false
            );
        });
        it("should return false from commands before robot placed", () => {
            expect(commandInterpreter.interpret("report")).to.equal(false);
            expect(commandInterpreter.interpret("left")).to.equal(false);
            expect(commandInterpreter.interpret("right")).to.equal(false);
        });
        it("should return true from a correctly formed place command", () => {
            expect(commandInterpreter.interpret("place 0,0,north")).to.equal(
                true
            );
        });
    });
});
