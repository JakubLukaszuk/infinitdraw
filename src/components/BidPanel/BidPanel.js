import React from 'react';
import SwitchControl from '../UI/SiwtchControl/SwitchControl';
import styles from './BidPanel.module.sass';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const bidPanel = (props) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.bidButtons}>
        <p>Bids</p>
        {props
          .avaliableBids
          .map((bidOption, i) => (<SwitchControl
            key={bidOption}
            label={bidOption}
            checked=
            {bidOption == props.bid ? true: false}
            changed=
            {() => props.changed(bidOption)}/>))}
      </div>
      <button className={styles.drawButton} onClick ={props.start}>
        DRAW
      </button>
    </div>
  );
};


export default bidPanel;