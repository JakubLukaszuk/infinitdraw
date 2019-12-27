import React from 'react';
import classes from './DrawerToggle.module.sass';

const hamburgerButton = (props) =>
(
  <div className={classes.haburgerButton} onClick={props.click}>
    <div className = {classes.bar}/>
    <div className = {classes.bar}/>
    <div className = {classes.bar}/>
  </div>
);

export default hamburgerButton;