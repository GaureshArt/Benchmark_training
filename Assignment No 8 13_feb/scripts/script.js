const expenseForm = document.querySelector('.expenseForm');
export var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Shopping"] = "Shopping";
    Category["Income"] = "Income";
})(Category || (Category = {}));
class ExpenseTracker {
    constructor() {
        this.addExpense = (data) => {
            this.expenses.push(data);
        };
        this.removeExpense = (id) => {
            const targetExpenseIndex = this.expenses.findIndex((exp) => exp.id === id);
            if (targetExpenseIndex === -1) {
                alert('Expense id is not Correct');
                return;
            }
            this.expenses.splice(targetExpenseIndex, 1);
        };
        this.updateExpense = (data) => {
            const targetExpenseId = data.id;
            const newExpenses = this.expenses.map((exp) => {
                return exp.id === targetExpenseId ? Object.assign({}, data) : exp;
            });
            this.expenses = newExpenses;
        };
        this.storeExpense = () => {
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
        };
        this.setExpensesByCategory = (category) => {
            const newExpenses = this.expenses.filter((exp) => exp.category === category);
            return newExpenses;
        };
        this.expenses = [];
        const prevData = JSON.parse(localStorage.getItem('expenses'));
        if (prevData) {
            this.expenses = prevData;
        }
    }
}
const generateId = () => {
    const id = Date.now();
    return id;
};
const handleExpenseFormSubmit = (e) => {
    e.preventDefault();
    const description = expenseForm.querySelector('.description').value;
    const amount = +expenseForm.querySelector('.amount').value;
    const date = new Date(expenseForm.querySelector('.expenseDate').value).toLocaleDateString();
    const category = (expenseForm.querySelector('.category').value);
    const expenseType = expenseForm.querySelector('.expenseType').value;
    const id = generateId();
    if (description && amount && date && category && expenseType) {
        exp.addExpense({ id, description, amount, category, expenseType, date });
        exp.storeExpense();
        alert('Expense is added Successfully');
        window.location.reload();
    }
    else {
        alert('Fill all Data.');
    }
};
export const exp = new ExpenseTracker();
expenseForm === null || expenseForm === void 0 ? void 0 : expenseForm.addEventListener('submit', handleExpenseFormSubmit);
