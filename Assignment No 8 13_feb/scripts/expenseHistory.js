import { exp, Category } from "./script.js";
const expenseHistoryDiv = document.querySelector('.expenseHistoryDiv');
const totalExpenseDiv = document.querySelector('.totalExpense');
const categoryFilter = document.querySelector('.categoryFilter');
const creditDiv = 'background:#d4fdd9; border:1px solid #10d72a;';
const debitDiv = 'background:#ffc9c9; border:1px solid #ff0000;';
const createExpenseDiv = (expense) => {
    const expenseDiv = document.createElement('div');
    expenseDiv.innerHTML = `
    
     <div class="expenseDiv" id=${expense.id} style = "${expense.expenseType === 'Debit' ? debitDiv : creditDiv}">
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
                        <div class="amountDiv"  style = "${expense.expenseType === 'Debit' ? debitDiv : creditDiv}">
                            <div class="amount" >${expense.amount}</div>
                        </div>
                        <button class="remove">Remove</button>
                    </div>
    </div>
    
    `;
    return expenseDiv;
};
const getExpenseHistory = () => {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    return expenses;
};
const renderExpenseHistory = (expenses) => {
    expenseHistoryDiv.innerHTML = '';
    const totalExpenses = expenses.reduce((amount, expense) => {
        const expenseDiv = createExpenseDiv(expense);
        expenseHistoryDiv.append(expenseDiv);
        return expense.expenseType === 'Debit' ? amount + expense.amount : amount;
    }, 0);
    totalExpenseDiv.innerHTML = `${totalExpenses}`;
};
const showExpenseHistory = () => {
    const expenses = getExpenseHistory();
    renderExpenseHistory(expenses);
};
const showExpenseHistoryBycategory = (category) => {
    const expenses = exp.setExpensesByCategory(Category[category]);
    renderExpenseHistory(expenses);
};
categoryFilter.addEventListener('change', (e) => {
    const target = e.target;
    const category = target.value;
    if (category === 'All') {
        showExpenseHistory();
        return;
    }
    showExpenseHistoryBycategory(category);
});
const removeExpense = (removeBtn) => {
    const expenseId = +removeBtn.closest('.expenseDiv').id;
    console.log(expenseId);
    exp.removeExpense(expenseId);
    exp.storeExpense();
    window.location.reload();
};
expenseHistoryDiv.addEventListener('click', (e) => {
    // const removeBtn = document.querySelector('.remove') as HTMLButtonElement;
    const target = e.target;
    if (target.classList.contains('remove')) {
        if (confirm("Are you sure")) {
            removeExpense(target);
        }
    }
});
showExpenseHistory();
