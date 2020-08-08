import React from 'react';

import style from './Input.module.sass';

const input = (props) => {
  let inputElement = null;
  const inputElementClasses = [style.webflowInput];

  if (props.invalid && props.toutched) {
    // inputElementClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case('input'):
      inputElement = (
        <div className = {style.webflowInputFrame}>
          <input {...props.elementConfig} value={props.value} onChange={props.changed}
          className = {props.invalid && props.toutched ? [style.webflowInput, style.Invalid].join(' ') : style.webflowInput} /></div>
      );
      break;
    case('textarea'):
      inputElement = (<textarea
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>);
      break;
    default:
      inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed}/>;
  }
  return (
    <div >
      {inputElement}
    </div>
  );
};

export default input;