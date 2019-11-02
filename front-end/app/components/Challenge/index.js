import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './styles'

import CustomListItem from '../CustomListItem';


class Challenge extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        //title: 'Zack',
        //header: null,
    }

    goToUserSelection(){
        this.props.navigation.navigate('userSelection')
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageDashboard.jpg')}
                style = {styles.parent}
            >
                <View style={styles.headerLine}>
                    <View style={{flex:1}}>
                        <Text style={styles.title}>YOUR CAREER CHOICE</Text>
                    </View>
                    <View style={{flex:2,marginLeft:5,marginRight:5}}>
                        <Text style={styles.subtitle}>"The best way to predict the future is to create it."</Text>
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={_ => this.goToUserSelection()}>
                            <CustomListItem
                                iconName="balance-scale"
                                iconColor="green"
                                title="INVESTMENT BANKING AND FINANCE"
                                titleColor="#006622"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={_ => this.goToUserSelection()}>
                            <CustomListItem
                                iconName="database"
                                iconColor="green"
                                title="PROGRAMMING TOOLS"
                                titleColor="#006622"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                            <CustomListItem
                                iconName="exclamation-triangle"
                                iconColor="gray"
                                title="MARKETING MANAGEMENT"
                                titleColor="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style ={styles.button}>
                            <CustomListItem
                                iconName="exclamation-triangle"
                                iconColor="gray"
                                title="STRATEGY AND CONSULTING"
                                titleColor="gray"
                            />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <CustomListItem
                                iconName="exclamation-triangle"
                                iconColor="gray"
                                title="HUMAN RESOURCES MANAGEMENT"
                                titleColor="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.line}>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                            <CustomListItem
                                iconName="exclamation-triangle"
                                iconColor="gray"
                                title="BUSINESS LAW"
                                titleColor="gray"
                            />
                        </TouchableOpacity>
                    </View>                
                    
                </View>
            </ImageBackground>
        );
    }
}


export default Challenge