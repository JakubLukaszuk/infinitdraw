import React from 'react';
import {AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import PasswordChangeForm from '../ChangePassword';
import {PasswordForgetForm} from '../PasswordForget';

import {compose} from 'recompose';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <PasswordChangeForm/>
        <PasswordForgetForm/>
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(AccountPage);