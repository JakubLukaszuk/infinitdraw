import React from 'react';

import style from './BackDrop.sass';

const backdrop = (props) => (
    props.show ? <div className = {style.backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;