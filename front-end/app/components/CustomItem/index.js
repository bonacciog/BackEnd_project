import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

class CustomItem extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style ={styles.listItem}>
                <View style={{flex:1, justifyContent:'center', paddingLeft:5}}>
                    <Text style={styles.id}>{this.props.id}</Text>
                </View>
                <View style={{flex:3}}>
                    <Image 
                        source = {require('../../assets/images/simoProfilePicture.jpeg')}
                        style = {{height:60,width:60,borderRadius:60}}
                    />
                </View>
                <View style={{flex:8, alignItems:'flex-start',}}>
                    <Text style={styles.titleListItem}>{this.props.title}</Text>
                    <Text style={styles.subtitleListItem}>{this.props.subtitle}</Text>
                </View>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text>{this.props.info} exp</Text>
                </View>
            </View>
        );
    }
}

export default CustomItem