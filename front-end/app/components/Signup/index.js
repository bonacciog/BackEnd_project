import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles'

class Signup extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.parent}>
                <View style={styles.customAvatar}>
                    <Image
                        style={{ resizeMode:'contain', flex:1 }}
                        source={require('../../assets/images/logo.png')}
                    />
                </View>
                <View style={styles.customSignup}>
                    <TextInput style={styles.input} placeholder="Nome"  />
                    <TextInput style={styles.input} placeholder="Cognome" />
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Other info..." />
                    <TextInput style={styles.input} placeholder="Other info..." />
                    <TextInput style={styles.input} placeholder="Other info..." />
                    
                </View>
                <View style={styles.customBottom}>
                    <TouchableOpacity
                        style={[styles.button,styles.signupButton]}
                    >
                        <Text style={[styles.signupText,styles.heading]}> SIGN UP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Signup