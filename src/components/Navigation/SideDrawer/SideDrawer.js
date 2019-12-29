import React from 'react';

import Backdrop from '../../UI/BackDrop/BackDrop';
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
    <Backdrop show = {props.open} clicked = {props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;