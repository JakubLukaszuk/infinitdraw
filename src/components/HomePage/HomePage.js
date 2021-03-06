import React, {useState, useEffect} from 'react';

import {withAuthorization, AuthUserContext} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import Spinner from '../UI/Spinner/Spinner';
import style from './HomePage.module.sass';
import {ResetPasswordButton} from '../PasswordForget';
import {getErrorMessageFromCode} from '../../shared/errorMessage';
import MessageBox from '../UI/MessageBox/MessageBox';
import BackDrop from '../UI/BackDrop/BackDrop';

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
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showBidValuesDialog, setShowBidValuesDialog] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);

  useEffect(() => {
    const newBestUsers = [];
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
              newBestUsers.push({nick: userData[key].username, money: userData[key].money})
            }
          }
          newBestUsers.sort((a, b) => {
            if (a.money > b.money)
              return -1;
            if (b.money > a.money)
              return 1;
            return 0;
          });
        } else {
          setError({message: "unknown Error"})
        }
      });
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
          setLoading(false);
        }
      });
      setBestPlayers(newBestUsers);
  }, []);


  const resetGame = () => {
    data
      .firebase
      .user(data.authUser.uid)
      .update({money: 500})
      .then(() => data.firebase.user(data.authUser.uid))
      .then(snapshot => snapshot.val())
      .catch(error => (getErrorMessageFromCode(error.code)));
      refreshPage();
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleCloseEmialDialog = () =>
  {
    setShowEmailDialog(false);
    handleHideBackDrop();
  }

  const handleCloseBidValuesDialog = () =>
  {
    setShowBidValuesDialog(false);
    handleHideBackDrop();
  }

  const handleHideBackDrop = () =>{
    setShowBackDrop(false);
    setShowBidValuesDialog(false);
    setShowEmailDialog(false);
  }

  const handleOpeneEmialDialog = () =>
  {
    setShowEmailDialog(true);
    handleOpenBackDrop();
  }

  const handleOpenBidValuesDialog = () =>
  {
    setShowBidValuesDialog(true);
    handleOpenBackDrop();
  }

  const handleOpenBackDrop = () =>{
    setShowBackDrop(true);
  }


  return (
    <div className={style.home}>
      <BackDrop show = {showBackDrop} clicked = {handleHideBackDrop} />
      <MessageBox show={showEmailDialog} onClose ={handleCloseEmialDialog} title='Reset password'>
        Restart form has been send to: {userEmail}
      </MessageBox>
      <MessageBox show={showBidValuesDialog} onClose = {handleCloseBidValuesDialog} title='Bid values'>
        Three diferent cards: x1.5
        {<br/>}
        Cherries: x3
        {<br/>}
        Lemons: x4
        {<br/>}
        Arows: x1
        {<br/>}
        GoldBars: x8
        {<br/>}
        Dolar: x12
      </MessageBox>

    <div className = {[style.wave, style.left].join(' ')}/>
    <div className = {[style.wave, style.right].join(' ')}/>
    {loadnig ? <Spinner/> : [<div key = '0' className={[style.userData, style.topSpace].join(' ')}>
      <h2>
        {userName}
      </h2>
      <p>
        email: {userEmail}
      </p>
      <p>
        Money: ${money}
      </p>
      {error && <p className = {style.error}>{error.message}</p>}
      <button onClick={resetGame} className = {style.restart}>Restart Game</button>
      <button onClick={handleOpenBidValuesDialog} className={style.bidValue}>Show bid values</button>
      <ResetPasswordButton email = {props.authUser.email} additionaOnClick = {handleOpeneEmialDialog}/>
  </div>,
  <div key='1' className={[style.topSpace, style.table].join(' ')}>
    <h3>Top 10 players:</h3>
    <ul>{bestPlayers.map((userData, i) => (
        <li key= {i}>{i + 1}. {userData.nick} ${userData.money}</li>
      ))}</ul>
  </div>]}
    </div>
  );
}

const BaseHome = withFirebase(home);
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
