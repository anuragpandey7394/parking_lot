const fs = require('fs');
const readline = require('readline')
const parkingSpace = require('./src/controller');
var rl = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
});

function parkingLotOperation() {
    try {
        const parkingSpaceObject = new parkingSpace();
        let result = '';
        rl.on('line', function(line) {
            const array = line.split(' ');
            if (array[0] === 'create_parking_lot') {
                result += parkingSpaceObject.addCapacity(array[1]) + '\r\n';
            }
            if (array[0] === 'park') {
                result += parkingSpaceObject.addCar(array[1]) + '\r\n';
            }
            if (array[0] === 'leave') {
                result += parkingSpaceObject.removeCar(array[1], array[2]) + '\r\n';
            }
            if (array[0] === 'status') {
                result += parkingSpaceObject.showParkingLot();
            }
        });
        rl.on('close', () => {
            fs.writeFile('output.txt', result, (err) => {
                if (err) {
                    throw err;
                }
            })
        });
    } catch (error) {
        throw new Error(error);
    }

}

parkingLotOperation();