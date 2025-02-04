class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}

class Bike extends Vehicle{
    constructor(brand, model, rentPricePerDay){
        super(brand, model, rentPricePerDay)
    }
    calculateRentalCost(days){
        return super.calculateRentalCost(days)*.95;
    }
}
class Car extends Vehicle{
    constructor(brand, model, rentPricePerDay){
        super(brand, model, rentPricePerDay)
    }
    calculateRentalCost(days){
        return super.calculateRentalCost(days)*.90;
    }
}
class Truck extends Vehicle{
    constructor(brand, model, rentPricePerDay){
        super(brand, model, rentPricePerDay)
    }
    calculateRentalCost(days){
        return super.calculateRentalCost(days)*.92;
    }
}


const car = new Car("Toyota", "Camry", 50);
console.log(`Car Rental Cost for 10 days:  ${car.calculateRentalCost(10)}`);

const bike = new Bike("Yamaha", "R15", 20);
console.log(`Bike Rental Cost for 3 days: ${bike.calculateRentalCost(3)}`);

const truck = new Truck("Ford", "F-150", 100);
console.log(`Truck Rental Cost for 5 days: ${truck.calculateRentalCost(5)}`);