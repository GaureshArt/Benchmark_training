"use strict";
class Department {
    constructor() {
        this.employee = [];
    }
    addEmployee(employee) {
        this.employee.push(employee);
    }
    ;
    removeEmployee(id) {
        const newEmployee = this.employee.filter((emp) => emp.id !== id);
        this.employee = newEmployee;
    }
    ;
    getTotalSalary() {
        const totalSalary = this.employee.reduce((salary, emp) => salary + emp.salary, 0);
        return totalSalary;
    }
    ;
    listEmployees() {
        console.log(this.employee);
    }
    ;
}
class GenericStorage {
    constructor() {
        this.storedItems = [];
    }
    add(item) {
        this.storedItems.push(item);
    }
    remove(item) {
        const newStoredItems = this.storedItems.filter((items) => items !== item);
        this.storedItems = newStoredItems;
    }
    getAll() {
        return this.storedItems;
    }
}
console.log("------Output of Department Class-------");
const dept1 = new Department();
dept1.addEmployee({ id: 1, name: "Raj", position: "Manager", salary: 2000 });
dept1.addEmployee({ id: 2, name: "Rajashree", position: "Assistant Manager", salary: 3500 });
dept1.listEmployees();
console.log(`Total salary of dept1 is ${dept1.getTotalSalary()}`);
dept1.removeEmployee(2);
dept1.listEmployees();
console.log(`Total salary of dept1 is ${dept1.getTotalSalary()}`);
console.log('');
console.log('');
console.log("------Output of GenericStorage for string type-------");
const stringStorage = new GenericStorage();
stringStorage.add("Ajay");
stringStorage.add("Raj");
stringStorage.add("Rahul");
stringStorage.remove("Ajay");
stringStorage.add("Aruna");
const allStorageList = stringStorage.getAll();
console.log(allStorageList);
console.log("------Output of GenericStorage for number type-------");
const numStorage = new GenericStorage();
numStorage.add(2);
numStorage.add(3);
numStorage.add(8);
numStorage.add(7);
numStorage.add(6);
console.log(numStorage.getAll());
numStorage.remove(3);
console.log(numStorage.getAll());
const updateSalary = (employee, newSalary) => {
    return Object.assign(Object.assign({}, employee), { salary: newSalary });
};
const emp = {
    name: "Raj",
    id: 1,
    position: "Engineer",
    salary: 45567
};
console.log("------Output of updateSalary (Utility Function)-------");
const newEmp = updateSalary(emp, 12234);
console.log(newEmp);
console.log(emp);
