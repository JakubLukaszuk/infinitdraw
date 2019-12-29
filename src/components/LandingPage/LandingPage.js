import React from 'react';
import style from './LandingPage.module.sass';

const Landing = () => (
  <div className = {style.wrapper}>
    <div className = {style.head}>
      <h1 className={style.neon}>
        Infinidraw
      </h1>
    </div>
  </div>
);

export default Landing;