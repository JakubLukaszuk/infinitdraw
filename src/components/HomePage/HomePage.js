import React, {useState, useEffect} from 'react';
import {withAuthorization, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import Spinner from '../UI/Spinner/Spinner';
import style from './HomePage.module.sass';
import {ResetPasswordButton} from '../PasswordForget'

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
  const [bestPlayers , setBestPlayers] = useState([]);
  const [userEmail , setUserEmail] = useState('');


  useEffect(() => {
    const bestUsers = [];
    setLoading(true);
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
    setBestPlayers(bestUsers)
    data
      .firebase
      .user(data.authUser.uid)
      .on('value', snapshot => {
        const userData = snapshot.val();
        if (userData) {
          setMoney(userData.money);
          setUserName(userData.username);
          setUserEmail(data.authUser.email);
          setLoading(false)
        } else {
          setLoading(false)
          console.log("error");
        }
      });
  }, []);


  const compareMoney = (a, b) => {
    if (a.money > b.money)
      return -1;
    if (b.money > a.money)
      return 1;
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
    {loadnig ? <Spinner/> : [<div key = '0' className={[style.userData, style.topSpace].join(' ')}>
    <div>
      <h2>
        {userName}
      </h2>
      <p>
        email: {userEmail}
      </p>
      <p>
        Money: {money}$
      </p>
      <button onClick={resetGame()}>Restat Game</button>
      <ResetPasswordButton email = {props.authUser.email}/>
    </div>
  </div>,
  <div key='1' className={style.topSpace}>
    <h3>Top 10 players:</h3>
    <ul>{bestPlayers.map((userData, i) => (
        <li key= {i}>{i + 1}. {userData.nick}
          {userData.money}$</li>
      ))}</ul>
  </div>]}
    </div>
  );
}

const BaseHome = withFirebase(home);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
