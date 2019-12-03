import React from 'react'
import style from './RollFrames.module.sass';
import RollFrame from '../RollFrame';
import {connect} from 'react-redux';


const rollFrames = props => {

  const createRolls = () => {
    console.log(props.rollsAmout);
    let rolls = []
    // Outer loop to create parent
    for (let i = 0; i < props.rollsAmout; i++) {
      rolls.push(<RollFrame key={i}/>);
      }
    return rolls
  }

  return (
    <div>
      {createRolls()}
    </div>
  );
}

const mapStateToProps = state => {
    return {
      rollsAmout: state.gameReducer.rollsAmout
    }
}

export default(connect(mapStateToProps, null)(rollFrames));