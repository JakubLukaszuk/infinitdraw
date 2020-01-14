import React, {useState} from 'react';

import styles from './Layout.module.sass';

import Aux from '../../hoc/Auxlary/Axulary';
import Navigation from '../../components/Navigation/Navigation';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const [isSideDrawerVisible,
    setIsSideDrawerVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false)
  }

  const sideDrawerOpenHander = () => {
    setIsSideDrawerVisible(!isSideDrawerVisible)
  }

  return (
    <Aux>
      <Navigation openSideDrawer={sideDrawerOpenHander}/>
      <SideDrawer open={isSideDrawerVisible} closed={sideDrawerClosedHandler}/>
      <div className = {styles.Layout}>
        {props.children}
      </div>
    </Aux>
  );

}
export default Layout;