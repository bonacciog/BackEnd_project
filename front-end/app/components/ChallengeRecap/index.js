import React, { Component } from 'react'
import {
        View,
        ImageBackground,
        TouchableOpacity,
        Text,
        Image
} from 'react-native';
import styles from './styles'

class ChallengeRecap extends Component{

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }
    constructor(props){
        super(props)
    }

    surrenderChallange = () => {

    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageWaiting.jpg')}
                style = {{flex:1}}
            >
                <View style={{flex:9}}>
                    <View style={{flex:2, flexDirection:'row'}}>
                        <View style={styles.avatarContainer}>
                            <Image 
                                source = {require('../../assets/images/avatarIcon.png')}
                                style = {styles.avatar}
                            />
                            <Text style={styles.title}>Simo</Text>
                        </View>
                        <View style={styles.score}>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>0</Text>
                            </View>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>-</Text>
                            </View>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>0</Text>
                            </View>
                        </View>
                        <View style={styles.avatarContainer}>
                            <Image
                                source = {require('../../assets/images/avatarIcon.png')}
                                style = {styles.avatar}
                            />
                            <Text style={styles.title}>Terrone</Text>
                        </View>
                    </View>    
                    <View style={styles.recapBoard}>

                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={_ => this.surrenderChallange()}
                        >
                        <Text style={styles.heading}> SURRENDER </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default ChallengeRecap