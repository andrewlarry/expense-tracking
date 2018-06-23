import React from 'react';
import { Redirect } from 'react-router-dom';

import { LoginBox, LoginButtons, FormBox, SubmitButton } from './Login.styles';
import TextField from '@material-ui/core/TextField';


const Login = (props) => {
  if (props.isLoggedIn()) {
    return <Redirect to="/" />;
  }
  return (
    <LoginBox>
      <LoginButtons />
      <FormBox>
        <form method="post" onSubmit={props.onSubmit}>
          <TextField
            id="email"
            required
            onChange={props.onChange}
            fullWidth
            helperText="email"
          />
          <TextField
            id="password"
            required
            onChange={props.onChange}
            fullWidth
            type="password"
            helperText="password"
          />
          <SubmitButton />
        </form>
      </FormBox>
    </LoginBox>
  );
}


export default Login;
