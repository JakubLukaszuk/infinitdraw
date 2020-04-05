import React from 'react';
import {withRouter} from 'react-router-dom';

import style from './LandingPage.module.sass';
import * as ROUTES from '../../constants/routes';
import TextFrame from '../UI/TextFrame/TextFrame';
import ArrowButton from '../UI/ArrowButton/ArrowButton';
import {AuthUserContext} from '../../components/Session';

const Landing = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (<LandingPageBase authUser={authUser}/>)}
    </AuthUserContext.Consumer>
  )
}

const LandingPage = (props) => {

  const scrollToBottom = () => {
    window.scrollTo({top: document.body.offsetHeight, behavior: 'smooth'})
  }

  const goToSignUp = () => {
    if (!props.authUser) {
      props
        .history
        .push(ROUTES.SIGN_UP);
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.head}>
        <div className={style.neon}>
          <h1>
            Infinidraw
          </h1>
        </div>
        <h2>
          Try your luck!
        </h2>
        <ArrowButton clicked={scrollToBottom} arrowType='down' top='80%'/>
      </div>
      <div className = {style.belowContainer}>
        <div className={style.gameInfo}>
          <div className ={style.textContainer}>
            <TextFrame title="About game">
              Infini draw is amazing slot machine game type. You can play on phone or
              computer. Just needed Internet browser.
            </TextFrame>
          </div>
        </div>
        <div className={style.signUp} onClick={goToSignUp}>
           Signup Here
        </div>
      </div>
    </div>
  )

};
const LandingPageBase = withRouter(LandingPage);

export default withRouter(Landing);