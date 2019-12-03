import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import Input from '../UI/Input/Input';
import {withFirebase} from '../Firebase';
import {checkValidity} from '../../shared/validation';
import * as ROUTES from '../../constants/routes';


const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm/>
  </div>
);
const INITAL_PASSWORD = {
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'confirm password'
  },
  validation: {
    required: true,
    NotEmpty: true
  },
  value: '',
  valid: false,
  toutched: false
}

const INITAL_EMAIL = {
  elementType: 'input',
  elemetConfig: {
    type: 'email',
    placeholder: 'email'
  },
  validation: {
    required: true,
    isEmail: true,
    NotEmpty: true
  },
  value: '',
  valid: false,
  toutched: false
}

const SignInFormBase = props => {
  const [password,
    setPassword] = useState(INITAL_PASSWORD);
  const [email,
    setEmail] = useState(INITAL_EMAIL);
  const [error,
    setError] = useState({error: null});

  const isFormValid = () => {
    if (password.valid && email.valid)
      return true;
    else
      return false;
    }

  const onSubmit = event => {
    if (isFormValid)
      props.firebase.doSignInWithEmailAndPassword(email.value, password.value).then(() => {
        setPassword(INITAL_PASSWORD);
        setEmail(INITAL_EMAIL);
        error({error: null});
        // props   .history   .push(ROUTES.HOME);
      }).catch(error => {
        setError({error})
        console.log(error);
      });
    event.preventDefault();
  };

  const onChangePassword = (event) => {
    const updatedControl = {
      ...password,
      value: event.target.value,
      valid: checkValidity(event.target.value, password.validation),
      toutched: true
    }
    setPassword(updatedControl)
  }

  const onEmailChange = (event) => {
    const updatedControl = {
      ...email,
      value: event.target.value,
      valid: checkValidity(event.target.value, password.validation),
      toutched: true
    }
    setEmail(updatedControl)
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        elementType={email.elementType}
        elementConfig={email.elemetConfig}
        value={email.value}
        invalid={!email.valid}
        toutched={email.toutched}
        changed={(event) => onEmailChange(event)}/>
      <Input
        elementType={password.elementType}
        elementConfig={password.elemetConfig}
        value={password.value}
        invalid={!password.valid}
        toutched={password.toutched}
        changed={(event) => onChangePassword(event)}/>
      <button type="submit">
        Sign In
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export {SignInForm};