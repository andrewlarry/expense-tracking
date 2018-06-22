const mongoose = require('mongoose');

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul',
  'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

const ExpenseSchema = new mongoose.Schema({
  description: String,
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  month: {
    type: String, 
    enum: months,
    required: true
  },
  year: {
    type: Number,
    min: [2018, 'Can only plan for this year and above.'],
    max: 2118,
    required: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = ExpenseSchema;
