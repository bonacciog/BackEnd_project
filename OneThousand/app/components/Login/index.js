import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,SafeAreaView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles'
import WS from '../WS';

class Login extends Component{

    constructor(props){
        super(props)
        this.ws = []
        this.state = {
            firstname: "", 
            lastname: "", 
            university:"", 
            key: "", 
            isLoading: false
        }
    }

    

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
        this.setValue('Key',this.state.key)
        this.ws.send(request)

    }

    componentDidMount(){
        let webSocketController = new WS()
        this.ws = webSocketController.ws
    }

    render() {
        return(
            <SafeAreaView style={{flex:1}}>
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
            </SafeAreaView>
            
        );
    }
}

export default Login