import React from 'react';
import styles from './Layout.module.sass';
import RollFrames from '../../components/UI/RollFrame/RollFrames/RollFrames';
import Aux from '../../hoc/Auxlary/Axulary'


const Layout = props => {

    return (
      <Aux>
        <RollFrames rollAmout = {2} />
      </Aux>
    );


}
export default Layout;