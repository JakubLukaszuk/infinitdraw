import React from 'react';

import style from './Cross.module.sass';

const cross = (props) => (
  <div
    disabled = {props.disabled}
    className={style.Cross}
    style = {props.style}
    onClick={props.clicked}>
</div>
);

export default cross;