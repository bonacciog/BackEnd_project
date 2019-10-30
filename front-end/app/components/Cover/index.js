import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import styles from './styles'

class Cover extends Component{

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }

    getMyValue = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value === "CAO"){
                console.log('Found')
                this.props.navigation.navigate("homeTest")
            }else{
                console.log('Not found')
                this.props.navigation.navigate("firstPageTest")
            }
        } catch(e) {
            // read error
            console.log('Not found')
        }
    }

    constructor(props){
        super(props)
        this.getMyValue("key")
    }    

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageCover.jpg')}
                style = {{flex:1}}
            >
            </ImageBackground>
        );
    }
}

export default Cover