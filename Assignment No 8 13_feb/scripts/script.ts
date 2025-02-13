
const expenseForm = document.querySelector('.expenseForm') as HTMLFormElement;



export  enum Category{
    Food = 'Food',
    Travel = 'Travel',
    Bills = 'Bills',
    Shopping = 'Shopping',
    Income = 'Income'
}



export interface IExpense{
    id:number;
    amount:number;
    category:Category;
    date:string;
    description:string;
    expenseType:string;
}

export interface IExpenseMethods{
    addExpense:(data:IExpense)=>void;
    removeExpense:(id:number)=>void;
    storeExpenses:()=>void;
    updateExpense:(data:IExpense)=>void;
    setExpensesByCategory:(category:Category)=>IExpense[];
}


interface IEventhandlers{
    handleExpenseFormSubmit:(e:Event)=>void;
}
class ExpenseTracker  {
    private expenses:IExpense[];
    constructor(){
        this.expenses = [];
        const prevData:IExpense[] = JSON.parse(localStorage.getItem('expenses')as string);
        if(prevData){
            this.expenses = prevData;
            
        }
    }
    addExpense: IExpenseMethods['addExpense']= (data:IExpense):void=>{
        this.expenses.push(data);
    }
    removeExpense:IExpenseMethods['removeExpense'] = (id:number):void=>{
        const targetExpenseIndex = this.expenses.findIndex((exp:IExpense)=>exp.id===id);
        if(targetExpenseIndex===-1){
            alert('Expense id is not Correct');
            return ;
        }
        this.expenses.splice(targetExpenseIndex,1);
        
    }
    updateExpense:IExpenseMethods['updateExpense'] = (data:IExpense):void=>{
        const targetExpenseId:number = data.id;
        const newExpenses = this.expenses.map((exp)=>{
            return exp.id===targetExpenseId?{...data}:exp;
        })
        this.expenses = newExpenses;
    }
    storeExpense:IExpenseMethods['storeExpenses'] = ():void=>{
        localStorage.setItem('expenses',JSON.stringify(this.expenses));
       
    }
    setExpensesByCategory:IExpenseMethods['setExpensesByCategory'] = (category:Category):IExpense[]=>{
        const newExpenses = this.expenses.filter((exp)=>exp.category===category);
        return newExpenses;
    }
    
}



const generateId = ():number=>{
    const id = Date.now();
    return id;
}

const handleExpenseFormSubmit:IEventhandlers['handleExpenseFormSubmit'] = (e:Event):void=>{
    e.preventDefault();
    const description:string = (expenseForm.querySelector('.description')as HTMLTextAreaElement).value;
    const amount:number = +(expenseForm.querySelector('.amount')as HTMLInputElement).value;
    const date:string = new Date((expenseForm.querySelector('.expenseDate')as HTMLInputElement).value).toLocaleDateString();
    const category:Category = ((expenseForm.querySelector('.category')as HTMLSelectElement).value) as Category;
    const expenseType:string = (expenseForm.querySelector('.expenseType')as HTMLSelectElement).value;
    const id:number = generateId();

    if(description && amount && date && category && expenseType){
        exp.addExpense({id,description,amount,category,expenseType,date});
        exp.storeExpense();
        alert('Expense is added Successfully');
        window.location.reload();
    }else{
        alert('Fill all Data.')
    }
    
    
}

export const exp = new ExpenseTracker();

expenseForm?.addEventListener('submit',handleExpenseFormSubmit)
