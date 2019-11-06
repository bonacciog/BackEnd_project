import React, { Component } from 'react'
import { View, Image, ImageBackground, Text, Picker, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import styles from './styles'
import CustomItem from '../CustomItem';
import { REACT_APP_API_URL } from 'react-native-dotenv';

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
        this.state = {
            loading: false,
            data: [],
            error: null
        }
        this.loadLeaderboard()
    }

    loadLeaderboard(){
        //const {firstname,lastname,university,key,isLoading} = this.state;
        fetch(REACT_APP_API_URL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'getLeaderBoard',
                FatherCategory: 'Finance',
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {

                    if(responseJson.error === undefined){
                        responseJson.forEach(function(element,index) {
                            element.id = "" + (index+1) + ""
                        });
                        this.setState({data: responseJson})
                        console.log(this.state.data)
                    }else{
                        
                        console.log(responseJson.error)

                    }
                })
                .catch((error) =>{
                    
        });
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
                    <View style={styles.leaderBoardTitle}>
                        <Text style={styles.title}> LEADERBOARD </Text>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:2, flexDirection:'column',justifyContent:'center',paddingLeft:5}}>
                                <Text style={{fontSize:20, fontWeight:'bold',color:'#006622'}}>Topic</Text>
                            </View>
                            <View style={{flex:7, flexDirection:'column',justifyContent:'center'}}>
                                <Picker
                                    selectedValue={"BUSINESS AND FINANCE"}
                                    style={{height: 50, alignSelf: 'stretch'}}
                                    >
                                    <Picker.Item label="BUSINESS AND FINANCE" value="FINANCE" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                            </View>
                        </View>
                        
                    </View>
                    <View style={styles.leaderBoardList}>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <CustomItem title={item.Lastname + item.Firstname} subtitle={""} id={item.id} info={item.XP} />}
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