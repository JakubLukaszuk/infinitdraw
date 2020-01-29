import React from 'react';
import SwitchControl from '../UI/SiwtchControl/SwitchControl';
import styles from './BidPanel.module.sass';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import DispalyPanel from '../../components/UI/DisplayPanel/DisplayPanel';
import {useState, useEffect} from 'react'

const bidPanel = (props) => {

  const bidSelected = (bid) =>{
    props.setPanelText('Your bid: $'+ bid);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bidButtons}>
        <DispalyPanel text = {props.panelTxt} isRolling = {props.isRolling}/>
        {props
          .avaliableBids
          .map((bidOption, i) => (<SwitchControl
            key={bidOption}
            label={bidOption}
            anotiation = {'$'}
            checked=
            {bidOption == props.bid ? true: false}
            changed=
            {() =>   {props.changed(bidOption), bidSelected(bidOption)}}/>))}
      </div>
      <button className={styles.drawButton} onClick ={props.start}>
        DRAW
      </button>
    </div>
  );
};


export default bidPanel;