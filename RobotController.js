const Robot = require('./Robot');
const directions = require('./directions');

module.exports = class RobotController{
    constructor(){
        this.TOP_BOUNDARY = 4;
        this.RIGHT_BOUNDARY = 4;
        this.LEFT_BOUNDARY = 0;
        this.BOTTOM_BOUNDARY = 0;
    }

    createRobot(xCoordinate, yCoordinate, facing){
        xCoordinate = parseInt(xCoordinate);
        yCoordinate = parseInt(yCoordinate);

        if(this.hasRobot()){
            return false;
        }

        if(this.#checkBoundaries(xCoordinate, yCoordinate) && directions.isReal(facing)){
            this.robot = new Robot(xCoordinate, yCoordinate, facing);
            return true;
        }
        return false;
    }
    
    hasRobot(){
        if(typeof this.robot !== 'undefined'){
            return true; 
        }
        return false;
    }

    updatePosition(xCoordinate, yCoordinate, facing){
        const newPosition = this.#checkBoundaries(xCoordinate, yCoordinate);
        if(!newPosition){
            return newPosition;
        }
        this.robot.xCoordinate = xCoordinate;
        this.robot.yCoordinate = yCoordinate;
        this.robot.facing = facing;
        return newPosition;
    }

    getReport(){
        return `${this.robot.xCoordinate},${this.robot.yCoordinate},${this.robot.facing}`;
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


