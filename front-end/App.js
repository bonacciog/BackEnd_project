
import React, {Component} from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
//import { Navigation } from 'react-native-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FirstPage from './app/components/FirstPage';
import Home from './app/components/Home';
import Login from './app/components/Login';
import Signup from './app/components/Signup';
import Dashboard from './app/components/Dashboard';

//import { enableScreens } from 'react-native-screens';
//enableScreens();

const FadeTransition = (index,position) => {
  const sceneRange = [index-1, index];
  const outputOpacity = [0,1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });

  return {
    opacity: transition
  }
}

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

const RootStack = createStackNavigator(
  {
    firstPage: { screen: FirstPage },
    signup: { screen: Signup },
    login: { screen: Login },
    home: { screen: Home },
    dashboard: { screen: Dashboard }
  },
  {
    initialRouteName: 'firstPage',
  },
  {
    transitionConfig: NavigationConfig
  }
)

const AppContainer = createAppContainer(RootStack)

export default class App extends Component {
  render(){
    return(
     <AppContainer />
    )
  }
}

