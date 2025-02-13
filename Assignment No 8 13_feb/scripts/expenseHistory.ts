import { exp ,Category,IExpense,IExpenseMethods} from "./script.js";
const expenseHistoryDiv = document.querySelector('.expenseHistoryDiv') as HTMLDivElement;
const totalExpenseDiv = document.querySelector('.totalExpense') as HTMLDivElement;
const categoryFilter = document.querySelector('.categoryFilter') as HTMLSelectElement;


// const color = {
//     creditBorderColor:#10d72a,
//     --debitBorderColor:#ff0000,
    
//     --creditColor:#d4fdd9,
//     --debitColor:#ffc9c9,
//     }




interface IEventhandlers{
    getExpenseHistory:()=>IExpense[];
    showExpenseHistory:()=>void;
    renderExpenseHistory:(data:IExpense[])=>void;
}

const creditDiv = 'background:#d4fdd9; border:1px solid #10d72a;'
const debitDiv = 'background:#ffc9c9; border:1px solid #ff0000;'

const createExpenseDiv = (expense:IExpense):HTMLDivElement=>{
    const expenseDiv:HTMLDivElement = document.createElement('div');
    expenseDiv.innerHTML = `
    
     <div class="expenseDiv" id=${expense.id} style = "${expense.expenseType==='Debit'?debitDiv:creditDiv}">
                    <div class="descriptionDiv">
                        <span>Description</span>
                        <p class="description">${expense.description}</p>
                    </div>
                    <div class="dateDiv">
                        <span>Date</span>
                        <span class="date"> ${expense.date}</span>
                    </div>
                    <div class="categoryDiv">
                        <span>category</span>
                        <div class="category">${expense.category}</div>
                    </div>
                    <div class="amountAndRemoveDiv" >
                        <div class="amountDiv"  style = "${expense.expenseType==='Debit'?debitDiv:creditDiv}">
                            <div class="amount" >${expense.amount}</div>
                        </div>
                        <button class="remove">Remove</button>
                    </div>
    </div>
    
    `
    return expenseDiv;
}
const getExpenseHistory:IEventhandlers['getExpenseHistory']  = ():IExpense[]=>{
    const expenses:IExpense[] = JSON.parse(localStorage.getItem('expenses')as string);
    return expenses;

}
const renderExpenseHistory:IEventhandlers['renderExpenseHistory'] = (expenses:IExpense[]):void=>{
    expenseHistoryDiv.innerHTML = '';
   const totalExpenses:number = expenses.reduce((amount,expense:IExpense)=>{
        
        const expenseDiv = createExpenseDiv(expense);
        expenseHistoryDiv.append(expenseDiv);
        return expense.expenseType==='Debit'? amount+expense.amount:amount;
    },0);
    totalExpenseDiv.innerHTML = `${totalExpenses}`
}

const showExpenseHistory:IEventhandlers['showExpenseHistory'] = ():void=>{
    const expenses:IExpense[] = getExpenseHistory();
    renderExpenseHistory(expenses);
}
const showExpenseHistoryBycategory = (category:string):void=>{
    const expenses:IExpense[]  = exp.setExpensesByCategory(Category[category as keyof typeof Category]);
    renderExpenseHistory(expenses);
}


categoryFilter.addEventListener('change',(e:Event):void=>{
    const target = e.target as HTMLSelectElement;
    const category:string = target.value;
    if(category==='All'){
        showExpenseHistory();
        return ;
    }
    showExpenseHistoryBycategory(category);
});

const removeExpense = (removeBtn :HTMLButtonElement):void=>{
    const expenseId:number = +(removeBtn.closest('.expenseDiv') as HTMLDivElement).id;
    console.log(expenseId)
    exp.removeExpense(expenseId);
    exp.storeExpense();
    showExpenseHistory();
}

expenseHistoryDiv.addEventListener('click',(e:Event):void=>{
    // const removeBtn = document.querySelector('.remove') as HTMLButtonElement;
    const target = e.target as HTMLButtonElement;
    if(target.classList.contains('remove')){

        if(confirm("Are you sure")){
            removeExpense(target)
            
        }
    }
})
showExpenseHistory();