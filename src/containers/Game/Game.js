import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import BidPanel from '../../components/BidPanel/BidPanel';

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
  const [error,
    setError] = useState(ERROR_INIRIAL_STATE);
  const [loadnig,
    setLoading] = useState(LOADING_INITIAL_STATE);
  const [money,
    setMoney] = useState(0);
  const [avalialbeBids,
    setAvalialbeBids] = useState([])

  useEffect(() => {
    props
      .firebase
      .user(props.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          props.onSetMoney(userData.money);
        } else {
          console.log("error");
        }
      });
  }, []);

  useEffect(() => {
    setMoney(props.money);

  }, [props.money]);

  useEffect(() => {
    setAvalialbeBids(props.aveilableBids);
    console.log(avalialbeBids);
  }, [props.aveilableBids]);

  return (
    <div>
      <RollFrames/>
      <section>
        <BidPanel
          avaliableBids={avalialbeBids}
          changed={props.setBid}
          setMoney={props.onSetMoney}
          bid={props.bid}/> {money}
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return {money: state.gameReducer.money, aveilableBids: state.gameReducer.aveilableBids, amoutOfRolls: state.gameReducer.rollsAmout, bid: state.gameReducer.bid}
}

const mapDispatchToProps = dispatch => {
  return {
    onSetMoney: (money) => dispatch(actions.setMoney(money)),
    setBid: (bid) => dispatch(actions.setBid(bid))
  };
}

const BaseGame = connect(mapStateToProps, mapDispatchToProps)(withFirebase(game));
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Game);
