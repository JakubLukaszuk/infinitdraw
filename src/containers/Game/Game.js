import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import BidPanel from '../../components/BidPanel/BidPanel';
import style from './Game.module.sass';

import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';

import * as actions from '../../store/actions/index';

const ERROR_INIRIAL_STATE = null;
const LOADING_INITIAL_STATE = false;

const Game = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (<BaseGame authUser={authUser}/>)}
    </AuthUserContext.Consumer>
  )

}

const game = props => {

  const data = {
    ...props
  };

  const [error,
    setError] = useState(ERROR_INIRIAL_STATE);
  const [loadnig,
    setLoading] = useState(LOADING_INITIAL_STATE);
  const [money,
    setMoney] = useState(0);
  const [avalialbeBids,
    setAvalialbeBids] = useState([])

  useEffect(() => {
    data
      .firebase
      .user(data.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          data.onSetMoney(userData.money);
        } else {
          console.log("error");
        }
      });
  }, []);

  useEffect(() => {
    setMoney(data.money);

  }, [data.money]);

  useEffect(() => {
    if (data.multipler > 0) {
      setTimeout(() => {
        data.onSetMoney(data.money + data.bid * data.multipler);
      }, (data.amoutOfRolls) * 1250)
    }
  }, [data.drawArray]);

  useEffect(() => {
    setAvalialbeBids(data.aveilableBids);
  }, [data.aveilableBids]);

  const draw = () => {
    if (data.bid > 0 && data.money >= data.bid && !data.isRolling) {
      data.startRoll();
      data.setDrawArrayAndResults(data.amoutOfRolls);
      data.onSetMoney(data.money - data.bid);

      data.firebase.user(data.authUser.uid).update({ money: data.money - data.bid})
      .then(() => data.firebase.user(data.authUser.uid))
      .then(snapshot => snapshot.val())
      .catch(error => ( setError({
        errorCode: error.code,
        errorMessage: error.message
    })));
  }}


  const setBidSecured = (bidValue) => {
    if (!data.isRolling) {
      data.setBid(bidValue);
    }
  }

  return (
    <div className = {style.game}>
      <RollFrames/>
      <section>
        <BidPanel
          avaliableBids={avalialbeBids}
          changed={setBidSecured}
          start={draw}
          bid={data.bid}/> {money}
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    money: state.gameReducer.money,
    aveilableBids: state.gameReducer.aveilableBids,
    amoutOfRolls: state.gameReducer.rollsAmout,
    bid: state.gameReducer.bid,
    multipler: state.drawReducer.multipler,
    isRolling: state.drawReducer.rollMove,
    drawArray: state.drawReducer.drawArray
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetMoney: (money) => dispatch(actions.setMoney(money)),
    setBid: (bid) => dispatch(actions.setBid(bid)),
    startRoll: () => dispatch(actions.startRoll()),
    setDrawArrayAndResults: (rollsAmout) => dispatch(actions.setDrawArrayAndResults(rollsAmout))
  };
}

const BaseGame = connect(mapStateToProps, mapDispatchToProps)(withFirebase(game));
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Game);
