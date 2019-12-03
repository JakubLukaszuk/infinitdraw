import React from 'react';

const input = (props) => {
    let inputElement = null;
    // const inputElementClasses = [classes.inputElement];
//                    className = {inputElementClasses.join(' ')}

    if(props.invalid && props.toutched){
        // inputElementClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case('input'):
            inputElement =(
                <input
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />);
             break;
        case('textarea'):
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />);
              break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
              />;
    }
    return(
        <div >
            <label >
            {props.label}</label>
            {inputElement}
        </div>);
};

export default input;