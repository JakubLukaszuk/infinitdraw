import React from 'react';
import DrawerToggler from './SideDrawer/DrawerToggle/DrawerToggler';
import NavigationItems from './NavigationItems/NavigationItems';
import style from './Navigation.module.sass';

import { AuthUserContext } from '../Session';

const Navigation = (props) => (
  <header className={style.navigation}>
  <DrawerToggler click = {props.openSideDrawer}/>
  <nav className = {style.desktopOnly}>
    <NavigationItems/>
  </nav>
</header>
);
export default Navigation;