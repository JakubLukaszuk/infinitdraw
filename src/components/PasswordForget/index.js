import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {checkValidity} from '../../shared/validation';

import Input from '../UI/Input/Input';
import * as ROUTES from '../../constants/routes';

import style from './passwordForget.module.sass';

const PasswordForgetPage = () => (
  <div className={style.passwordForget}>
    <h2>Password Forget</h2>
    <PasswordForgetForm/>
  </div>
);

const INITIAL_EMAIL = {
  elementType: 'input',
  elemetConfig: {
    type: 'emial',
    placeholder: 'Email Adress'
  },
  value: '',
  validation: {
    required: true,
    isEmail: true,
    maxLength: 24
  },
  valid: false,
  toutched: false
}

const PasswordForgetFormBase = props => {

  const [email,
    setEmail] = useState(INITIAL_EMAIL);
  const [error,
    setError] = useState({error: null});

  const onSubmit = (event) => {
    props
      .firebase
      .doPasswordReset(email.value)
      .then(() => {
        setEmail(INITIAL_EMAIL);
        setError({error: null});
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  const onChange = (event) => {
    const updatedControl = {
      ...email,
      value: event.target.value,
      valid: checkValidity(event.target.value, email.validation),
      toutched: true
    }
    setEmail(updatedControl)
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        elementType={email.elementType}
        elementConfig={email.elemetConfig}
        value={email.value}
        invalid={!email.valid}
        toutched={email.toutched}
        changed={(event) => onChange(event)}/>
      <button disabled={!email.valid} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SendResetPasswordButton = props => (
  <button onClick={() =>props.firebase.doPasswordReset(props.email)}>Send Rest Password</button>
)

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
const ResetPasswordButton = withFirebase(SendResetPasswordButton);
export { PasswordForgetForm, PasswordForgetLink, ResetPasswordButton};