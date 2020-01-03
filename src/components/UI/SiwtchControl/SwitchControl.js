import React, {Component} from 'react';

import style from './SwitchControl.module.sass'

class SwitchControl extends Component {
//not working with dumb component
//try to find out way to make this component dumb
  render() {

    return (
      <div className = {style.bidOption}>
          <input
            checked={this.props.checked}
            onChange={this.props.changed}
            type="radio"/>
                    <label>
        {this.props.label}
        </label>
        <div className = {style.bidOptionInside}/>
      </div>
    );

  }
}

export default SwitchControl;