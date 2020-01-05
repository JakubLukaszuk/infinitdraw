import React, {useState, useEffect} from 'react';
import SwitchControl from '../UI/SiwtchControl/SwitchControl';
import styles from './BidPanel.module.sass';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const bidPanel = (props) => {

  const start = () =>{
    if (!props.rdToRoll) {
      props.startRoll();
    }
  }

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
      <button className={styles.drawButton} onClick ={start}>
        DRAW
      </button>
    </div>
  );
};



const mapStateToProps = state => {
  return {rdToRoll: state.drawReducer.rollMove}
}

const mapDispatchToProps = dispatch => {
  return {
    startRoll: () => dispatch(actions.startRoll())
  }
};

export default(connect(mapStateToProps, mapDispatchToProps)(bidPanel));