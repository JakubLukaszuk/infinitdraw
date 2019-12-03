import React from 'react';

import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import SignUpPage from '../../components/SignUpForm/SignUpForm';
import SignInPage from "../../components/SignInForm/SignInForm";
import Aux from '../../hoc/Auxlary/Axulary';
import Navigation from '../../components/Navigation/Navigation';

const Layout = props => {

    return (
      <Aux>
        <Navigation/>
        <RollFrames />
        <SignUpPage/>
        <SignInPage/>
      </Aux>
    );


}
export default Layout;