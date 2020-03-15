import React from 'react';
import style from './DisplayPanel.module.sass';

const DisplayPanel = (props) => {
    return (
        <div className = {style.displayPanel}>
            <p className = {props.isRolling ? style.loading : ''}>{props.isRolling ? 'Spinning' : props.text}</p>
        </div>
    );
};

export default DisplayPanel;