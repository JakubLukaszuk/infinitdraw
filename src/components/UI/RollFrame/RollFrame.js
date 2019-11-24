import React from 'react'
import style from './RollFrame.module.sass';

const rollFrame = props =>{
    return(
        <div className = {[style.standardBG, style.roll].join(' ')}>
        </div>
    );
}

export default rollFrame;