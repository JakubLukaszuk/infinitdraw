import React, {useState} from 'react';

import {withFirebase} from '../Firebase';
import Input from '../UI/Input/Input';
import {checkValidity, checkStringEquality} from '../../shared/validation';

const INITAL_PASSWORD_CONFIRM_STATE = {
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'confirm password'
  },
  value: '',
  valid: false,
  toutched: false
}

const INITIAL_PASSWORD_STATE = {
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'password'
  },
  value: '',
  validation: {
    required: true,
    minLength: 8,
    maxLength: 16
  },
  valid: false,
  toutched: false
}

const PasswordChangeForm = props => {
  const [password,
    setPassword] = useState(INITIAL_PASSWORD_STATE);
  const [confirmPassword,
    setConfirmPassword] = useState(INITAL_PASSWORD_CONFIRM_STATE);
  const [error,
    setError] = useState({error: null});

  const onSubmit = event => {
      if(isFormValid()){
        props
        .firebase
        .doPasswordUpdate(password.value)
        .then(() => {
          setPassword(INITIAL_PASSWORD_STATE);
          setConfirmPassword(INITAL_PASSWORD_CONFIRM_STATE);
          setError({error: null})
        })
        .catch(error => {
          setError({error: null})
        });
      }
    event.preventDefault();
  };

  const isFormValid = () => {
    if (!confirmPassword.valid)
      return false;
    if (!password.valid)
      return false;
    return true;
  }

  const onChangePassword = event => {
    const updatedControl = {
      ...password,
      value: event.target.value,
      valid: checkValidity(event.target.value, password.validation),
      toutched: true
    }
    setPassword(updatedControl);
  };

  const onChangeConfirmPassword = event => {
    const updatedControl = {
      ...confirmPassword,
      value: event.target.value,
      valid: checkStringEquality(event.target.value, password.value),
      toutched: true
    }
    setConfirmPassword(updatedControl);
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        elementType={password.elementType}
        elementConfig={password.elemetConfig}
        value={password.value}
        invalid={!password.valid}
        toutched={password.toutched}
        changed={(event) => onChangePassword(event)}/>
      <Input
        elementType={confirmPassword.elementType}
        elementConfig={confirmPassword.elemetConfig}
        value={confirmPassword.value}
        invalid={!confirmPassword.valid}
        toutched={confirmPassword.toutched}
        changed={(event) => onChangeConfirmPassword(event)}/>
      <button type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default withFirebase(PasswordChangeForm);