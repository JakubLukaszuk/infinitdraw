import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import Input from '../UI/Input/Input';
import {withFirebase} from '../Firebase';
import {checkValidity} from '../../shared/validation';
import {SignUpLink} from '../SignUpForm/SignUpForm';
import {PasswordForgetLink} from '../PasswordForget';
import * as ROUTES from '../../constants/routes';

import style from './SignInFrom.module.sass';

const SignInPage = () => (
  <div className={style.page}>
    <SignInForm/>
    <SignUpLink/>
  </div>
);
const INITAL_PASSWORD = {
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'password'
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
    if (isFormValid) {
      props
        .firebase
        .doSignInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          console.log(props.history);
          setPassword(INITAL_PASSWORD);
          setEmail(INITAL_EMAIL);
          setError({error: null});
          props
            .history
            .push(ROUTES.HOME);
        })
        .catch(error => {
          setError(error)
        });
    } else {
      setError({message: "Form is not valid."})
    }

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
      <h2>Sign In</h2>
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
      <div className={style.actionPanel}>
        <button type="submit">
          log In
        </button>
        <PasswordForgetLink/>
      </div>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export {SignInForm};