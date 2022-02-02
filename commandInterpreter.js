const command = require('./robotCommander');

let controller;

module.exports.setController = function(newController){
    controller = newController;
}

module.exports.interpret = function(potentialCommand){
    potentialCommand = potentialCommand.toUpperCase();
    potentialCommand = potentialCommand.split(/[^A-Z0-9]/g);
    
    if(potentialCommand[0] === 'PLACE'){
        return command.addRobot(potentialCommand);
    }

    if(!controller.hasRobot()){
        return false;
    }

    if(potentialCommand[0] === 'ROBOT'){
        return command.setActiveRobot(potentialCommand);
    }

    if(potentialCommand[0] === 'REPORT'){
        return command.logReport();
    }

    if(potentialCommand[0] === 'MOVE'){
        return command.moveRobot();
    }

    if(potentialCommand[0] === 'LEFT'){
        return command.turnLeft();
    }

    if(potentialCommand[0] === 'RIGHT'){
        return command.turnRight();
    }
    return false; 
}