const directionArray = ["NORTH", "EAST", "SOUTH", "WEST"];

module.exports.NORTH = directionArray[0];
module.exports.EAST = directionArray[1];
module.exports.SOUTH = directionArray[2];
module.exports.WEST = directionArray[3];

module.exports.left = function (currentDirection) {
    return updateDirection(currentDirection, -1);
};

module.exports.right = function (currentDirection) {
    return updateDirection(currentDirection, 1);
};

module.exports.isReal = function (potentialDirection) {
    return directionArray.includes(potentialDirection);
};

function updateDirection(currentDirection, increment) {
    let newIndex = directionArray.indexOf(currentDirection) + increment;

    //turn right
    if (newIndex >= directionArray.length) {
        newIndex = newIndex - directionArray.length;
    }

    //turn left
    if (newIndex < 0) {
        newIndex = directionArray.length + newIndex;
    }

    return directionArray[newIndex];
}
