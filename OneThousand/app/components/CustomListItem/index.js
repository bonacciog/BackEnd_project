import React, { Component } from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

class CustomListItem extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.parent}>
                <View style={styles.icon}>
                    <Icon reverse name={this.props.iconName} size={25} style={{marginRight:20}} color={this.props.iconColor}/>
                </View>
                <View style={styles.title}>
                    <Text style={[styles.heading,{color:this.props.titleColor}]}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

export default CustomListItem