const directions = require('./directions');

let controller;

module.exports.setController = function(newController){
    controller = newController;
}

module.exports.addRobot = function(potentialCommand){
    return controller.createRobot(
        potentialCommand[1],
        potentialCommand[2],
        potentialCommand[3]
    );
}

module.exports.setActiveRobot = function(potentialCommand){
    let robotNumber = parseInt(potentialCommand[1]);
    if(typeof robotNumber !== 'number' || robotNumber > controller.robots.length || robotNumber < 0){
        return false;
    }
    controller.setActiveRobot(controller.robots[robotNumber-1]);
    return true;
}

module.exports.moveRobot = function(){
    let robot = controller.activeRobot;
    let moveDirection = robot.facing;
    let newXCoordinate = robot.xCoordinate;
    let newYCoordinate = robot.yCoordinate;

    if(moveDirection === directions.NORTH){
        newYCoordinate++;
    }
    if(moveDirection === directions.EAST){
        newXCoordinate++;
    }
    if(moveDirection === directions.SOUTH){
        newYCoordinate--;
    }
    if(moveDirection === directions.WEST){
        newXCoordinate--;
    }
    return controller.updatePosition(
        newXCoordinate, 
        newYCoordinate, 
    );
}

module.exports.turnLeft = function(){
    let robot = controller.activeRobot;
    return controller.updatePosition(
        robot.xCoordinate, 
        robot.yCoordinate, 
        directions.left(robot.facing)
    );
}

module.exports.turnRight = function(){
    let robot = controller.activeRobot;
    return controller.updatePosition(
        robot.xCoordinate, 
        robot.yCoordinate, 
        directions.right(robot.facing)
    );
}

module.exports.logReport = function(){
    console.log(controller.getReport());
    return true;
}