import React from 'react';
import style from './LandingPage.module.sass';

const Landing = () => (
  <div className={style.wrapper}>
    <div className={style.head}>
      <div className = {style.neon}>
        <h1>
          Infinidraw
        </h1>
      </div>
      <h2>
        Try your luck!
      </h2>
    </div>
  </div>
);

export default Landing;