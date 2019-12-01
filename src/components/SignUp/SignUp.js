import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm/>
  </div>
);

const [registrationData,
  setRegistrationData] = useState({
    nickname: {
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
    },
  emial: {
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
  },
  password: {
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
})

const [passwordCheck,
  setPasswordCheck] = useState({
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'confirm password'
  },
  value: '',
  valid: false,
  toutched: false
})

const [error,
  setError] = useState({error: null})
const [isFormValid,
  setIsFormValid] = useState({isFormValid: false})

  const isFormValid =()=>{
    if(!isSignIn)
      if(!passwordCheck.valid)
        return false;
      for (let key in registrationData) {
       if(!registrationData[key].valid)
        return false;
    }
    setMessage(null)
    return true;
  }

  const formElementsArray = [];
  for (let key in registrationData) {
    formElementsArray.push({id: key, config: registrationData[key]})
  }

const SignUpForm = props => {

  onSubmit = event => {}
  onChange = event => {
    setRegistrationData({
      [event.target.name]: event.target.value
    });
  };

  return (
    <form onSubmit={this.onSubmit}>
      <input
        name="username"
        value={username}
        onChange={this.onChange}
        type="text"
        placeholder="Full Name"/>
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"/>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={this.onChange}
        type="password"
        placeholder="Password"/>
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={this.onChange}
        type="password"
        placeholder="Confirm Password"/>
      <button type="submit">Sign Up</button>
      {error && <p>{error.message}</p>}
    </form>
  );

}
const SignUpLink = () => (
  <p>
    Don't have an account?
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
export default SignUpPage;
export {SignUpForm, SignUpLink};