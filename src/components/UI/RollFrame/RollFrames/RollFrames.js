import React, {useEffect, useState} from 'react'
import style from './RollFrames.module.sass';
import RollFrame from '../RollFrame';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';


const rollFrames = props => {

  const data = {...props};

  const [isAnimation, setIsAnimation] = useState(false);

  // useEffect(() => {
  //   if (data.rdToRoll) {
  //     data.setDrawArray(data.rollsAmout);
     
  //   }
  // }, [data.rdToRoll]);

  useEffect(() =>{
  if (data.rdToRoll) {
    console.log(data.drawArray);
    toggleAnimation()
    data.stopRoll();
  }
  }, [data.drawArray])

  const toggleAnimation = () =>{
    setIsAnimation(!isAnimation);
  }
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
    // console.log(props.rollsAmout);
    // console.log(props.money)
    let rolls = []
    // that.rollers[index].className = "roll";
    // that.rollers[index].classList.add(`opening${index+1}`);

    // that.startButton.setAttribute('disabled', true);

    // setTimeout(function () {
    //     that.rollers[index].classList.remove(`opening${index+1}`);
    //     that.rollers[index].classList.add(`goTo${results[index]}`);
    // }, (index + 1) * 1000);

    for (let i = 0; i < props.rollsAmout; i++) {
        const index =  i;
      rolls.push(<RollFrame key={i} isAnimationAllowed = {isAnimation} toggleAnimation = {toggleAnimation} index={index}/>);
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
  };
}

export default(connect(mapStateToProps, mapDispatchToProps)(rollFrames));