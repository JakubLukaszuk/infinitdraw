import React, {useEffect, useState} from 'react'
import style from './RollFrames.module.sass';
import RollFrame from '../RollFrame';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';


const rollFrames = props => {

  const data = {...props};

  const [isAnimation, setIsAnimation] = useState(false);



  useEffect(() =>{
  if (data.rdToRoll) {
    console.log(data.drawArray);
    toggleAnimation();
    setTimeout(() => {
      data.stopRoll();

    }, (props.rollsAmout) * 1200)
  }
  }, [data.drawArray])

  const toggleAnimation = () =>{
    setIsAnimation(!isAnimation);
  }


  const createRolls = () => {
    let rolls = []
    for (let i = 0; i < props.rollsAmout; i++) {
        const index =  i;
      rolls.push(<RollFrame key={i} isAnimationAllowed = {isAnimation} toggleAnimation = {toggleAnimation} index={index} rollPosition={data.drawArray[i]}/>);
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
      rdToRoll: state.drawReducer.rollMove,
      drawArray: state.drawReducer.drawArray,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    stopRoll: () => dispatch(actions.stopRoll()),
  };
}

export default(connect(mapStateToProps, mapDispatchToProps)(rollFrames));