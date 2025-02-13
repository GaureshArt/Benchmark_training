const enum Category{
    food = 'Food',
    travel = 'Travel',
    bills = 'Bills',
    shopping = 'Shopping'
}

interface IExpense{
    id:number;
    amount:number;
    category:Category;
    date:Date;
    description:string;
}

interface IExpenseMethods{
    addExpense:(data:IExpense)=>void;
    removeExpense:(id:number)=>void;
    storeExpenses:()=>void;
    updateExpense:(data:IExpense)=>void;
    setExpensesByCategory:(category:Category)=>void;


}
class ExpenseTracker  {
    private expenses:IExpense[];
    constructor(){
        this.expenses = [];
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
        this.expenses = this.expenses.splice(targetExpenseIndex,1);
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
    setExpensesByCategory:IExpenseMethods['setExpensesByCategory'] = (category:Category):void=>{
        const newExpenses = this.expenses.filter((exp)=>exp.category===category);
        console.log(newExpenses);
    }
    

}



const exp = new ExpenseTracker();

exp.setExpensesByCategory(Category.bills)