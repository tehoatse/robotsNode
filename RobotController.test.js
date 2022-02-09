const chai = require("chai");
const expect = chai.expect;
const RobotController = require("./RobotController");
const directions = require("./directions");

describe("testing RobotController", () => {
    context("testing createRobot", () => {
        it("should create a basic robot", () => {
            const controller = new RobotController();
            expect(controller.createRobot(0, 0, "NORTH")).to.equal(true);
            expect(controller.activeRobot.facing).to.equal(directions.NORTH);
            expect(controller.activeRobot.xCoordinate).to.equal(0);
            expect(controller.activeRobot.yCoordinate).to.equal(0);
        });
        it("should reject a robot out of bounds to the left", () => {
            const controller = new RobotController();
            expect(
                controller.createRobot(controller.LEFT_BOUNDARY - 1, 0, "NORTH")
            ).to.equal(false);
        });
        it("should reject a robot out of bounds to the right", () => {
            const controller = new RobotController();
            expect(
                controller.createRobot(
                    controller.RIGHT_BOUNDARY + 1,
                    0,
                    "NORTH"
                )
            ).to.equal(false);
        });
        it("should reject a robot out of bounds to the bottom", () => {
            const controller = new RobotController();
            expect(
                controller.createRobot(
                    0,
                    controller.BOTTOM_BOUNDARY - 1,
                    "NORTH"
                )
            ).to.equal(false);
        });
        it("should reject robot creation out of bounds to the top", () => {
            const controller = new RobotController();
            expect(
                controller.createRobot(0, controller.TOP_BOUNDARY + 1, "NORTH")
            ).to.equal(false);
        });
        it("should reject non-direction strings", () => {
            const controller = new RobotController();
            expect(controller.createRobot(0, 0, "toothpaste")).to.equal(false);
        });
    });
});
