const directions = require('./directions');

let controller;

module.exports.registerController = function(newController){
    controller = newController;
}

module.exports.interpret = function(potentialCommand){

    potentialCommand = potentialCommand.toUpperCase();
    potentialCommand = potentialCommand.split(/[^A-Z0-9]/g);
    
    if(potentialCommand[0] === 'PLACE'){
        return addRobot(potentialCommand);
    }

    if(!controller.hasRobot()){
        return false;
    }

    if(potentialCommand[0] === 'REPORT'){
        return logReport();
    }

    if(potentialCommand[0] === 'MOVE'){
        return moveRobot();
    }

    if(potentialCommand[0] === 'LEFT'){
        return turnLeft();
    }

    if(potentialCommand[0] === 'RIGHT'){
        return turnRight();
    }
    return false;
}

function addRobot(potentialCommand){
    return controller.createRobot(
        potentialCommand[1],
        potentialCommand[2],
        potentialCommand[3]
    );
}

function moveRobot(){
    let robot = controller.robot;
    let newFacing = robot.facing;
    let newXCoordinate = robot.xCoordinate;
    let newYCoordinate = robot.yCoordinate;

    if(newFacing === directions.NORTH){
        newYCoordinate++;
    }
    if(newFacing === directions.EAST){
        newXCoordinate++;
    }
    if(newFacing === directions.SOUTH){
        newYCoordinate--;
    }
    if(newFacing === directions.WEST){
        newXCoordinate--;
    }
    return controller.updatePosition(
        newXCoordinate, 
        newYCoordinate, 
        newFacing
    );
}

function turnLeft(){
    let robot = controller.robot;
    return controller.updatePosition(
        robot.xCoordinate, 
        robot.yCoordinate, 
        directions.left(robot.facing)
    );
}

function turnRight(){
    let robot = controller.robot;
    return controller.updatePosition(
        robot.xCoordinate, 
        robot.yCoordinate, 
        directions.right(robot.facing)
    );
}

function logReport(){
    console.log(controller.getReport());
    return true;
}