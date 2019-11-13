import React, { Component } from 'react'
import { View, ImageBackground, Alert, Text, TouchableOpacity } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

const ws = require('../../src/socket')

import {connect} from 'react-redux'
//import styles from './styles'

class Cover extends Component{
    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }
    constructor(props){
        super(props)
        
    }
    
    getMyValues = async () => {
        const Key = 'a'//await AsyncStorage.getItem('key')
        const UserID = 'a' //await AsyncStorage.getItem('UserID')
        console.log('Key = ' + Key + ' UserID = ' + UserID)
        this.props.saveUserID(UserID)
        this.props.saveKey(Key)

        const request = {
            request : 'login', 
            UserID: UserID,
            key : JSON.parse(Key)
        }
        ws.send(JSON.stringify(request))
    }
    componentDidMount(){
        ws.onopen = () => {
            console.log('[Web Socket] opened')
            this.getMyValues()

       }

       ws.onmessage = (evt) => {
        console.log('[Web Socket] message - ' + evt.data)
        const message = JSON.parse(evt.data)
        if(message.error === undefined){
            switch (message.request){
                case 'challengeProposal':
                    console.log('Challenge request found')
                    this.props.navigation.navigate("challengeRequest")
                    break
                default:
                    console.log('Login validate')
                    this.props.navigation.navigate("homeTest")
                    break
            }
            
        }else{
            console.log('Not found')
            this.props.navigation.navigate("firstPageTest")
        }
        
       }
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

function mapStateToProps(state){
    return{
        receivedMessage : state.receivedMessage,
        Key : state.key,
        UserID : state.UserID

    }
}

function mapDispatchToProps(dispatch){
    return{
        saveKey : (key) => dispatch({type:'SAVE_KEY', payload:{Key: key}}),
        saveUserID : (userID) => dispatch({type:'SAVE_USER_ID',payload:{UserID: userID}}) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover)
