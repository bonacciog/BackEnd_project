
import React, {Component} from 'react';
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
//import { Navigation } from 'react-native-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FirstPage from './app/components/FirstPage';
import Home from './app/components/Home';
import Login from './app/components/Login';
import Signup from './app/components/Signup';
import Dashboard from './app/components/Dashboard';
import Challenge from './app/components/Challenge';
import UserSelection from './app/components/UserSelection';
import FirstPageTest from './app/components/FirstPageTest';
import LoginTest from './app/components/LoginTest';
import HomeTest from './app/components/HomeTest';
import WaitingRival from './app/components/WaitingRival';
import Cover from './app/components/Cover';
import ChallengeRecap from './app/components/ChallengeRecap';

//import {socketReducer} from './app/src/reducers'

import {createStore} from 'redux';
import reduxWebsocket from 'react-redux-websocket';

import {Provider} from 'react-redux';
import ChallengeQuestion from './app/components/ChallengeQuestion';
import ChallengeRequest from './app/components/ChallengeRequest';


/*  *********** Redux initialization *************** */
const initialState = {
  receivedMessage : 'none',
  Key: '',
  UserID: ''
}
const reducer = (state = initialState, action) => {
  switch(action.type){
      case 'SAVE_KEY':
        return {UserID : state.UserID,Key : action.payload.Key}
      case 'SAVE_USER_ID':
        return {Key : state.Key,UserID : action.payload.UserID}
      case 'WS_SEND_MESSAGE':
          return {receivedMessage: action.payload}
      case 'WS_RECEIVE_MESSAGE':
          return {receivedMessage: action.payload}
      default:
          return state
  }
}
const store = createStore(reducer,);

/* *************************************************** */
const BottomTransition = (index,position,height) => {
  const sceneRange = [index-1, index];
  const outputHeight = [height,0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputHeight
  });

  return {
    transform: [{translateY: transition}]
  }
}

const NavigationConfig = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;

      return BottomTransition(index,position,height);
    }
  }
}

const RootStack = {
  firstPageTest: { screen: FirstPageTest },
  signup: { screen: Signup },
  login: { screen: Login },
  home: { screen: Home },
  dashboard: { screen: Dashboard },
  challenge: { screen: Challenge },
  challengeRecap:{screen: ChallengeRecap},
  userSelection: { screen: UserSelection },
  loginTest: {screen: LoginTest},
  homeTest:{screen: HomeTest},
  waitingRival:{screen: WaitingRival},
  cover:{screen: Cover},
  webSocket:{screen: WebSocket},
  challengeQuestion:{screen: ChallengeQuestion},
  challengeRequest:{screen: ChallengeRequest}

}

const NormalNavigator = createStackNavigator(
  RootStack,
  {
    initialRouteName: 'cover',
  },
  {
    transitionConfig: NavigationConfig
  }
)

const AppContainerNormal = createAppContainer(NormalNavigator)

export default class App extends Component {

  constructor(props){
    super(props)
  }
  
  render(){
      return(
          <Provider store = {store}>
             <AppContainerNormal />
          </Provider>
        )      
    
  }
}

