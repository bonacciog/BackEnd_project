import React, { Component } from 'react'
import {
        View,
        Text,
        ImageBackground,
        TouchableOpacity
} from 'react-native';
import styles from './styles'


class ChallengeQuestion extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageWaiting.jpg')}
                style = {{flex:1}}
            >
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, justifyContent:'center',paddingLeft:10}}>
                        <Text style={{fontSize:20, color:'#005c0c', fontWeight:'bold'}}>Round {JSON.stringify(this.props.navigation.getParam('idQuestion', 'none'))}</Text>
                    </View>
                    <View style={{flex:1}}>
                    </View>
                </View>
                <View style={{flex:4}}>
                    <View style={styles.container}>
                        <Text style={styles.questionText}>Quanto è terrone Giovanni Bonaccio ?</Text>
                    </View>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Tanto</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Troppo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Poco</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container}>
                        <View>
                            <Text style={styles.questionText}>Cos'è un terrone</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            
        );
    }
}

export default ChallengeQuestion