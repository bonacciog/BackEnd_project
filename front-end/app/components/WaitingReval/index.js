import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

class WaitingReval extends Component{

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
                <View style={{flex:1}}>
                    <Image 
                        source = {require('../../assets/images/logo2.png')}
                        
                    />
                </View>
                <View style={{flex:4}}>
                    <Text style={styles.title}>WAITING</Text>
                    <Text style={styles.title}>FOR YOUR REVAL</Text>
                    <Text style={styles.subtitle}>TO ACCEPT THE CHALLANGE</Text> 
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

export default WaitingReval