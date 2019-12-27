import React from 'react';
import { NavLink } from 'react-router-dom';

import sytyle from './NavigationItem.module.sass';

const navigationItem = (props) => (
    <li className = {sytyle.NavigationItem}>
        <NavLink
        to={props.link}
        exact = {props.exact}
        activeClassName = {sytyle.active}>
        {props.children}</NavLink>
    </li>
);

export default navigationItem;