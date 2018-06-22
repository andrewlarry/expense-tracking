const mongoose = require('mongoose');
const { ExpenseSchema } = require('./schema');

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;