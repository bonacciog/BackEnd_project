import React, { Component } from 'react'
import { View, Text }  from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';

const Icomoon = createIconSetFromIcoMoon(icoMoonConfig);

class CustomIcon extends Component{

    constructor(props){
        super(props)
    }

    render() {
        return(
            <View>
                <Icomoon
                    name={this.props.name}
                    size={this.props.size}
                    color={this.props.color}
                />
            </View>
        );
    }
}

export default CustomIcon
