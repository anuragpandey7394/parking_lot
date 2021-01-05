const { expect, assert } = require('chai');
const controller = require('../src/controller');

describe('test cases for ManageParkingSpace class', () => {
    controllerObject = new controller();
    it('test case for addCapacity', () => {
        const result = controllerObject.addCapacity(5);
        expect(result).to.be.a('string');
    });
    it('test case for addCapacity - Error Scenario', () => {
        assert.throw(() => { controllerObject.addCapacity('5'), new Error('invalid Input') });
    });
    it('test case for calculateTime', () => {
        const result = controllerObject.calculateTime(2);
        expect(result).to.equal(10);
    });
    it('test case for removeCar - Error Scenario', () => {
        assert.throw(() => { controllerObject.removeCar('park KA-01-HH-1234', '5'), new Error('invalid Input') });
    });
    it('test case for removeCar', () => {
        const array = [
            { carNumber: 'KA-01-HH-1234', color: null },
            { carNumber: 'KA-01-HH-9999', color: null },
            { carNumber: 'KA-01-BB-0001', color: null },
            { carNumber: 'KA-01-HH-7777', color: null },
            { carNumber: 'KA-01-HH-2701', color: null },
            { carNumber: 'KA-01-HH-3141', color: null }
        ];
        array.forEach(object => controllerObject.addCar(object.carNumber, object.color));
        const result = controllerObject.removeCar('park KA-01-HH-3141', 5);
        expect(result).to.be.a('string');
    });
    it('test case for showParkingLot', () => {
        const result = controllerObject.showParkingLot();
        expect(result).to.be.a('string');
    });
})