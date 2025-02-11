// ## Vehicle Rental System

// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle {
    readonly brand:string;
    readonly model:string;

    constructor(brand:string,model:string,private rentPricePerDay:number){
        this.brand = brand;
        this.model = model;
    }
    calculateRentalCost(days:number):number{
        return this.rentPricePerDay*days;
    }
    get RentPricePerDay(){
        return this.rentPricePerDay;
    }
}


class Bike extends Vehicle{
    constructor(brand:string,model:string,rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
    }
    calculateRentalCost(days: number): number {
        return this. RentPricePerDay * days;  
    }
}

class Car extends Vehicle{
    constructor(brand:string,model:string,rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
    }
    calculateRentalCost(days: number): number {
        return this.RentPricePerDay * days;
    }
}


class Truck extends Vehicle{
    constructor(brand:string,model:string,rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
    }
    calculateRentalCost(days: number): number {
        return this.RentPricePerDay * days;
    }
}




const car = new Car("Toyota", "Camry", 50);
console.log(`Car Rental Cost for 10 days:  ${car.calculateRentalCost(10)}`);

const bike = new Bike("Yamaha", "R15", 20);
console.log(`Bike Rental Cost for 3 days: ${bike.calculateRentalCost(3)}`);

const truck = new Truck("Ford", "F-150", 100);
console.log(`Truck Rental Cost for 5 days: ${truck.calculateRentalCost(5)}`);


/*
output:
Car Rental Cost for 10 days:  500
Bike Rental Cost for 3 days: 60
Truck Rental Cost for 5 days: 500

*/