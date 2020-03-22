import React from 'react';
import classes from './ArrowButtob.module.sass';

const arrowButton = (props) => {

  return (
    <button
      className={classes.ArrowButton}
      style={{
      backgroundColor: props.buttonColour,
      width: props.radius,
      height: props.radius,
      left: props.left,
      top: props.top
    }}
      onClick={props.clicked}>
      <i
        className={[
        classes.Arrow,
        classes[props.arrowType]
      ].join(' ')}
        style={{
        backgroundColor: props.arrowColor
      }}/>
    </button>
  );
}

export default arrowButton;
