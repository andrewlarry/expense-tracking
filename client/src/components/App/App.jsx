import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { Login, Signup } from '../Login';
import Report from '../Report';

const Test = (props) => {
  if (!props.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (<h1>Hello World</h1>);
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      token: null,
      login: {
        email: '',
        email2: '',
        password: ''
      },
      expenses: null
    };

    this.validateLogin = this.validateLogin.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  validateLogin() {
    if (this.state.username.length === 0) return 'Username Required';
    else if (this.state.password.length === 0) return 'Password Required';
  }

  inputChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  inputSubmit(e) {
    console.log('username', username);
    console.log('password', password);
    e.preventDefault();
  }

  login(e) {
    const data = { email: this.state.email, password: this.state.password };
    fetch('/users/login', {
      method: 'POST', 
      mode: 'cors',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({ token: localStorage.getItem('--token'), loggedIn: true });

      return fetch('/expenses', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'x-auth': localStorage.getItem('--token')
        }
      })
    }).then(res => {
      return res.json();
    }).then(json => console.log('Success:', json))
      .catch(error => console.error('Error:', error));
    e.preventDefault();
  }

  signup(e) {
    console.log(e.target.email);
    console.log(this.state);

    const data = { email: this.state.email, password: this.state.password };

    fetch('/users', {
      method: 'POST', 
      mode: 'cors',
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(json => console.log('Success:', json))
      .catch(error => console.error('Error:', error));

    e.preventDefault();
  }

  isLoggedIn() {
    return this.state.loggedIn;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => (
              <Report isLoggedIn={this.isLoggedIn} {...props} />)} 
          />
          <Route 
            exact 
            path="/login" 
            render={(props) => (
              <Login isLoggedIn={this.isLoggedIn} onChange={this.inputChange} onSubmit={this.login} {...props} />)} 
          />
          <Route 
            exact 
            path="/signup" 
            render={(props) => (
              <Signup isLoggedIn={this.isLoggedIn} onChange={this.inputChange} onSubmit={this.signup} {...props} />)} 
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
