import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import styles from './styles'


class FirstPage extends Component{

    constructor(props){
        super(props)
    }
    

    static navigationOptions = {
        header: null
    }

    componentDidMount(){

    }

    goToLogin() {
        this.props.navigation.navigate('login')
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
                    <View style={styles.details}>
                        <Text style={styles.title}>"Everyone needs a fantasy"</Text>
                        <Text style={styles.subtitle}>Therefore we thought that giving everyone the possibility to imagine a career path was a duty to respect</Text>
                        <Text style={[styles.subtitle,{fontWeight:'bold'}]}>We hope you'll enjoy this journey.</Text>
                        <Text style={styles.subtitle}>1001's team.</Text>
                    </View>
                    <View style={styles.customContent}>
                        <View style={styles.customLogin}>
                            
                            
                        </View>
                        <View style={styles.customBottom}>
                            <TouchableOpacity
                                style={[styles.button,styles.loginButton]}
                                onPress={_ => this.goToLogin()}
                            >
                                <Text style={[styles.loginText,styles.heading]}> GET STARTED </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  
            </SafeAreaView>        
        );
    }
}
export default FirstPage