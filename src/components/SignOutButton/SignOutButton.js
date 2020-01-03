import React from 'react';
import { withFirebase } from '../Firebase';
import style from './SignOutButton.module.sass'

const SignOutButton = ({ firebase }) => (
  <button className = {style.signOutButton} type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);
export default withFirebase(SignOutButton);