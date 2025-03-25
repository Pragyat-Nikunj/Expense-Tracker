document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseInt(expenseAmountInput.value.trim());
        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            }
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
            expenseAmountInput.value = "";
            expenseNameInput.value = "";
        } 
    })
    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
    function renderExpenses() {
        expenseList.innerHTML = ``;
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <span>${expense.name} - $${expense.amount}</span>
            <button data-id = ${expense.id}>Delete</button>
            `
            expenseList.appendChild(li);
        })
    }
    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    renderExpenses();
    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const expense_id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expense_id);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    })
})