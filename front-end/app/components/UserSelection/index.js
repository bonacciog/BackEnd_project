import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView,Alert, FlatList, Image } from 'react-native';
import CustomListItem from '../CustomListItem';
import CustomItem from '../CustomItem';
//import SearchBar from 'react-native-search-bar';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import {connect} from 'react-redux';


import styles from './styles'

class UserSelection extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: false,
            data: [],
            error: null
        }
        this.arrayholder = []

    }

    componentDidMount(){
        this.loadUserList()
    }

    loadUserList(){
        console.log("Waiting for userlist from Server")
        //const {firstname,lastname,university,key,isLoading} = this.state;
        fetch('http://' + REACT_APP_API_URL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'getLeaderBoard'
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {

                    if(responseJson.error === undefined){
                        responseJson.forEach(function(element,index) {
                            element.id = "" + (index+1) + ""
                        });
                        this.setState({data: responseJson})
                        this.arrayholder =  responseJson
                        console.log(this.state.data)
                    }else{   
                        console.log(responseJson.error)
                    }
                })
                .catch((error) =>{
                    
        });
    }

    startChallenge(id){
        console.log(this.props.UserID + ' vs ' + id)

        const idTopic = JSON.stringify(this.props.navigation.getParam('IDTopic', '1'))
        
        fetch('http://' + REACT_APP_API_URL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'challengeSpecificUser',
                ReceiverProposal_ID : ""+12+"",//JSON.stringify(id),
                SenderProposal_ID : this.props.UserID,
                TopicID : idTopic
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {
                    
                    if(responseJson.error === undefined){
                        console.log(responseJson)
                        this.props.navigation.navigate('waitingReval')
                    }else{
                        console.log(responseJson.error)
                        Alert.alert('Wait',responseJson.error,[{
                            text:'Okay'
                        }])
                        return
                    }
                })
                .catch((error) =>{
                    
        });
        this.props.navigation.navigate('waitingReval')
    }

    updateSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = item.Lastname.toUpperCase() + item.Firstname.toUpperCase() + item.University.toUpperCase()
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        this.setState({data:newData})
        
        
    };

    randomReval = () =>{
        const i = Math.floor(Math.random()*this.state.data.length)
        this.startChallenge(this.state.data[i].UserID)
    }

/*    renderHeader = () =>{
        return (
                <SearchBar
                    placeholder="Search"
                    onChangeText={ text => this.updateSearch(text)}
                />
        )
    }*/

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageDashboard.jpg')}
                style = {styles.parent}
            >
                <View style={styles.headerLine}>
                    <View style={{flex:1}}>
                        <Text style={styles.title}>VS</Text>
                    </View>
                    <View style={{flex:1,marginLeft:5,marginRight:5}}>
                        <Text style={styles.subtitle}>Select the user to challange</Text>
                    </View>
                    <View style={{flex:1,marginLeft:5,marginRight:5}}>
                        <TouchableOpacity style ={styles.button} onPress={_ => this.randomReval()} >
                            <View style={{flex:1, justifyContent:'center'}}>
                                <Text style={styles.randomText}>RANDOM CHOICE</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) =>   <TouchableOpacity
                                                            style={{flex:1}}
                                                            onPress={_ => this.startChallenge(item.UserID)}    
                                                        >
                                                            <CustomItem title={item.Lastname + ' ' + item.Firstname} subtitle={item.University} id={item.id} info={item.XP} />
                                                        </TouchableOpacity>
                                        }
                            keyExtractor={item => item.id}
                           // ListHeaderComponent= {this.renderHeader}
                        />
                    </SafeAreaView>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state){
    return{
        UserID : state.UserID,
        Key : state.Key
        
    }
}

export default connect(mapStateToProps)(UserSelection)