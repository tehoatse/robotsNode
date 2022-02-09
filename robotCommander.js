const directions = require("./directions");

let controller;

function setController(newController) {
    controller = newController;
}

function addRobot(potentialCommand) {
    return controller.createRobot(
        potentialCommand[1],
        potentialCommand[2],
        potentialCommand[3]
    );
}

function setActiveRobot(potentialCommand) {
    let robotNumber = parseInt(potentialCommand[1]);
    if (
        typeof robotNumber !== "number" ||
        robotNumber > controller.robots.length ||
        robotNumber < 0
    ) {
        return false;
    }
    controller.setActiveRobot(controller.robots[robotNumber - 1]);
    return true;
}

function moveRobot() {
    let robot = controller.activeRobot;
    let moveDirection = robot.facing;
    let newXCoordinate = robot.xCoordinate;
    let newYCoordinate = robot.yCoordinate;

    if (moveDirection === directions.NORTH) {
        newYCoordinate++;
    }
    if (moveDirection === directions.EAST) {
        newXCoordinate++;
    }
    if (moveDirection === directions.SOUTH) {
        newYCoordinate--;
    }
    if (moveDirection === directions.WEST) {
        newXCoordinate--;
    }
    return controller.updatePosition(newXCoordinate, newYCoordinate);
}

function turnLeft() {
    let robot = controller.activeRobot;
    return controller.updatePosition(
        robot.xCoordinate,
        robot.yCoordinate,
        directions.left(robot.facing)
    );
}

function turnRight() {
    let robot = controller.activeRobot;
    return controller.updatePosition(
        robot.xCoordinate,
        robot.yCoordinate,
        directions.right(robot.facing)
    );
}

function logReport() {
    console.log(controller.getReport());
    return true;
}

module.exports = {
    setController,
    addRobot,
    setActiveRobot,
    moveRobot,
    turnLeft,
    turnRight,
    logReport,
};
