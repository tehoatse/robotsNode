const chai = require('chai');
const expect = chai.expect;
const command = require('./command');
const RobotController = require('./RobotController');

describe('command', () => {
    before(() => {
        const controller = new RobotController();
        command.setController(controller);
    });
    context('interpret', () => {
        it('should return false from nonsense', () => {
            expect(command.interpret('lajfdlkjfalkdsj')).to.equal(false);
        });
        it('should return false from badly formed commands before a robot is placed', () => {
            expect(command.interpret('place123')).to.equal(false);
            expect(command.interpret('leff')).to.equal(false);
            expect(command.interpret('rihgt')).to.equal(false);
            expect(command.interpret('')).to.equal(false);
            expect(command.interpret('place 1,1,blorth')).to.equal(false);
        });
        it('should return false from commands before robot placed', () => {
            expect(command.interpret('report')).to.equal(false);
            expect(command.interpret('left')).to.equal(false);
            expect(command.interpret('right')).to.equal(false);
        });
        it('should return true from a correctly formed place command', () =>{
            expect(command.interpret('place 0,0,north')).to.equal(true);
        });
    });
});

