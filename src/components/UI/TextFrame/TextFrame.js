import React from 'react';
import classes from './TextFrame.css';

const textFrame = (props) =>{
    return(
        <div className = {[classes.Box,
        classes[props.frameType]].join(' ')} >
            <h3 className = {classes.Headline}>
                {props.title}
            </h3>
            <p className = {classes.Paragraph}>
                {props.children}
            </p>
        </div>
    );
}
export default textFrame;
