import React, { Component } from 'react'
import { View, ImageBackground, Alert } from 'react-native';
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
            fetch('http://127.0.0.1:3000',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    request: 'login',
                    key: value,
                  }),
            })
                .then((response) => response.json())
                    .then((responseJson) => {
                        this.state.isLoading= false;
                        if(responseJson.error === undefined){
                            console.log('Found')
                            this.props.navigation.navigate("homeTest")
                        }else{
                            console.log('Not found')
                            this.props.navigation.navigate("firstPageTest")
                        }
                    })
                    .catch((error) =>{
                        Alert.alert('Error','Connection lost',[{
                            text:'Okay'
                        }])
                        console.log('Not found')
            });

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