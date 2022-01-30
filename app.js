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


// rl.question('Please enter your command: ', (newInput) =>{
//     console.log(newInput);
//     //rl.close();
// });

// rl.on('close', function(){
//   console.log(`\nthankyou for playing`)
// });
// // let robot = new Robot(1, 1, 'north');
// // console.log(robot);

