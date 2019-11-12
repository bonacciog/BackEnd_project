import React, { Component } from 'react'
import { View,Text, TouchableOpacity, ImageBackground, Image, Avatar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles'
import CustomIcon from '../CustomIcon';

class Home extends Component{

    static navigationOptions = {
        header: null
    }

    goToDashboard(){
        this.props.navigation.navigate('dashboard')
    }

    render() {

        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageHome.jpg')}
                style = {styles.parent}
            >
                <View style={styles.optionsBar}>
                <Icon reverse name="users" size={25} style={{marginRight:20}} color="#004d1a"/>
                <Icon reverse name="comment" size={25} style={{marginRight:20}} color="#004d1a"/>
                <Icon reverse name="bell" size={25} style={{marginRight:20}} color="#004d1a"/>
                </View>
                <View style={styles.curriculumCard}>
                    <TouchableOpacity style ={styles.card}>
                        <View style={styles.cardFirstLine}>
                            <View style={styles.cardAvatar}>
                                <TouchableOpacity >
                                    <Image 
                                        source = {require('../../assets/images/avatarIcon.png')}
                                        style = {styles.avatar}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardDetails}>
                                <Text>Simone Bartoli</Text>
                                <Text>Computer science engineer</Text>
                                <Text>Really handsome guy </Text>
                                <Text>The Greatest Of All Time </Text>
                            </View>
                        </View>
                        <View style={styles.cardGoals}>
                            <View style={styles.margin}>
                                
                                <Icon reverse name="fire" size={45} style={{marginRight:15}} color="#8a0f08"/>
                            </View>
                            <View style={styles.margin}>
                                
                                <Icon reverse name="trophy" size={45} style={{marginRight:15}} color="#9e9e9d"/>
                            </View>
                            <View style={styles.margin}>
                                
                                <Icon reverse name="star" size={45} style={{marginRight:15}} color="#d6c800"/>
                            </View>
                            <View style={styles.margin}>
                                <CustomIcon
                                    name="asterisk"
                                    color="red"
                                    size={50}
                                />
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <View style={styles.margin} />
                    <View style={styles.margin}>
                        <TouchableOpacity 
                            onPress={_ => this.goToDashboard()} 
                        >
                            <Image 
                                source = {require('../../assets/images/backgroundImagePlusButton.jpg')}
                                style = {styles.plusButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margin} />
                </View>
                <View style={styles.leaderBoard}>
                    <TouchableOpacity style={styles.leaderBoardList}
                    >

                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default Home