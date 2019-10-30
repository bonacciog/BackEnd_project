import React, { Component } from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import styles from './styles'
import CustomItem from '../CustomItem';

const DATA = [
    {
      id: '1',
      title: 'Simone Bartoli',
      profession: 'UNIBO',
      exp: 250
      
    },
    {
      id: '2',
      title: 'Giovanni Bonaccio',
      profession: 'UNIBO',
      exp: 200
    },
    {
      id: '3',
      title: 'Emanuele Viglierchio',
      profession: 'LUISS',
      exp: 150
      
    },
    {
        id: '4',
        title: 'Francesco Scotta',
        profession: 'LUISS',
        exp: 100
      }
];


class HomeTest extends Component{

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        header: null
    }

    goToChallenge(){
        this.props.navigation.navigate('challenge')
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageHomeTest.jpg')}
                style = {styles.parent}
            >
                <View style={styles.optionsBar}>
                    <Text style={styles.heading}>START A CHALLENGE</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.margin} />
                    <View style={styles.margin}>
                        <TouchableOpacity 
                            onPress={_ => this.goToChallenge()} 
                        >
                            <Image 
                                source = {require('../../assets/images/backgroundImagePlayButton.jpg')}
                                style = {styles.plusButton}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.margin} />
                </View>
                <View style={styles.leaderBoard}>
                    <View style={styles.leaderBoardList}
                    >
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={DATA}
                                renderItem={({ item }) => <CustomItem title={item.title} subtitle={item.profession} id={item.id} info={item.exp} />}
                                keyExtractor={item => item.id}
                            />
                        </SafeAreaView> 

                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default HomeTest