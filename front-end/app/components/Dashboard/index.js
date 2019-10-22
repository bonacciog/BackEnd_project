import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class Dashboard extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        mode: 'modal',
        title: 'Zack',
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

    render() {
        return(
            <View style={styles.parent}>
                <Text style={styles.heading}> Hello Zac! </Text>
            </View>
        );
    }
}

export default Dashboard