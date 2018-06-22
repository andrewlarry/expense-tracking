const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Expense } = require('../model');

const expenses = [
  {
    _id: new ObjectID(),
    description: 'Route testing 1.',
    category: 'Testing',
    amount: 500,
    month: 'Aug',
    year: 2018
  },
  {
    _id: new ObjectID(),
    description: 'Route testing 2.',
    category: 'Fishing',
    amount: 1000,
    month: 'Sept',
    year: 2018
  },
];

beforeEach((done) => {
  Expense.remove({}).then(() => {
    return Expense.insertMany(expenses);
  }).then(() => done());
});

describe('POST /expenses', () => {
  it('should create a new expense', (done) => {
    const expense = {
      description: 'POST /expenses',
      category: 'Fishing',
      amount: 999,
      month: 'Aug',
      year: 2018
    };

    request(app)
      .post('/expenses')
      .send(expense)
      .expect(200)
      .expect((res) => {
        expect(res.body.description).toBe(expense.description);
        expect(res.body.category).toBe(expense.category);
        expect(res.body.amount).toBe(expense.amount);
        expect(res.body.month).toBe(expense.month);
        expect(res.body.year).toBe(expense.year);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Expense.find({ amount: expense.amount }).then((expenses) => {
          expect(expenses.length).toBe(1);
          expect(expenses[0].description).toBe(expense.description);
          expect(expenses[0].category).toBe(expense.category);
          expect(expenses[0].month).toBe(expense.month);
          expect(expenses[0].year).toBe(expense.year);
          done();
        }).catch(err => done(err));
      });
  });

  it('should not create an expense with invalid body data', (done) => {
      request(app)
        .post('/expenses')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Expense.find().then((expenses) => {
            expect(expenses.length).toBe(2);
            done();
          }).catch(err => done(err));
        });
    });
});

describe('GET /expenses', () => {
  it('should get all expenses', (done) => {
    request(app)
      .get('/expenses')
      .expect(200)
      .expect((res) => {
        expect(res.body.expenses.length).toBe(2);
      })
      .end(done);
  });
});

describe('DELETE /expenses', () => {
  it('should remove an expense', (done) => {
    const hexId = expenses[1]._id.toHexString();

    request(app)
      .delete(`/expenses/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.expense._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Expense.findById(hexId).then((expense) => {
          expect(expense).toBe(null);
          done();
        }).catch(err => done(err));
      })

  });

  it('should return 404 if expense not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/expenses/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/expenses/781728fff`)
      .expect(404)
      .end(done);
  });
});