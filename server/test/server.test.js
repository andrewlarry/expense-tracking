const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { User, Expense } = require('../model');
const { users, populateUsers, expenses, populateExpenses } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateExpenses);

// describe('POST /expenses', () => {
//   it('should create a new expense', (done) => {
//     const expense = {
//       description: 'POST /expenses',
//       category: 'Fishing',
//       amount: 999,
//       month: 'Aug',
//       year: 2018,
//       _creator: users[0]._id
//     };

//     request(app)
//       .post('/expenses')
//       .send(expense)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.description).toBe(expense.description);
//         expect(res.body.category).toBe(expense.category);
//         expect(res.body.amount).toBe(expense.amount);
//         expect(res.body.month).toBe(expense.month);
//         expect(res.body.year).toBe(expense.year);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         Expense.find({ amount: expense.amount }).then((expenses) => {
//           expect(expenses.length).toBe(1);
//           expect(expenses[0].description).toBe(expense.description);
//           expect(expenses[0].category).toBe(expense.category);
//           expect(expenses[0].month).toBe(expense.month);
//           expect(expenses[0].year).toBe(expense.year);
//           done();
//         }).catch(err => done(err));
//       });
//   });

//   it('should not create an expense with invalid body data', (done) => {
//       request(app)
//         .post('/expenses')
//         .send({})
//         .expect(400)
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           Expense.find().then((expenses) => {
//             expect(expenses.length).toBe(2);
//             done();
//           }).catch(err => done(err));
//         });
//     });
// });

// describe('GET /expenses', () => {
//   it('should get all expenses', (done) => {
//     request(app)
//       .get('/expenses')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.expenses.length).toBe(2);
//       })
//       .end(done);
//   });
// });

// describe('DELETE /expenses', () => {
//   it('should remove an expense', (done) => {
//     const hexId = expenses[1]._id.toHexString();

//     request(app)
//       .delete(`/expenses/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.expense._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         Expense.findById(hexId).then((expense) => {
//           expect(expense).toBe(null);
//           done();
//         }).catch(err => done(err));
//       })

//   });

//   it('should return 404 if expense not found', (done) => {
//     const hexId = new ObjectID().toHexString();

//     request(app)
//       .delete(`/expenses/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return 404 if object id is invalid', (done) => {
//     request(app)
//       .delete(`/expenses/781728fff`)
//       .expect(404)
//       .end(done);
//   });
// });

describe('GET /me', () => {
  it('should return a user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'testing123@test.com';
    const password = 'validpassword';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(done);
  });

  it('should return validation errors if request is invalid', (done) => {
    const email = 'notvalid';
    const password = 'validpassword';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', (done) => {
    const email = 'andrew@test.com';
    const password = 'validpassword';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toHaveProperty('access', 'auth');
          expect(user.tokens[0]).toHaveProperty('token', res.headers['x-auth']);
          done();
        }).catch(err => done(err));
      });
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'wrongpassword'
      })
      .expect(400)
      .end(done);
  });

});