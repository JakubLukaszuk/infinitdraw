import React from 'react';
import NavItem from '../NavigationItem/NavigationItem';
import SignOutButton from '../../SignOutButton/SignOutButton';
import * as ROUTES from '../../../constants/routes';

import style from './NavigationItems.module.sass';

import { AuthUserContext } from '../../Session';

const navigationItems = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser
        ? <NavigationAuth/>
        : <NavigationNonAuth/>
}
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = () => (
  <ul className = {style.navigationItems}>
  <NavItem link = {ROUTES.HOME}><b>Home</b></NavItem>
  <NavItem link = {ROUTES.ACCOUNT}><b>Account</b></NavItem>
    <li>
      <SignOutButton/>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul className = {style.navigationItems}>
  <NavItem link = {ROUTES.LANDING}><b>Landing</b></NavItem>
  <NavItem link = {ROUTES.SIGN_IN}><b>Sign in</b></NavItem>
  <NavItem link = {ROUTES.SIGN_UP}><b>Sign Up</b></NavItem>
  </ul>
);
export default navigationItems;