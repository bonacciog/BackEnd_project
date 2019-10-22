import React, { Component } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles'

class Login extends Component{

    constructor(props){
        super(props)
    }

    state = {username: "", password: ""}

    checkLogin(){
        const {username,password} = this.state
        if(username == 'admin' && password == 'admin'){
            this.props.navigation.navigate('home')
        }else{
            Alert.alert('Error','Username/Password mismatch',[{
                text:'Okay'
            }])
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
                    <TextInput style={styles.input} placeholder="Username" onChangeText = { text => this.setState({ username: text }) } />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry = { true } onChangeText = { text => this.setState({ password: text }) } />
                    <TouchableOpacity
                            style={[styles.button,styles.loginButton]}
                            onPress={_ => this.checkLogin()}
                        >
                        <Text style={[styles.loginText,styles.heading]}> LOGIN </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }
}

export default Login