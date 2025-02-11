// ## Vehicle Rental System
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPricePerDay) {
        this.rentPricePerDay = rentPricePerDay;
        this.brand = brand;
        this.model = model;
    }
    Vehicle.prototype.calculateRentalCost = function (days) {
        return this.rentPricePerDay * days;
    };
    Object.defineProperty(Vehicle.prototype, "RentPricePerDay", {
        get: function () {
            return this.rentPricePerDay;
        },
        enumerable: false,
        configurable: true
    });
    return Vehicle;
}());
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Bike.prototype.calculateRentalCost = function (days) {
        return this.RentPricePerDay * days;
    };
    return Bike;
}(Vehicle));
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        return this.RentPricePerDay * days;
    };
    return Car;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        return this.RentPricePerDay * days;
    };
    return Truck;
}(Vehicle));
var car = new Car("Toyota", "Camry", 50);
console.log("Car Rental Cost for 10 days:  ".concat(car.calculateRentalCost(10)));
var bike = new Bike("Yamaha", "R15", 20);
console.log("Bike Rental Cost for 3 days: ".concat(bike.calculateRentalCost(3)));
var truck = new Truck("Ford", "F-150", 100);
console.log("Truck Rental Cost for 5 days: ".concat(truck.calculateRentalCost(5)));
/*
output:
Car Rental Cost for 10 days:  500
Bike Rental Cost for 3 days: 60
Truck Rental Cost for 5 days: 500

*/ 
