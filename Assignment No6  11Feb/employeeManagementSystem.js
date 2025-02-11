// ## Employee Management System
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
// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.
var EmployeePerformance;
(function (EmployeePerformance) {
    EmployeePerformance[EmployeePerformance["Low"] = 0] = "Low";
    EmployeePerformance[EmployeePerformance["Average"] = 0.1] = "Average";
    EmployeePerformance[EmployeePerformance["High"] = 0.2] = "High";
    EmployeePerformance[EmployeePerformance["Outstanding"] = 0.4] = "Outstanding";
})(EmployeePerformance || (EmployeePerformance = {}));
var Employee = /** @class */ (function () {
    function Employee(name, id, salary, performance) {
        this.salary = salary;
        this.name = name;
        this.id = id;
        this.performance = performance;
    }
    Object.defineProperty(Employee.prototype, "Salary", {
        get: function () {
            return this.salary;
        },
        set: function (newSalary) {
            if (this.salary < newSalary) {
                this.salary = newSalary;
            }
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.calculateBonus = function () {
        return this.salary * this.performance;
    };
    Employee.prototype.setPerformance = function (performance) {
        this.performance = performance;
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, id, salary, department, performance) {
        var _this = _super.call(this, name, id, salary, performance) || this;
        _this.department = department;
        return _this;
    }
    Manager.prototype.calculateBonus = function () {
        return this.Salary * this.performance;
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer(name, id, salary, department, performance) {
        var _this = _super.call(this, name, id, salary, performance) || this;
        _this.department = department;
        return _this;
    }
    Engineer.prototype.calculateBonus = function () {
        return this.Salary * this.performance;
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern(name, id, salary, intertshipPeriod, performance) {
        var _this = _super.call(this, name, id, salary, performance) || this;
        _this.internshipPeriod = intertshipPeriod;
        return _this;
    }
    Intern.prototype.calculateBonus = function () {
        return this.Salary * this.performance;
    };
    return Intern;
}(Employee));
var manager1 = new Manager('Rajesh', 1, 10000, 'Security', EmployeePerformance.Average);
console.log("Salary of ".concat(manager1.name, " from department ").concat(manager1.department, " is ").concat(manager1.Salary, " with bonus of ").concat(manager1.calculateBonus(), " because of ").concat(EmployeePerformance[manager1.performance], " performance"));
manager1.setPerformance(EmployeePerformance.High);
manager1.Salary = 20000;
console.log("Salary of ".concat(manager1.name, " is  change to ").concat(manager1.Salary, " with bonus of ").concat(manager1.calculateBonus(), " because of ").concat(EmployeePerformance[manager1.performance], " performance"));
var engineer1 = new Engineer('Ajay', 1, 8000, "Quality Testing", EmployeePerformance.Low);
console.log("Salary of ".concat(engineer1.name, " from department ").concat(engineer1.department, " is ").concat(engineer1.Salary, " with bonus of ").concat(engineer1.calculateBonus(), "  because of ").concat(EmployeePerformance[engineer1.performance], " performance "));
var intern1 = new Intern('Jitesh', 1, 5000, "6 weeks", EmployeePerformance.High);
console.log("Salary of ".concat(intern1.name, " is ").concat(intern1.Salary, " with bonus of ").concat(intern1.calculateBonus(), "  because of ").concat(EmployeePerformance[intern1.performance], " performance"));
console.log("Intership period of ".concat(intern1.name, " is ").concat(intern1.internshipPeriod));
/*
Output;
Salary of Rajesh from department Security is 10000 with bonus of 1000 because of Average performance
Salary of Rajesh is  change to 20000 with bonus of 4000 because of High performance
Salary of Ajay from department Quality Testing is 8000 with bonus of 0  because of Low performance
Salary of Jitesh is 5000 with bonus of 1000  because of High performance
Intership period of Jitesh is 6 weeks

*/ 
