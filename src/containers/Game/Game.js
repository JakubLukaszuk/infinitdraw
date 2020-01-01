import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withAuthorization, withEmailVerification, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';

import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';

import * as actions from '../../store/actions/index';

const ERROR_INIRIAL_STATE = null;
const LOADING_INITIAL_STATE = false;

const mapStateToProps = state => {
  return {money: state.gameReducer.money, amoutOfRolls: state.gameReducer.rollsAmout}
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAmoutOfRolls: (amoutOfRolls) => dispatch(actions.setAmoutOfRolls(amoutOfRolls)),
    onSetMoney: (money) => dispatch(actions.setMoney(money))
  };
}

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

  useEffect(() => {
    console.log(props.amoutOfRolls);
    console.log(props);
    props
      .firebase
      .user(props.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
            props.onSetAmoutOfRolls(userData.rolls);
            props.onSetMoney(userData.money);
        } else {
          console.log("error");
        }
      });
  }, []);

  return (
    <div>
      <RollFrames/>
    </div>
  );
}

const BaseGame = connect(mapStateToProps, mapDispatchToProps) (withFirebase(game));
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Game);
