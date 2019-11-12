import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ws from '../../src/socket'
import { REACT_APP_API_URL } from 'react-native-dotenv';

import styles from './styles'

class LoginTest extends Component{

    constructor(props){
        super(props)
        
    }

    state = {firstname: "", lastname: "", university:"", key: "", isLoading: false}

    setValue = async (key,value) => {
        try {
            AsyncStorage.setItem(key, JSON.stringify(value))
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
    }

    checkLogin(){
        this.state.isLoading = true;
        const {firstname,lastname,university,key,isLoading} = this.state;

        const request = JSON.stringify({
            request: 'saveUser',
            User: {Firstname: firstname, Lastname: lastname, University: university},
            key: key
        })
        
        console.log(request)
        ws.send(request)

        //this.props.navigation.navigate('homeTest')
    }

    componentDidMount(){
        ws.onmessage = (evt) => {
            console.log('[Web Socket] Message received - ' + evt.data)
            const message = JSON.parse(evt.data)
            this.state.isLoading= false;
            if(message.error === undefined){
                this.setValue('UserID',message.UserID)
                this.setValue('key',this.state.key)
                this.props.navigation.navigate('homeTest')
            }else{
                Alert.alert('Error',message.error,[{
                    text:'Okay'
                }])
            }
        }
    }

    render() {
        return(
            <View style={styles.parent}>
                <View style={styles.customLogo}>
                    <Image
                        style={{ resizeMode:'contain', flex:1 }}
                        source={require('../../assets/images/logo.png')}
                    />
                </View>
                <View style={styles.customLogin}>
                    <TextInput style={styles.input} placeholder="NAME" onChangeText = { text => this.setState({ firstname: text }) } />
                    <TextInput style={styles.input} placeholder="SURNAME" onChangeText = { text => this.setState({ lastname: text }) } />
                    <TextInput style={styles.input} placeholder="UNIVERSITY" onChangeText = { text => this.setState({ university: text }) } />
                    <TextInput style={styles.input} placeholder="KEY" onChangeText = { text => this.setState({ key: text }) } />
                    <TouchableOpacity
                            style={[styles.button,styles.loginButton]}
                            onPress={_ => this.checkLogin()}
                        >
                        <Text style={[styles.loginText,styles.heading]}> START </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LoginTest