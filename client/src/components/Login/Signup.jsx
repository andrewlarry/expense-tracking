import React from 'react';

import { LoginBox, LoginButtons, SubmitButton } from './Login.styles';


import TextField from '@material-ui/core/TextField';


const Signup = (props) => (
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
    <SubmitButton />
  </LoginBox>
);


export default Signup;