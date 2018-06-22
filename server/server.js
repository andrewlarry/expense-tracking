const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db');
const { User, Expense } = require('./model');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a new user
app.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  // User.findByToken();
  // user.generateAuthToken();

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(err => res.status(400).send());
});

// Create a new expense
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
  }).catch(err => res.status(400).send(err));
});

// Get all expenses 
app.get('/expenses', (req, res) => {
  Expense.find().then((expenses) => {
    res.send({ expenses });
  }).catch(err => res.status(400).send(err));
});

// Delete an expense
app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Expense.findByIdAndRemove(id).then((expense) => {
    if (!expense) {
      return res.status(404).send();
    }
    res.send({ expense });
  }).catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };

