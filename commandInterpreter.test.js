const chai = require("chai");
const expect = chai.expect;
const commandInterpreter = require("./commandInterpreter");
const robotCommander = require("./robotCommander");
const RobotController = require("./RobotController");

describe("commandInterpreter", () => {
    beforeEach(() => {
        this.controller = new RobotController();
        commandInterpreter.setController(this.controller);
        robotCommander.setController(this.controller);
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
        it("should return false from out of bounds place commands", () => {
            expect(
                commandInterpreter.interpret(
                    `place ${this.controller.BOTTOM_BOUNDARY - 1},0,north`
                )
            ).to.equal(false);
            expect(
                commandInterpreter.interpret(
                    `place 0,${this.controller.LEFT_BOUNDARY - 1},north`
                )
            ).to.equal(false);
            expect(
                commandInterpreter.interpret(
                    `place ${this.controller.TOP_BOUNDARY + 1},0,north`
                )
            ).to.equal(false);
            expect(
                commandInterpreter.interpret(
                    `place 0,${this.controller.RIGHT_BOUNDARY + 1},north`
                )
            ).to.equal(false);
        });
        it("should turn a robot left", () => {
            commandInterpreter.interpret("place 0,0,north");
            expect(commandInterpreter.interpret("left")).to.equal(true);
            expect(this.controller.activeRobot.facing).to.equal("WEST");
            commandInterpreter.interpret("left");
            expect(this.controller.activeRobot.facing).to.equal("SOUTH");
            commandInterpreter.interpret("left");
            expect(this.controller.activeRobot.facing).to.equal("EAST");
            commandInterpreter.interpret("left");
            expect(this.controller.activeRobot.facing).to.equal("NORTH");
        });
        it("should turn a robot right", () => {
            commandInterpreter.interpret("place 0,0,north");
            expect(commandInterpreter.interpret("right")).to.equal(true);
            expect(this.controller.activeRobot.facing).to.equal("EAST");
            commandInterpreter.interpret("right");
            expect(this.controller.activeRobot.facing).to.equal("SOUTH");
            commandInterpreter.interpret("right");
            expect(this.controller.activeRobot.facing).to.equal("WEST");
            commandInterpreter.interpret("right");
            expect(this.controller.activeRobot.facing).to.equal("NORTH");
        });
        it("should report"),
            () => {
                commandInterpreter.interpret("place 0,0,north");
                expect(commandInterpreter.interpret("report")).to.equal(true);
            };
    });
});
