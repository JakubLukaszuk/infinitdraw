import React from 'react';

import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import SignUpPage from '../../components/SignUpForm/SignUpForm';
import Aux from '../../hoc/Auxlary/Axulary';


const Layout = props => {

    return (
      <Aux>
        <RollFrames />
        <SignUpPage/>
      </Aux>
    );


}
export default Layout;