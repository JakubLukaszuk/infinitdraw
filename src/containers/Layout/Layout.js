import React, {useState} from 'react';

import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import SignUpPage from '../../components/SignUpForm/SignUpForm';
import SignInPage from "../../components/SignInForm/SignInForm";
import Aux from '../../hoc/Auxlary/Axulary';
import PasswordForget from '../../components/PasswordForget'
import AccouontPage from '../../components/Account/AccountPage';
import HomePage from '../../components/HomePage/HomePage';
import Navigation from '../../components/Navigation/Navigation';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [isSideDrawerVisible,
    setIsSideDrawerVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false)
  }

  const sideDrawerOpenHander = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible)
  }

  return (
    <Aux>
      <Navigation openSideDrawer={sideDrawerOpenHander}/>
      <SideDrawer open={isSideDrawerVisible} closed={sideDrawerClosedHandler}/>
       {props.children}
    </Aux>
  );

}
export default Layout;