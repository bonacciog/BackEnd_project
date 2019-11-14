/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

/*
 * REDUX
 */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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
import ChallengeRequest from './app/components/ChallengeRequest';
import ChallengeRecap from './app/components/ChallengeRecap';
import ChallengeQuestion from './app/components/ChallengeQuestion';

/*  
 * REDUX INITIALIZATION
 */
const initialState = {
  Key: '',
  UserID: '',
  UserList: [],
  TopicList: [],
  Challenge: {}
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_KEY':
      return {
        UserID: state.UserID,
        Key: action.payload.Key,
        UserList: state.UserList,
        TopicList: state.TopicList,
        Challenge: state.Challenge
      }
    case 'SAVE_USER_ID':
      return {
        Key: state.Key,
        UserID: action.payload.UserID,
        UserList: state.UserList,
        TopicList: state.TopicList,
        Challenge: state.Challenge
      }
    case 'SAVE_USER_LIST':
      return {
        Key: state.Key,
        UserID: state.UserID,
        UserList: action.payload.UserList,
        TopicList: state.TopicList,
        Challenge: state.Challenge
      }
    case 'SAVE_TOPIC_LIST':
      return {
        Key: state.Key,
        UserID: state.UserID,
        UserList: state.UserList,
        TopicList: action.payload.TopicList,
        Challenge: state.Challenge
      }
    case 'SAVE_CHALLENGE':
      return {
        Key: state.Key,
        UserID: state.UserID,
        UserList: state.UserList,
        TopicList: state.TopicList,
        Challenge: action.payload.Challenge
      }
    default:
      return state
  }
}
const store = createStore(reducer);

const RootStack = {

  cover: { screen: Cover },
  firstPage: { screen: FirstPage },
  login: { screen: Login },
  home: { screen: Home },
  challengeTopic: { screen: ChallengeTopic },
  challengeTopicProgrammingTools: { screen: ChallengeTopicProgrammingTools },
  challengeUserSelection: { screen: ChallengeUserSelection },
  waitingRival: { screen: WaitingRival },
  challengeRequest: { screen: ChallengeRequest },
  challengeRecap: {screen: ChallengeRecap},
  challengeQuestion: {screen: ChallengeQuestion}

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
      <Provider store={store}>
        <AppContainer />
      </Provider>

    </>
  );
};

export default App;
