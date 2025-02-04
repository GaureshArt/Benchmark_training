class Employee {
    #salary;
    constructor(id,name,salary){
        this.id = id;
        this.name = name;
        this.#salary = salary;
    }
    calculateBonus(){
        return this.#salary * 0.2;
    }
    getSalary(){
        return this.#salary;
    }
}

class Manager extends Employee{
    constructor(id,name,salary,department){
        super(id,name,salary);
        this.department = department;
    }
    calculateBonus(){
        return super.calculateBonus() + 1000;
    }
}

class Engineer extends Employee{
    constructor(id,name,salary){
        super(id,name,salary);
    }
    
    calculateBonus(){
        return super.calculateBonus() + 500;
    }

    getSalary(){
        return super.getSalary();
    }
}

class Intern extends Employee{

    constructor(id,name,salary){
        super(id,name,salary);
    }

    calculateBonus(){
        return super.getSalary()*.1;
    }
}

const manager1 = new Manager(1,'Rajesh',10000,'security');
console.log(manager1.calculateBonus());


const engineer1 = new Engineer(1,'Ajay',5000);
console.log(engineer1.calculateBonus());

const intern1 = new Intern(1,'Jitesh',2000);
console.log(intern1.calculateBonus());


console.log(engineer1.getSalary());