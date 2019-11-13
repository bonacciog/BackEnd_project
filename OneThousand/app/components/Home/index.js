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


class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            error: null
        }
    }

    componentDidMount(){
        this.loadLeaderboard()
    }

    loadLeaderboard(){
        console.log("Waiting for leaderboard from Server")
        //const {firstname,lastname,university,key,isLoading} = this.state;
        fetch('http://' + REACT_APP_API_URL,{
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
        this.props.navigation.navigate('challengeTopic')
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageHomeTest.jpg')}
                style = {styles.parent}
            >
                <View style={styles.optionsBar}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/1001White.png')}
                    />
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
                    </View>
                    <View style={styles.leaderBoardList}>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <CustomItem title={item.Lastname + " " + item.Firstname} subtitle={item.University} id={item.id} info={item.XP} />}
                                keyExtractor={item => item.id}
                            />
                        </SafeAreaView> 

                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default Home