import React from 'react';
import classes from './Test.module.sass';

import PizzaImg from '../../assets/pizza.jpg';

const test = () => {
  return (
    <div className = {classes.testImg}>
      <p className={classes.test}>Test componet</p>
    </div>
  )
}

export default test;