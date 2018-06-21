const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db');
const { Expense } = require('./model');

const app = express();

app.use(bodyParser.json());

app.post('/expenses', (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year
  });

  expense.save().then((doc) => {
    res.send(doc);
  })
  .catch(err => res.status(400).send(err));
});

app.get('/expenses', (req, res) => {
  Expense.find().then((expenses) => {
    res.send({ expenses });
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };

