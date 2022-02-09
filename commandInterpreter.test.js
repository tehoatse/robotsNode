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
        it("should report", () => {
            commandInterpreter.interpret("place 1,1,north");
            expect(commandInterpreter.interpret("REPORT")).to.equal(true);
        });
        it("should move correctly", () => {
            commandInterpreter.interpret("place 1,1,north");
            expect(commandInterpreter.interpret("move")).to.equal(true);
            expect(this.controller.activeRobot.xCoordinate).to.equal(1);
            expect(this.controller.activeRobot.yCoordinate).to.equal(2);
            expect(this.controller.activeRobot.facing).to.equal('NORTH');
        });
        it("should not cross bottom boundary with move command", () => {
            commandInterpreter.interpret(
                `place ${this.controller.LEFT_BOUNDARY},${this.controller.BOTTOM_BOUNDARY},south`
            );
            commandInterpreter.interpret("move");
            expect(this.controller.activeRobot.xCoordinate).to.equal(this.controller.LEFT_BOUNDARY);
            expect(this.controller.activeRobot.yCoordinate).to.equal(this.controller.BOTTOM_BOUNDARY);
            expect(this.controller.activeRobot.facing).to.equal('SOUTH');
        });
        it("should not cross left boundary with move command", () => {
            commandInterpreter.interpret(
                `place ${this.controller.LEFT_BOUNDARY},${this.controller.BOTTOM_BOUNDARY},west`
            );
            commandInterpreter.interpret("move");
            expect(this.controller.activeRobot.xCoordinate).to.equal(this.controller.LEFT_BOUNDARY);
            expect(this.controller.activeRobot.yCoordinate).to.equal(this.controller.BOTTOM_BOUNDARY);
            expect(this.controller.activeRobot.facing).to.equal('WEST');
        });
        it("should not cross top boundary with move command", () => {
            commandInterpreter.interpret(
               `place ${this.controller.RIGHT_BOUNDARY},${this.controller.TOP_BOUNDARY},north`
            );
            commandInterpreter.interpret("move");
            expect(this.controller.activeRobot.xCoordinate).to.equal(this.controller.RIGHT_BOUNDARY);
            expect(this.controller.activeRobot.yCoordinate).to.equal(this.controller.TOP_BOUNDARY);
            expect(this.controller.activeRobot.facing).to.equal("NORTH");
            
        });
        it("should not cross right boundary with move command", () => {
            commandInterpreter.interpret(
                `place ${this.controller.RIGHT_BOUNDARY},${this.controller.TOP_BOUNDARY},east`
            );
            commandInterpreter.interpret("move");
            expect(this.controller.activeRobot.xCoordinate).to.equal(this.controller.RIGHT_BOUNDARY);
            expect(this.controller.activeRobot.yCoordinate).to.equal(this.controller.TOP_BOUNDARY);
            expect(this.controller.activeRobot.facing).to.equal("EAST");
        });
    });
});
