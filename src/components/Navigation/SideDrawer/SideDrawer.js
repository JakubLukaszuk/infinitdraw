import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.sass';
import Aux from '../../../hoc/Auxlary/Axulary';

const sideDrawer = (props) => {
  let attachedClasses = [classes.sideDrawer, classes.close];
  if(props.open){
    attachedClasses = [classes.sideDrawer, classes.open];
  }
  return (
    <Aux>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <nav>
          <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;