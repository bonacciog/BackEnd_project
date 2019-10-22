import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button, Image } from 'react-native';
import styles from './styles'

class FirstPage extends Component{

    static navigationOptions = {
        header: null
    }
    state = {username: "", password: ""}

    goToLogin(){
        this.props.navigation.navigate('login')
    }

    goToSignup(){
        this.props.navigation.navigate('signup')
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
                <View style={styles.customContent}>
                    <View style={styles.customSignup}>
                        <TouchableOpacity
                            style={[styles.button,styles.signupButton]}
                            onPress={_ => this.goToSignup()}
                        >
                            <Text style={[styles.signupText,styles.heading]}> SIGN UP </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.customLogin}>
                        <TouchableOpacity
                            style={[styles.button,styles.loginButton]}
                            onPress={_ => this.goToLogin()}
                        >
                            <Text style={[styles.loginText,styles.heading]}> LOGIN </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.customBottom}>

                    </View>
                </View>
            </View>          
        );
    }
}

export default FirstPage