import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withAuthorization, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import BidPanel from '../../components/BidPanel/BidPanel';
import style from './HomePage.module.sass';

import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';

import * as actions from '../../store/actions/index';

const ERROR_INIRIAL_STATE = null;
const LOADING_INITIAL_STATE = false;

const HomePage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (<BaseHome authUser={authUser}/>)}
    </AuthUserContext.Consumer>
  )

}

const home = props => {

  const data = {
    ...props
  };

  const [error,
    setError] = useState(ERROR_INIRIAL_STATE);
  const [loadnig,
    setLoading] = useState(LOADING_INITIAL_STATE);
  const [money,
    setMoney] = useState(0);
  const [userName,
    setUserName] = useState('');
  const [bestPlayers,
    setBestPlayers] = useState([]);
  const [isLoading,
    setIsLoading] = useState(true);

  useEffect(() => {
    data
      .firebase
      .user(data.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          setMoney(userData.money);
          setUserName(userData.username);
        } else {
          console.log("error");
        }
      });
  }, []);

  const fetchBestPlayers = () => {
    const bestUsers = [];
    data
      .firebase
      .users()
      .orderByChild("money")
      .limitToLast(10)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
              bestUsers.push({nick: userData[key].username, money: userData[key].money})
            }
          }
        } else {
          console.log("error");
        }
      });
      bestUsers.sort(compareMoney);
    return bestUsers
  }

  const compareMoney = (a, b) => {
    if (a.money > b.money) return -1;
    if (b.money > a.money) return 1;
    return 0;
  }

  const resetGame = () => {
    data
      .firebase
      .user(data.authUser.uid)
      .update({money: 500})
      .then(() => data.firebase.user(data.authUser.uid))
      .then(snapshot => snapshot.val())
      .catch(error => (setError({errorCode: error.code, errorMessage: error.message})));
  }

  return (
    <div className={style.home}>
      <div>
        <div>
          <h2>
            {userName}
          </h2>
          <p>
            Money {money}$
          </p>
        </div>
        <button onClick = {resetGame()}>Restat Game</button>
      </div>
      <ul>{fetchBestPlayers().map((userData, i) => (
          <li key={i}>{i+1}. {userData.nick} {userData.money}$</li>
        ))}</ul>
    </div>
  );
}

const BaseHome = withFirebase(home);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
