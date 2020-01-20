import React, {Component} from 'react';
import Layout from '../src/containers/Layout/Layout';
import {Router, Route, Switch} from 'react-router-dom';
import {withAuthentication} from './components/Session';
import {AuthUserContext} from './components/Session';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage/LandingPage';
import SignUpPage from './components/SignUpForm/SignUpForm';
import SignInPage from './components/SignInForm/SignInForm';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/HomePage/HomePage';
import AccountPage from './components/Account/AccountPage';
import Game from './containers/Game/Game';

const App = () => (
  <div>
    <Layout>
      <AuthUserContext.Consumer>
        {authUser => authUser
          ? <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage}/>
              <Route path={ROUTES.HOME} component={HomePage}/>
              <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
              <Route path={ROUTES.GAME} component={Game}/>
            </Switch>
          : <Switch>
            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
          </Switch>
}
      </AuthUserContext.Consumer>
    </Layout>

  </div>
);
export default withAuthentication(App);