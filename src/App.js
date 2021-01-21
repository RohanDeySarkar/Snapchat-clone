import React, { useEffect } from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import WebcamCapture from './components/WebcamCapture';
import Preview from './components/Preview';
import Chats from './components/Chats';
import ChatView from './components/ChatView';
import Login from './components/Login';

import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser} from './features/appSlice';
import { auth } from './firebase';

function App() {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login(
          {
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          }
        ))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      {!user? (
          <Login />
      ):(
        <>
          <img
            className="app__logo"
            src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
            alt=""
          />
          
          <div className="app__body">
            <Switch>
              <Route exact path="/">
                <WebcamCapture />
              </Route>
              <Route exact path="/chats">
                <Chats />
              </Route>
              <Route exact path="/chats/view">
                <ChatView />
              </Route>
              <Route exact path="/preview">
                <Preview />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
