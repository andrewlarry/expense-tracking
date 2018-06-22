import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

// Style to override MUI components 
const LoginStyles = {
  card: {
    height: '50%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  action: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: '0px 10px',
    backgroundColor: '#c0deed',
    color: '#0084b4',
  },
  submit: {
    margin: '30px 0px 10px 0px',
    backgroundColor: '#0084b4',
    color: 'white',
  },
  submitBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
}


// LOGIN CARD
const LoginBoxShell = (props) => {
  return (
    <Card className={props.classes.card}>
      {props.children}
    </Card>
  );
};

LoginBoxShell.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LoginBox = withStyles(LoginStyles)(LoginBoxShell);
export { LoginBox };


// TOP BUTTONS
const LoginButtonsShell = (props) => {
  return (
    <CardActions className={props.classes.action}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button size="medium" className={props.classes.button}>Login</Button>
      </Link>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <Button size="medium" className={props.classes.button}>Signup</Button>
       </Link>
    </CardActions>
  );
};

LoginButtonsShell.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LoginButtons = withStyles(LoginStyles)(LoginButtonsShell);
export { LoginButtons };


// SUBMIT BUTTON 
const SubmitButtonShell = (props) => {
  return (
    <div className={props.classes.submitBox}>
      <Button type="submit" size="large" className={props.classes.submit}>Submit</Button>
    </div>
    
  );
}

SubmitButtonShell.propTypes = {
  classes: PropTypes.object.isRequired,
}

const SubmitButton = withStyles(LoginStyles)(SubmitButtonShell);
export { SubmitButton};


// LOGIN FORM
const FormBox = styled.div`
  margin: 10px 0px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { FormBox };

