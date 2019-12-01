import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputElementClasses = [classes.inputElement];

    if(props.invalid && props.toutched){
        inputElementClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case('input'):
            inputElement =(
                <input
                    className = {inputElementClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />);
             break;
        case('textarea'):
            inputElement = (
                <textarea
                    className = {inputElementClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />);
              break;
        default:
            inputElement = <input
                className = {inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
              />;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.Label}>
            {props.label}</label>
            {inputElement}
        </div>);
};

export default input;