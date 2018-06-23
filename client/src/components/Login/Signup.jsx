import React from 'react';

import { LoginBox, LoginButtons, SubmitButton, FormBox } from './Login.styles';


import TextField from '@material-ui/core/TextField';


const Signup = (props) => {
  if (props.isLoggedIn()) {
    return <Redirect to="/" />;
  }
  return (
    <LoginBox>
      <LoginButtons />
      <FormBox>
        <form method="pos" onSubmit={props.onSubmit}>
          <TextField
            id="email"
            required
            onChange={props.onChange}
            fullWidth
            helperText="email"
          />
          <TextField
            id="email2"
            required
            onChange={props.onChange}
            fullWidth
            helperText="enter email again"
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


export default Signup;