const NORTH = 'NORTH';
const EAST = 'EAST';
const SOUTH = 'SOUTH';
const WEST = 'WEST';

const directionArray = [
    NORTH,
    EAST,
    SOUTH,
    WEST
]

module.exports.NORTH = NORTH;
module.exports.EAST = EAST;
module.exports.SOUTH = SOUTH;
module.exports.WEST = WEST;

module.exports.left = function(currentDirection){
    return updateDirection(currentDirection, -1);
}

module.exports.right = function(currentDirection){
    return updateDirection(currentDirection, 1);
}

module.exports.isReal = function(potentialDirection){
    return directionArray.includes(potentialDirection);
}

function updateDirection(currentDirection, increment){
    let newIndex = directionArray.indexOf(currentDirection) + increment;

    if(newIndex >= directionArray.length){
        newIndex = 0;
    }

    if(newIndex < 0){
        newIndex = directionArray.length - 1;
    }
    
    return directionArray[newIndex];
}

