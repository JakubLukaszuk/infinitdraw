import React, {useEffect, useState} from 'react'
import style from './RollFrames.module.sass';
import RollFrame from '../RollFrame';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';


const rollFrames = props => {

  const data = {...props};

  useEffect(() => {
    if (data.rdToRoll) {
      data.setDrawArray(data.rollsAmout);
      data.stopRoll();
    }
  }, [data.rdToRoll]);

  useEffect(() =>{
    console.log(data.drawArray);
  }, [data.drawArray])
  //

  // const classes = useState( {
  //   active: ''
  // })
  // addActiveClass = (e) => {
  //     const clicked = e.target.id
  //     if(this.state.active === clicked) {
  //         this.setState({active: ''});
  //     } else {
  //         this.setState({active: clicked})
  //    }
  // }

  const createRolls = () => {
    console.log(props.rollsAmout);
    console.log(props.money)
    let rolls = []

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
      rdToRoll: state.drawReducer.rollMove,
      drawArray: state.drawReducer.drawArray
    }
}

const mapDispatchToProps = dispatch => {
  return {
    stopRoll: () => dispatch(actions.stopRoll()),
    setDrawArray: (rollsAmout) => dispatch(actions.setDrawArray(rollsAmout))
  };
}

export default(connect(mapStateToProps, mapDispatchToProps)(rollFrames));