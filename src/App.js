import React,{ Component } from 'react';
import Layout from '../src/containers/Layout/Layout';
import {Router, Route} from 'react-router-dom';
import Navigation from '../src/components/Navigation/Navigation';
import { withAuthentication } from './components/Session';


const App = () => (
      <div>
        <Navigation />
        <Layout/>
      </div>
  );
  export default withAuthentication(App);