const { Schema } = require('mongoose');

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul',
  'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

const ExpenseSchema = new Schema({
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
  }
});

module.exports = ExpenseSchema;
