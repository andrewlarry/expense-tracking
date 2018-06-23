require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const path = require('path');
const bcrypt = require('bcryptjs');

const { mongoose } = require('./db');
const { User, Expense } = require('./model');
const { authenticate } = require('./middleware');


const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/public')));

// Serve React homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

/**
 * User routes
 */

 // Get your user credentials if you have a valid JWT
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Log a user out
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  })
  .catch(() => res.status(400).send());
})

// Create a new user
app.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(err => res.status(400).send());
});

// Log in an existing user
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  
  User.findByCredentials(email, password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => res.status(400).send());

});


/**
 * Exprense routes
 */

// Create a new expense
app.post('/expenses', authenticate, (req, res) => {
  const expense = new Expense({
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    month: req.body.month,
    year: req.body.year,
    _creator: req.user._id
  });

  expense.save().then((doc) => {
    res.send(doc);
  }).catch(err => res.status(400).send(err));
});

// Get all expenses for a user
app.get('/expenses', authenticate, (req, res) => {
  Expense.find({ _creator: req.user._id }).then((expenses) => {
    res.send({ expenses });
  }).catch(err => res.status(400).send(err));
});

// Delete an expense
app.delete('/expenses/:id', authenticate, (req, res) => {
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

// Serve React homepage
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}`);
});

module.exports = { app };

