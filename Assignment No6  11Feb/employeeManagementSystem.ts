// ## Employee Management System

// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.


enum EmployeePerformance{
    Low = 0,
    Average  = .1,
    High = .2,
    Outstanding = .4,
}

class Employee{
    name:string;
    id:number;
    performance:EmployeePerformance;
    constructor(name:string, id:number,private salary:number,performance:EmployeePerformance){
        this.name = name;
        this.id = id;
        this.performance = performance;
    }
    get Salary():number{
        return this.salary;
    }
    set Salary(newSalary:number){
        if(this.salary<newSalary){
            this.salary = newSalary;
        }
    }
    calculateBonus():number{
        return this.salary*this.performance;
    }

    setPerformance(performance:EmployeePerformance){
        this.performance = performance;
    }
}



class Manager extends Employee{
    department:string;
    constructor(name:string,id:number, salary:number,department:string,performance:EmployeePerformance){
        super(name,id,salary,performance);
        this.department = department; 
    }
    calculateBonus(): number {
        return this.Salary*this.performance
    }
}

class Engineer extends Employee{
    department:string;
    constructor(name:string,id:number,salary:number,department:string,performance:EmployeePerformance){
        super(name,id,salary,performance);
        this.department = department;
    }
    calculateBonus():number{
        return this.Salary*this.performance;
    }
}

class Intern extends Employee {
    internshipPeriod:string;
    constructor(name:string,id:number,salary:number,intertshipPeriod:string,performance:EmployeePerformance){
        super(name,id,salary,performance);
        this.internshipPeriod = intertshipPeriod;
    }
    calculateBonus(): number {
        return this.Salary*this.performance;
    }

}


const manager1 = new Manager('Rajesh',1,10000,'Security',EmployeePerformance.Average);
console.log(`Salary of ${manager1.name} from department ${manager1.department} is ${manager1.Salary} with bonus of ${manager1.calculateBonus()} because of ${EmployeePerformance[manager1.performance]} performance`);
manager1.setPerformance(EmployeePerformance.High);
manager1.Salary = 20000;
console.log(`Salary of ${manager1.name} is  change to ${manager1.Salary} with bonus of ${manager1.calculateBonus()} because of ${EmployeePerformance[manager1.performance]} performance`);



const engineer1 = new Engineer('Ajay',1,8000,"Quality Testing",EmployeePerformance.Low);
console.log(`Salary of ${engineer1.name} from department ${engineer1.department} is ${engineer1.Salary} with bonus of ${engineer1.calculateBonus()}  because of ${EmployeePerformance[engineer1.performance]} performance `);

const intern1 = new Intern('Jitesh',1,5000,"6 weeks",EmployeePerformance.High);
console.log(`Salary of ${intern1.name} is ${intern1.Salary} with bonus of ${intern1.calculateBonus()}  because of ${EmployeePerformance[intern1.performance]} performance`);
console.log(`Internship period of ${intern1.name} is ${intern1.internshipPeriod}`)


/*
Output;
Salary of Rajesh from department Security is 10000 with bonus of 1000 because of Average performance

Salary of Rajesh is  change to 20000 with bonus of 4000 because of High performance

Salary of Ajay from department Quality Testing is 8000 with bonus of 0  because of Low performance

Salary of Jitesh is 5000 with bonus of 1000  because of High performance

Intership period of Jitesh is 6 weeks

*/