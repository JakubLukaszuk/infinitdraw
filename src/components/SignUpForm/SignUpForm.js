import React, {useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import * as ROUTES from '../../constants/routes';

import Input from '../UI/Input/Input';
import {withFirebase} from '../Firebase';
import {checkValidity, checkStringEquality} from '../../shared/validation';
import style from './SignUpForm.module.sass';
import {getErrorMessageFromCode} from '../../shared/errorMessage';
import Spinner from '../../components/UI/Spinner/Spinner';

const SignUpPage = () => (
  <div className={style.page}>
    <SignUpForm/>
  </div>
);

const INITIAL_REGISTATION_DATA_STATE = {
  nickname: {
    elementType: 'input',
    elemetConfig: {
      type: 'text',
      placeholder: 'nickname'
    },
    value: '',
    validation: {
      required: true,
      minLength: 3,
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
      minLength: 3,
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
}

const INITAL_CHECK_PASSWORD_STATE = {
  elementType: 'input',
  elemetConfig: {
    type: 'password',
    placeholder: 'confirm password'
  },
  value: '',
  valid: false,
  toutched: false
}

const VALIDATION_MESSAGES ={
  emptyFields: "All fileds must be filled",
  passwordRules: "Passwords must be same and have 8 to 16 characters long",
  otherRules: "Email and nick name must be 3 to 24 charactes long",
}

const SignUpFormBase = props => {

  const [registrationData,
    setRegistrationData] = useState(INITIAL_REGISTATION_DATA_STATE)

  const [passwordCheck,
    setPasswordCheck] = useState(INITAL_CHECK_PASSWORD_STATE)

  const [error,
    setError] = useState({error: null})

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = () => {
    const validationState = {
      isValid: false,
      message: null
    }
    for (let key in registrationData) {
      if (!registrationData[key].value)
      {
        validationState.message = VALIDATION_MESSAGES.emptyFields;
        return validationState;
      }
    }
    if (!passwordCheck.valid)
    {
      validationState.message = VALIDATION_MESSAGES.passwordRules;
      return validationState
    }
    for (let key in registrationData) {
      if (!registrationData[key].valid)
      {
        validationState.message = VALIDATION_MESSAGES.otherRules;
        return validationState;
      }
      }
    validationState.isValid = true;
    return validationState;
  }

  const onSubmit = (event) => {
    const validationValue = isFormValid();
    if (validationValue.isValid) {
      setIsLoading(true);
      let money = 500;
      // props
      //   .firebase
      //   .gameBaseValues()
      //   .on('value', snapshot => {
      //     const gameData = snapshot.val();
      //     if (gameData) {
      //       money = gameData.startMoney;
      //     }
      //   });
      // if (money) {
        props
          .firebase
          .doCreateUserWithEmailAndPassword(registrationData.emial.value, registrationData.password.value)
          .then(authUser => {
            const email = registrationData.emial.value;
            const username = registrationData.nickname.value;
            props
              .firebase
              .user(authUser.user.uid)
              .set({username, email, money});
            props
              .history
              .push(ROUTES.GAME);
          })
          .catch(error => {
            setError(getErrorMessageFromCode(error.code));
            setIsLoading(false);
          });
      // }
        setIsLoading(false);
    } else {
      setError({message: validationValue.message});
    }
    event.preventDefault();
  }

  const onChange = (event, controlName) => {
    const updatedControls = {
      ...registrationData,
      [controlName]: {
        ...registrationData[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, registrationData[controlName].validation),
        toutched: true
      }
    }
    setRegistrationData(updatedControls)
  };

  const passwordCheckHandler = (event) => {
    const updatedControl = {
      ...passwordCheck,
      value: event.target.value,
      valid: checkStringEquality(event.target.value, registrationData.password.value) && checkValidity(event.target.value, registrationData.password.validation),
      toutched: true
    }
    setPasswordCheck(updatedControl)
  }

  const formElementsArray = [];
  for (let key in registrationData) {
    formElementsArray.push({id: key, config: registrationData[key]})
  }

  let inputs = formElementsArray.map(formElement => (<Input
    key={formElement.id}
    elementType={formElement.config.elementType}
    elementConfig={formElement.config.elemetConfig}
    value={formElement.config.value}
    invalid={!formElement.config.valid}
    toutched={formElement.config.toutched}
    changed={(event) => onChange(event, formElement.id)}/>))

  let checkPasswordInput = <Input
    key={passwordCheck}
    elementType={passwordCheck.elementType}
    elementConfig={passwordCheck.elemetConfig}
    value={passwordCheck.value}
    invalid={!passwordCheck.valid}
    toutched={passwordCheck.toutched}
    changed={(event) => passwordCheckHandler(event, passwordCheck)}/>

  return (
    <React.Fragment>
      {isLoading? <Spinner/> :  <form onSubmit={onSubmit}>
        <h2>SignUp</h2>
        {inputs}
        {checkPasswordInput}
        <button type="submit">Sign Up</button>
        {error && <div className={style.errorContainer}> <p className={style.error}>{error.message}</p></div>}
      </form>}
    </React.Fragment>
  );
}
const SignUpLink = () => (
  <p className={style.link}>
    Don't have an account?
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};