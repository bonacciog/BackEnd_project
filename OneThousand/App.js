/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

/*
 * REDUX
 */
import {createStore} from 'redux';
import {Provider} from 'react-redux';
/*
 * NAVIGATION
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*
 * APP COMPONENTS
 */
import Cover from './app/components/Cover';
import FirstPage from './app/components/FirstPage';
import Login from './app/components/Login';
import Home from './app/components/Home';
import ChallengeTopic from './app/components/ChallengeTopic';
import ChallengeTopicProgrammingTools from './app/components/ChallengeTopicProgrammingTools';
import ChallengeUserSelection from './app/components/ChallengeUserSelection';
import WaitingRival from './app/components/WaitingRival';

/*  
 * REDUX INITIALIZATION
 */
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
      default:
          return state
  }
}
const store = createStore(reducer);

const RootStack = {

  cover:{screen: Cover},
  firstPage:{screen: FirstPage},
  login:{screen: Login},
  home:{screen: Home},
  challengeTopic:{screen: ChallengeTopic},
  challengeTopicProgrammingTools:{screen: ChallengeTopicProgrammingTools},
  challengeUserSelection:{screen: ChallengeUserSelection},
  waitingRival:{screen: WaitingRival}

}

const Navigator = createStackNavigator(
  RootStack,
  {
    initialRouteName: 'cover',
  }
)

const AppContainer = createAppContainer(Navigator)

const App = () => {
  return (
    <>
      <Provider store = {store}>
        <AppContainer />
      </Provider>
      
    </>
  );
};

export default App;
