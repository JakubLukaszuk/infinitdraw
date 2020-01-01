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
  <NavItem link = {ROUTES.HOME}>Home</NavItem>
  <NavItem link = {ROUTES.ACCOUNT}>Account</NavItem>
  <NavItem link = {ROUTES.GAME}>Game</NavItem>
    <li>
      <SignOutButton/>
    </li>
  </ul>
);
const NavigationNonAuth = () => (
  <ul className = {style.navigationItems}>
  <NavItem link = {ROUTES.LANDING} exact>Home</NavItem>
  <NavItem link = {ROUTES.SIGN_IN}>Sign in</NavItem>
  <NavItem link = {ROUTES.SIGN_UP}>Sign Up</NavItem>
  </ul>
);
export default navigationItems;