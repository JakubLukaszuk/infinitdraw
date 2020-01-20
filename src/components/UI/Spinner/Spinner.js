import React from 'react';
import style from './Spinner.module.sass';

const Spinner = () => {
  return (
    <div className = {style.holder}>
      <div className = {[style.bar, style.left].join(' ')}></div>
      <div className = {[style.bar, style.top].join(' ')}></div>
      <div className = {[style.bar, style.right].join(' ')}></div>
      <div className = {[style.bar, style.bottom].join(' ')}></div>
    </div>

  );
};

export default Spinner;