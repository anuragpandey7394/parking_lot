module.exports = class ManageParkingSpace {

    #slotArray = []; // Array for allocating slots
    #vacantSlot = []; // Array for vacant slots
    #capacity = 0; // Capacity of parking lot
    
    /**
     * @param {number} capacity
     * function to add Capacity 
     */
    addCapacity(capacity){
      if(!Number.isInteger(capacity)){
         throw new Error('invalid Input');
      }
      this.#capacity = capacity;
      return(`Created parking lot with ${capacity} slots`);
    }

    /**
     * function to get calculate time
     * @param {number} time 
     */
    calculateTime(time) {
        let price;
        if (time <= 2) {
            price = 10;
        } else {
            price = (time - 2) * 10 + 10;
        }
        return price;
    }
 
    /**
     * function to remove car from parking lot
     * @param {string} parkedCarNumber 
     * @param {number} time 
     */
    removeCar(parkedCarNumber, time) {
        if(!Number.isInteger(time)){
            throw new Error('invalid Input');
         }
        let carParked = false;
        for(let i=0;i<this.#slotArray.length;i++){
            if (this.#slotArray[i] !==null && this.#slotArray[i].carNumber === parkedCarNumber) {
                this.#slotArray[i] = null;
                this.#vacantSlot.push(i);
                this.#vacantSlot.sort();
                carParked = true;
                return(`Registration number ${parkedCarNumber} with Slot Number ${i+1} is free with Charge  $${this.calculateTime(time)}`);
           }
        }
        if(!carParked){
            return (`Registration number ${parkedCarNumber} not found`)
        }
    }
    

    /**
     * function to add Car
     * @param {String} carNumber 
     * @param {String} color 
     */
    addCar(carNumber, color=null) {
        if(this.#slotArray.length === 0){
           this.#slotArray.push({ 'carNumber': carNumber, 'color': color });
           return('Allocated slot number 1');
        }
        else if((parseInt(this.#slotArray.length) === parseInt(this.#capacity)) && !this.#vacantSlot.length){
            return('Slots Full');   
        }
        else{
            let result;
            this.#slotArray.forEach((carObject) => {
                if(carObject === null || carObject.carNumber === carNumber){
                  result = false; 
                }
                else{
                    result = true;
                }
            });
            if(result && (this.#vacantSlot.length === 0) && (this.#slotArray.length < this.#capacity)){
                this.#slotArray.push({ 'carNumber': carNumber, 'color': color });
                return(`Allocated slot number ${this.#slotArray.length}`);
                
            }
            else{
                this.#slotArray[this.#vacantSlot[0]] = { 'carNumber': carNumber, 'color': color };
                this.#vacantSlot.shift();
                return(`Allocated slot number ${this.#vacantSlot[0]+1}`);
                
            }
        }
    }
    
    /**
     * function to show parking lot
     */
    showParkingLot() {
        let text = 'Slot No. Registration No. \r\n' 
        this.#slotArray.forEach((object,index)=>{
            if(object !== null){
               text += `  ${index+1}     ${object.carNumber}\r\n`;
            }
        });
        return text;
    }
};