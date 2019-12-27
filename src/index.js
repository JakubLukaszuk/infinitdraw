import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Firebase from './components/Firebase/firebase';
import {FirebaseContext} from './components/Firebase';
import * as serviceWorker from './serviceWorker';
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
      <FirebaseContext.Provider value={new Firebase()}>
        <App/>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </Provider>

);

ReactDom.render(app, document.getElementById('root'));

serviceWorker.unregister();
