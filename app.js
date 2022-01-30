const readline = require('readline');

const RobotController = require('./RobotController');
const command = require('./command');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const controller = new RobotController();
command.registerController(controller);

rl.setPrompt('Please enter your command: ');
rl.prompt();

rl.on('line', (inputString) =>{
    let success = command.interpret(inputString);
    if(success){
        console.log('command successful');
    } else{
        console.log('command failed');
    }
    rl.prompt();
});