const chai = require('chai');
const expect = chai.expect;
const directions = require('./directions');

describe('testing directions', () => {
    context('testing export', () => {
        it('should have bindings that match', () => {
            let facing = directions.NORTH;
            expect(facing).to.equal(directions.NORTH);
            facing = directions.EAST;
            expect(facing).to.equal(directions.EAST);
            facing = directions.SOUTH;
            expect(facing).to.equal(directions.SOUTH);
            facing = directions.WEST;
            expect(facing).to.equal(directions.WEST);
        });
        it('should show correct values', () => {
            expect(directions.NORTH).to.equal('NORTH');
            expect(directions.EAST).to.equal('EAST');
            expect(directions.WEST).to.equal('WEST');
            expect(directions.SOUTH).to.equal('SOUTH');
        });
        it('should turn left', () =>{
            expect(directions.left(directions.NORTH)).to.equal(directions.WEST);
            expect(directions.left(directions.EAST)).to.equal(directions.NORTH);
            expect(directions.left(directions.SOUTH)).to.equal(directions.EAST);
            expect(directions.left(directions.WEST)).to.equal(directions.SOUTH);
        });
        it('should turn right', () =>{
            expect(directions.right(directions.NORTH)).to.equal(directions.EAST);
            expect(directions.right(directions.EAST)).to.equal(directions.SOUTH);
            expect(directions.right(directions.SOUTH)).to.equal(directions.WEST);
            expect(directions.right(directions.WEST)).to.equal(directions.NORTH);
        });
    });
});