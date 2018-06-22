import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { Login, Signup } from '../Login';
import Feed from '../Feed';

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
      login: {
        username: '',
        password: ''
      }
    };

    this.validateLogin = this.validateLogin.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
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
              <Feed isLoggedIn={this.isLoggedIn} {...props} />)} 
          />
          <Route 
            exact 
            path="/login" 
            render={(props) => (
              <Login onChange={this.inputChange} onSubmit={this.inputSubmit} {...props} />)} 
          />
          <Route 
            exact 
            path="/signup" 
            render={(props) => (
              <Signup onChange={this.inputChange} onSubmit={this.inputSubmit} {...props} />)} 
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
