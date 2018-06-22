const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { User, Expense } = require('../../model');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users = [{
    _id: user1Id,
    email: 'andrew@test.com',
    password: 'password1',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: user1Id, access: 'auth' }, 'abc123').toString()
    }]
  },
  {
    _id: user2Id,
    email: 'bill@test.com',
    password: 'password2'
}];

const expenses = [{
    _id: new ObjectID(),
    description: 'Route testing 1.',
    category: 'Testing',
    amount: 500,
    month: 'Aug',
    year: 2018,
    _creator: user1Id
  },
  {
    _id: new ObjectID(),
    description: 'Route testing 2.',
    category: 'Fishing',
    amount: 1000,
    month: 'Sept',
    year: 2018,
    _creator: user2Id
}];

const populateExpenses = (done) => {
  Expense.remove({}).then(() => {
    return Expense.insertMany(expenses);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

module.exports = { users, populateUsers, expenses, populateExpenses };