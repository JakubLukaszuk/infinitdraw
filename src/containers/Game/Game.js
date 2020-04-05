import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withAuthorization, withEmailVerification, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import BidPanel from '../../components/BidPanel/BidPanel';
import Spinner from '../../components/UI/Spinner/Spinner';
import {getErrorMessageFromCode} from '../../shared/errorMessage';
import style from './Game.module.sass';

import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';

import * as actions from '../../store/actions/index';

const ERROR_INIRIAL_STATE = null;
const LOADING_INITIAL_STATE = false;
const BID_PANEL_INITIAL_STATE = 'Game Ready';

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
    setAvalialbeBids] = useState([]);
  const [bidPanelTxt, setBidPanelTxt] = useState(BID_PANEL_INITIAL_STATE);
  const [loseStrike,
    setLoseStrike] = useState(0);
  const [winStrike,
    setWinStrike] = useState(0);
  const [isDrawAllowed, setIsDrawAllowed] = useState(true);

  useEffect(() => {
    setLoading(true);
    data
      .firebase
      .user(data.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          data.onSetMoney(userData.money);
          setLoading(false)
        } else {
          setError({message:"unknown error"})
        }
      })
  }, []);

  useEffect(() => {
  setMoney(data.money);

  }, [data.money]);


  useEffect(() => {
    if (data.multipler > 0) {
      setTimeout(() => {
        setLoseStrike(0);
        setWinStrike(winStrike+1);
        const prize = data.bid * data.multipler;
        let moneyToSave = 0;
        if (winStrike == 5) {
          moneyToSave = data.money + prize * 2;
          setWinStrike(0);
          setBidPanelTxt("You win x2: $" + prize * 2);
        }
        else {
          moneyToSave = data.money + prize;
          setBidPanelTxt("You win: $" + prize);
        }
        setMoneyInAppAndDB(moneyToSave);
      }, (data.amoutOfRolls) * 1250);
    }
    if (data.multipler === 0) {
      setBidPanelTxt("You lose: $" + data.bid);
      setTimeout(() => {
        setWinStrike(0);
        setLoseStrike(loseStrike+1);
        let moneyToSave = 0;
        if (loseStrike == 5) {
          moneyToSave = data.money + data.bid * 2;
          setLoseStrike(0);
          setBidPanelTxt("You gain: $" + data.bid * 2);
          setMoneyInAppAndDB(moneyToSave);
        }
        else {
          setBidPanelTxt("You lose: $" + data.bid);
        }
      }, (data.amoutOfRolls) * 1250);
    }
  }, [data.drawArray]);

  useEffect(() => {
    setAvalialbeBids(data.aveilableBids);
  }, [data.aveilableBids]);


  const draw = () => {
    if (data.bid <= 0) {
      setBidPanelTxt('Set bid first');
    }
    else if (data.money <= data.bid) {
      setBidPanelTxt("You don't have enought money!");
    }
    else if (data.isRolling) {
      setBidPanelTxt('Machine is working!');
    }
    else if(isDrawAllowed)
    {
      setIsDrawAllowed(false);
      data.startRoll();
      data.setDrawArrayAndResults(data.amoutOfRolls);
      setMoneyInAppAndDB(data.money - data.bid)

    setTimeout(() => {
      if (!data.isRolling) {
        setBidPanelTxt(BID_PANEL_INITIAL_STATE);
      }
      setIsDrawAllowed(true)
    }, (data.amoutOfRolls) * 1800);
    }
}

  const setMoneyInAppAndDB = (moneyInput) =>{
    data.onSetMoney(moneyInput);

    data.firebase.user(data.authUser.uid).update({ money: moneyInput})
    .catch(error => ( setError(
      getErrorMessageFromCode(error.code))));
  }

  const setBidSecured = (bidValue) => {
    if (!data.isRolling) {
      data.setBid(bidValue);
    }
  }

  const setTxtInBidPanel = (txt) => {
    setBidPanelTxt(txt);
  }

  return (
  <div className = {style.wrapper}>
  <div className = {style.game}>
  {error && <p className = {style.error}>{error.message}</p>}
  {loadnig ? <Spinner/> : [    <RollFrames key='0'/>,
    <section key='1'>
      <BidPanel
        avaliableBids={avalialbeBids}
        changed={setBidSecured}
        start={draw}
        panelTxt = {bidPanelTxt}
        setPanelText = {setTxtInBidPanel}
        isRolling = {data.isRolling}
        bid={data.bid}
        loseStrike = {loseStrike}
        winStrike = {winStrike}/>
        <p className = {style.money}>Your money: ${money}</p>
    </section>]}
  </div>
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
