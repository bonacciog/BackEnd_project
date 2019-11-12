import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class Dashboard extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        mode: 'modal',
        //title: 'Zack',
        //header: null,
        transparentCard: true,
        cardStyle: {
            backgroundColor: 'black',
            opacity: 0.8
        },
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
                borderBottomWidth: 0,
                elevation: 0
            },
            headerTransparent: true
        } 
    }

    goToUserSelection(){
        this.props.navigation.navigate('userSelection',{IDTopic: this.props.navigation.getParam('IDTopic', 'none')})
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageDashboard.jpg')}
                style = {styles.parent}
            >
                <View style={styles.headerLine}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logoWhite.png')}
                    />
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button} onPress={_ => this.goToUserSelection()} >
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="database" size={30} color="#006622"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={styles.heading}>SQL</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="exclamation-triangle" size={30} color="gray"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={[styles.heading,{color:'gray'}]}>UNDER CONSTRUCTION</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="exclamation-triangle" size={30} color="gray"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={[styles.heading,{color:'gray'}]}>UNDER CONSTRUCTION</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="exclamation-triangle" size={30} color="gray"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={[styles.heading,{color:'gray'}]}>UNDER CONSTRUCTION</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="exclamation-triangle" size={30} color="gray"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={[styles.heading,{color:'gray'}]}>UNDER CONSTRUCTION</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                                <View style={styles.buttonContent}>
                                    <Icon reverse name="exclamation-triangle" size={30} color="gray"/>
                                </View>
                                <View style={styles.buttonHeader}>
                                    <Text style={[styles.heading,{color:'gray'}]}>UNDER CONSTRUCTION</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </ImageBackground>
        );
    }
}

export default Dashboard