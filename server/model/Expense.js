const mongoose = require('mongoose');
const { expenseSchema } = require('./schema');

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;