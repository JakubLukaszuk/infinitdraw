import React, {useState, useEffect} from 'react'
import style from './RollFrame.module.sass';
import clsx from 'clsx';


const rollFrame = props => {
  const data = {
    ...props
  };
  const [isOpening,
    setIsOpening] = useState(false);
  const [openingClass, setOpeningClass] =useState('');

  useEffect(() => {
    if (data.isAnimationAllowed) {
        if (data.index === 0) {
            setOpeningClass(style.opening1)
        }
        else if (data.index === 1) {
            setOpeningClass(style.opening2)
        }
        else if (data.index ===2) {
            setOpeningClass(style.opening3)
        }
        else if (data.index === 3) {
            setOpeningClass(style.opening4)
        }
        else {
            setOpeningClass(style.opening5)
        }
      setIsOpening(true)
        setTimeout(() => {setIsOpening(false), console.log(isOpening);
        data.toggleAnimation();
      },  (data.index + 1) * 1000)
    }
  }, [data.isAnimationAllowed]);


  return (
    <div className={style.frame} key ={data.key}>
      <div
        className={[
        style.standardBG, style.roll, isOpening
          ? `${openingClass}`
          : ''
      ].join(' ')}/>
    </div>
  );
}

export default rollFrame;