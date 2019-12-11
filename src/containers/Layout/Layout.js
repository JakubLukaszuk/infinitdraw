import React from 'react';

import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import SignUpPage from '../../components/SignUpForm/SignUpForm';
import SignInPage from "../../components/SignInForm/SignInForm";
import Aux from '../../hoc/Auxlary/Axulary';
import PasswordForget from '../../components/PasswordForget'
import Navigation from '../../components/Navigation/Navigation';
import ChangePassword from '../../components/ChangePassword/index';
import AccouontPage from '../../components/AccountPage/AccountPage';

const Layout = props => {

    return (
      <Aux>
        <RollFrames />
        <SignUpPage/>
        <SignInPage/>
        <AccouontPage/>
      </Aux>
    );


}
export default Layout;