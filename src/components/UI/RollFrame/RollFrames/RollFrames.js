import React from 'react'
import style from './RollFrames.module.sass';
import RollFrame from '../RollFrame';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';


const rollFrames = props => {

  const createRolls = () => {
    console.log(props.rollsAmout);
    console.log(props.money)
    let rolls = []
    // Outer loop to create parent
    for (let i = 0; i < props.rollsAmout; i++) {
      rolls.push(<RollFrame key={i}/>);
      }
    return rolls
  }

  return (
    <div className = {style.rolls}>
      {createRolls()}
    </div>
  );
}

const mapStateToProps = state => {
    return {
      rollsAmout: state.gameReducer.rollsAmout,
      money: state.gameReducer.money,
      rdToRoll: state.gameReducer.rollMove
    }
}

const mapDispatchToProps = dispatch => {
  return {
    stopRoll: () => dispatch(actions.stopRoll())
  };
}

export default(connect(mapStateToProps, mapDispatchToProps)(rollFrames));