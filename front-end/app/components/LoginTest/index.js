import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { REACT_APP_API_URL } from 'react-native-dotenv';

import styles from './styles'

class LoginTest extends Component{

    constructor(props){
        super(props)
        
    }

    state = {firstname: "", lastname: "", university:"", key: "", isLoading: false}

    setValue = async id => {
        try {
            AsyncStorage.setItem('userID', JSON.stringify(id))
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
    }

    checkLogin(){
        this.state.isLoading = true;
        const {firstname,lastname,university,key,isLoading} = this.state;
        process.env.
        fetch(REACT_APP_API_URL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'saveUser',
                User: {Firstname: firstname, Lastname: lastname, University: university, Key: key},
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    this.state.isLoading= false;
                    if(responseJson.error === undefined){
                        this.setValue(responseJson.UserID)
                        this.props.navigation.navigate('homeTest')
                    }else{
                        Alert.alert('Error',responseJson.error,[{
                            text:'Okay'
                        }])
                    }
                })
                .catch((error) =>{
                    Alert.alert('Error','Connection lost',[{
                        text:'Okay'
                    }])
        });

        
        //this.props.navigation.navigate('homeTest')
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