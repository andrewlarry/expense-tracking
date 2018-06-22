import React from 'react';

import { LoginBox, LoginButtons, FormBox, SubmitButton } from './Login.styles';
import TextField from '@material-ui/core/TextField';


const Login = (props) => (
  <LoginBox>
    <LoginButtons />
    <FormBox>
      <form onSubmit={props.onSubmit}>
        <TextField
          id="username"
          required
          onChange={props.onChange}
          fullWidth
          helperText="username"
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

export default Login;
