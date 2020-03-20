import React from 'react';
import style from './LandingPage.module.sass';
import TextFrame from '../UI/TextFrame/TextFrame'

const Landing = () => (
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
    </div>
    <div className={style.gameInfo}>
      <div className ={style.textContainer}>
        <TextFrame title="About game">
          Infini draw is amazing slot machine game type. You can play on phone or
          computer. Just needed Internet browser.
        </TextFrame>
      </div>
    </div>
  </div>
);

export default Landing;