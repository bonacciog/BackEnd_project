import React, { Component } from 'react'
import { 
        View,
        Text,
        ImageBackground,
        TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Timer } from 'react-native-stopwatch-timer';

import styles from './styles'

class ChallengeQuestion extends Component{

    constructor(props){
        super(props)

        this.state = {
            isTimerStart: false,
            isStopwatchStart: false,
            timerDuration: 20000,
            resetTimer: false,
            resetStopwatch: false,
        }
        this.currentTime = 0
        
    }

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }

    componentDidMount(){       
        this.setState({
            timerDuration: 25000
        })
        this.startStopTimer = this.startStopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.resetTimer()
        this.startStopTimer()
    }

    /* *************** Timer functions ***************** */
    startStopTimer() {
        this.setState({
          isTimerStart: !this.state.isTimerStart,
          resetTimer: false,
        });
    }

    resetTimer() {
        this.setState({ isTimerStart: false, resetTimer: true });
    }
    /* ************************************************** */
    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageWaiting.jpg')}
                style = {{flex:1}}
            >
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:3, justifyContent:'center',paddingLeft:10}}>
                        <Text style={{fontSize:20, color:'#005c0c', fontWeight:'bold'}}>Round {JSON.stringify(this.props.navigation.getParam('idQuestion', 'none'))}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:2,alignItems:'center',marginRight:5,borderRadius:30}}>
                            
                        </View>
                        <View style={{flex:3}}>
                            <Icon reverse name="hourglass-half" size={30} color="#ebed85"/>
                        </View>
                            

                    </View>
                </View>
                <View style={{flex:4}}>
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Quanto è terrone Giovanni Bonaccio ?</Text>
                    </View>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Tanto</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Troppo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Poco</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Cos'è un terrone</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            
        );
    }
}

const handleTimerComplete = () => alert('OUT OF TIME');

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize:30,
    fontWeight:'bold',
    color:'#ebed85'
  },
}

export default ChallengeQuestion

/*
<Timer
                                totalDuration={20000}
                                secs
                                //Time Duration
                                start={this.state.isTimerStart}
                                //To start
                                reset={this.state.resetTimer}
                                //To reset
                                options={options}
                                //options for the styling
                                handleFinish={handleTimerComplete}
                            />
*/