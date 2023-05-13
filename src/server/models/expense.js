const mongoose = require ("mongoose");

const ExpenseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    expense_category: { type: String, required: true },
    amount: { type: Number, required: true }
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;