const Robot = require('./Robot');
const directions = require('./directions');

module.exports = class RobotController{
    constructor(){
        this.TOP_BOUNDARY = 4;
        this.RIGHT_BOUNDARY = 4;
        this.LEFT_BOUNDARY = 0;
        this.BOTTOM_BOUNDARY = 0;
        this.robots = [];
        this.activeRobot = null;
    }

    createRobot(xCoordinate, yCoordinate, facing){
        xCoordinate = parseInt(xCoordinate);
        yCoordinate = parseInt(yCoordinate);

        if(this.#checkBoundaries(xCoordinate, yCoordinate) && directions.isReal(facing)){
            let newRobot = new Robot(xCoordinate, yCoordinate, facing);
            this.robots.push(newRobot);
            this.activeRobot = newRobot;
            return true;
        }        
        return false;
    }
    
    hasRobot(){
        if(this.robots.length > 0){
            return true; 
        }
        return false;
    }

    updatePosition(xCoordinate, yCoordinate, facing){
        const positionIsWithinBoundaries = this.#checkBoundaries(xCoordinate, yCoordinate);
        if(!positionIsWithinBoundaries){
            return positionIsWithinBoundaries;
        }
        if(typeof facing !== 'undefined'){
            this.activeRobot.facing = facing;
        }

        this.activeRobot.xCoordinate = xCoordinate;
        this.activeRobot.yCoordinate = yCoordinate;
        return positionIsWithinBoundaries;
    }

    getReport(){
        let report = '';
        this.robots.forEach(robot => {
            const robotNumber = this.robots.indexOf(robot) + 1;
            report = report + 'robot ' + robotNumber + ' - ';
            report = report + `${robot.xCoordinate},${robot.yCoordinate},${robot.facing}`
            if(robot === this.activeRobot){
                report = report + ' -- active robot';
            }
            if(this.robots.indexOf(robot) !== this.robots.length-1){
                report = report + '\n';
            }
        });
        return report;
    }

    setActiveRobot(robot){
        this.activeRobot = robot; 
    }

    #checkBoundaries(xCoordinate, yCoordinate){
        let placementWithinBounds = true;    
        if(xCoordinate < this.LEFT_BOUNDARY){
            placementWithinBounds = false;
        }
        if(yCoordinate < this.BOTTOM_BOUNDARY){
            placementWithinBounds = false;
        }
        if(xCoordinate > this.RIGHT_BOUNDARY){
            placementWithinBounds = false;
        }
        if(yCoordinate > this.TOP_BOUNDARY){
            placementWithinBounds = false;
        }
        return placementWithinBounds;
    }
}


