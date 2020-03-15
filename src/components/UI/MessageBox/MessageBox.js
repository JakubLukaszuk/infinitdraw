import React from 'react';
import Cross from "../Cross/Cross";
import classes from './MessageBox.module.sass';

const messageBox = (props) =>{

        return(
            <div className = {classes.MessageBox}
            style = {{
                transform: props.show
                  ? 'translateY(0)'
                  : 'translateY(-100bh)',
                display: props.show
                  ? 'block'
                  : 'none'
              }}>
                <Cross clicked = {props.onClose}
                 style ={{
                    left: '95%',
                    top: '0'
                 }}/>
                <b><p className = {classes.Title}>
                {props.title}</p></b>
                <br/>
                {props.children}
            </div>
        );
}

export default React.memo(messageBox);