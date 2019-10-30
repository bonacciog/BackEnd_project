
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
import Challenge from './app/components/Challenge';
import UserSelection from './app/components/UserSelection';
import FirstPageTest from './app/components/FirstPageTest';
import LoginTest from './app/components/LoginTest';
import HomeTest from './app/components/HomeTest';
import WaitingReval from './app/components/WaitingReval';
import Cover from './app/components/Cover';

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

const RootStack = {
  firstPageTest: { screen: FirstPageTest },
  signup: { screen: Signup },
  login: { screen: Login },
  home: { screen: Home },
  dashboard: { screen: Dashboard },
  challenge: { screen: Challenge },
  userSelection: { screen: UserSelection },
  loginTest: {screen: LoginTest},
  homeTest:{screen: HomeTest},
  waitingReval:{screen: WaitingReval},
  cover:{screen: Cover}
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
          <AppContainerNormal />
        )      
    
  }
}

