import React, {useState, useEffect} from 'react'
import style from './RollFrame.module.sass';
import clsx from 'clsx';

const rollFrame = props => {
  const data = {
    ...props
  };

  const [isOpening,
    setIsOpening] = useState(false);
  const [isGoTo,
      setIsGoTo] = useState(false);
  const [openingClass,
    setOpeningClass] = useState('');
  const [goToClass,
    setGoToClass] = useState('');
  //animations
  const setOpeningAnimation = () => {
    if (data.index === 0) {
      setOpeningClass(style.opening1)
    } else if (data.index === 1) {
      setOpeningClass(style.opening2)
    } else if (data.index === 2) {
      setOpeningClass(style.opening3)
    } else if (data.index === 3) {
      setOpeningClass(style.opening4)
    } else {
      setOpeningClass(style.opening5)
    }
  }

  const setGoToClassAnimation = () => {
    if (data.rollPosition === 1) {
      setGoToClass(style.goTo1);
    } else if (data.rollPosition === 2) {
      setGoToClass(style.goTo2);
    } else if (data.rollPosition === 3) {
      setGoToClass(style.goTo3);
    } else if (data.rollPosition === 4) {
      setGoToClass(style.goTo4);
    } else if (data.rollPosition === 5) {
      setGoToClass(style.goTo5);
    } else if (data.rollPosition === 6) {
      setGoToClass(style.goTo6);
    } else if (data.rollPosition === 7) {
      setGoToClass(style.goTo7);
    } else if (data.rollPosition === 8) {
      setGoToClass(style.goTo8);
    } else if (data.rollPosition === 9) {
      setGoToClass(style.goTo9);
    } else if (data.rollPosition === 10) {
      setGoToClass(style.goTo10);
    } else if (data.rollPosition === 11) {
      setGoToClass(style.goTo11);
    } else {
      setGoToClass(style.goTo12);
    }
  }
  useEffect(() => {
    if (data.isAnimationAllowed) {
      setOpeningAnimation();
      setGoToClassAnimation();
      setIsGoTo(false);
      setIsOpening(true)

      setTimeout(() => {
        setIsOpening(false),
        setIsGoTo(true);
        data.toggleAnimation();
      }, (data.index + 1) * 1000)
      // setTimeout(() => {
      //   setIsGoTo(false);
      //   data.toggleAnimation();
      // }, 1000)
    }
  }, [data.isAnimationAllowed]);

  return (
    <div className={style.frame} key ={data.key}>
      <div
        className={[
        style.standardBG, style.roll, isOpening
          ? `${openingClass}`
          : ''
          , isGoTo
          ? `${goToClass}`
          : ''
      ].join(' ')}/>
    </div>
  );

}

export default rollFrame;