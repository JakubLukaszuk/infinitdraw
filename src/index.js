import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import gameReducer from './store/reducers/game';
import './global.sass';
import App from './App';

const rootReducer = combineReducers({
  gameReducer: gameReducer,
  //other reducers
})

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

);

ReactDom.render(app, document.getElementById('root'));
