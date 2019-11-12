import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

class ChallengeRequest extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }

    acceptChallenge(){
        this.props.navigation.navigate('challengeRecap')
    }

    retireChallenge(){
        this.props.navigation.navigate('homeTest')
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageWaiting.jpg')}
                style = {styles.parent}
            >
                <View style={{flex:1}}>
                    <Image 
                        source = {require('../../assets/images/logo2.png')}
                        
                    />
                </View>
                <View style={{flex:4}}>
                    <Text style={styles.title}>Terrone</Text>
                    <Text style={styles.title}>is willing to challenge you</Text>
                    <Text style={styles.subtitle}>in Finance.</Text>
                    <Text style={styles.subtitle}>Do you dare accepting this challenge?</Text> 
                </View>

                <View style={{flex:1, flexDirection:'row'}}>
                    <TouchableOpacity
                            style={[styles.button,{backgroundColor:'green'}]}
                            onPress={_ => this.acceptChallenge()}
                        >
                        <Text style={styles.heading}> ACCEPT </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={_ => this.retireChallenge()}
                        >
                        <Text style={styles.heading}> REFUSE </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}></View>
            </ImageBackground>
        );
    }
}

export default ChallengeRequest