import React from 'react';
import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import {PasswordForgetForm} from '../PasswordForget';
import PasswordChangeForm from '../ChangePassword';

import {compose} from 'recompose';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <PasswordForgetForm/>
        <PasswordChangeForm/>
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(AccountPage);