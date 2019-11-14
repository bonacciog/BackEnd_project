import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

class WaitingRival extends Component{

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)
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
                <View style={{ flex: 2, alignItems:'center' }}>
                    <Image 
                        source = {require('../../assets/images/logo2.png')}
                        style={{flex:1,width:200,height:200}}
                    />
                </View>
                <View style={{flex:4, paddingLeft:25, paddingRight:25}}>
                    <Text style={styles.title}>YOU'RE KINDLY ASKED</Text>
                    <Text style={styles.title}>TO WAIT A MOMENT</Text>
                    <Text style={styles.subtitle}>YOUR RIVAL</Text>
                    <Text style={styles.subtitle}>MIGHT BE SCARED</Text> 
                </View>

                <View style={{flex:1}}>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={_ => this.retireChallenge()}
                        >
                        <Text style={styles.heading}> RETIRE CHALLENGE </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}></View>
            </ImageBackground>
            
        );
    }
}

export default WaitingRival