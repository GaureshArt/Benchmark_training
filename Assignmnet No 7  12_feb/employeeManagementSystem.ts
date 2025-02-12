interface IEmployee{
    id:number;
    name:string;
    position:string;
    salary:number;
}

interface IManager extends IEmployee{
    teamSize:number;
}


class Department{
    private employee: IEmployee[] = [];

    addEmployee(employee:IEmployee):void{
        this.employee.push(employee);
    };
    removeEmployee(id:number):void{
        const newEmployee:IEmployee[] = this.employee.filter((emp:IEmployee)=>emp.id!==id);
        this.employee = newEmployee;
        
    };
    getTotalSalary():number{
        const totalSalary:number = this.employee.reduce((salary,emp)=>salary+emp.salary,0);
        return totalSalary;
    };
    listEmployees():void{
        console.log(this.employee)
    };
}

class GenericStorage<T>{
    private storedItems:T[] = [];
    add(item:T):void{
        this.storedItems.push(item);
    }
    remove(item:T):void{
        const newStoredItems:T[]  = this.storedItems.filter((items)=>items!==item);
        this.storedItems = newStoredItems;
    }
    getAll():T[]{
        return this.storedItems;
    }
}
console.log("------Output of Department Class-------")
const dept1 = new Department()
dept1.addEmployee({id:1,name:"Raj",position:"Manager",salary:2000});
dept1.addEmployee({id:2,name:"Rajashree",position:"Assistant Manager",salary:3500});
dept1.listEmployees();
console.log(`Total salary of dept1 is ${dept1.getTotalSalary()}`)
dept1.removeEmployee(2);
dept1.listEmployees();
console.log(`Total salary of dept1 is ${dept1.getTotalSalary()}`)
console.log('')
console.log('')

console.log("------Output of GenericStorage for string type-------")
const stringStorage = new GenericStorage<string>();
stringStorage.add("Ajay")
stringStorage.add("Raj")
stringStorage.add("Rahul")
stringStorage.remove("Ajay")
stringStorage.add("Aruna")
const allStorageList:string[] = stringStorage.getAll();
console.log(allStorageList)
console.log("------Output of GenericStorage for number type-------")
const numStorage = new GenericStorage<number>();
numStorage.add(2);
numStorage.add(3);
numStorage.add(8);
numStorage.add(7);
numStorage.add(6);
console.log(numStorage.getAll());
numStorage.remove(3);
console.log(numStorage.getAll());



const updateSalary = <T extends IEmployee>(employee:T,newSalary:number):T=>{
    return {
        ...employee,
        salary:newSalary
    }
}

const emp:IEmployee = {
    name:"Raj",
    id:1,
    position:"Engineer",
    salary:45567
}

console.log("------Output of updateSalary (Utility Function)-------")
const newEmp:IEmployee = updateSalary(emp,12234);

console.log(newEmp)
console.log(emp);





