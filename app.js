const readline = require('readline');

const RobotController = require('./RobotController');
const interpreter = require('./commandInterpreter');
const commander = require('./robotCommander');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const controller = new RobotController();
interpreter.setController(controller);
commander.setController(controller);

rl.setPrompt('Please enter your command: ');
rl.prompt();

rl.on('line', (inputString) =>{
    let success = interpreter.interpret(inputString);
    if(success){
        console.log('command successful');
    } else{
        console.log('command failed');
    }
    rl.prompt();
});