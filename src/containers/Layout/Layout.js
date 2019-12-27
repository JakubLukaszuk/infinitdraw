import React from 'react';

import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import SignUpPage from '../../components/SignUpForm/SignUpForm';
import SignInPage from "../../components/SignInForm/SignInForm";
import Aux from '../../hoc/Auxlary/Axulary';
import PasswordForget from '../../components/PasswordForget'
import AccouontPage from '../../components/Account/AccountPage';
import HomePage from '../../components/HomePage/HomePage';
import Navigation from '../../components/Navigation/Navigation';


const Layout = props => {

    return (
      <Aux>
        <Navigation/>
        {props.children}

      </Aux>
    );


}
export default Layout;