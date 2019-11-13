import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import CustomListItem from '../CustomListItem';

import styles from './styles'




class ChallengeTopic extends Component{

    constructor(props){
        super(props)

        this.state = {
            loading: false,
            data: [],
            error: null
        }
    }

    static navigationOptions = {
        //title: 'Zack',
        //header: null,
    }

    loadAllTopics(){
        console.log("Waiting for topics from Server")
        //const {firstname,lastname,university,key,isLoading} = this.state;
        fetch('http://' + REACT_APP_API_URL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                request: 'getAllTopics'
              }),
        })
            .then((response) => response.json())
                .then((responseJson) => {

                    if(responseJson.error === undefined){
                        console.log(responseJson)
                        responseJson.forEach(function(element,index) {
                            element.id = "" + (index+1) + ""
                            switch(element.topicsName){
                                
                                case 'INF':
                                    element.iconName = "database"
                                    element.iconColor = "green"
                                    element.titleColor = "#006622"
                                    element.fatherCategory = "Programming Tools"
                                    break
                                case 'ECM':
                                    element.iconName = "balance-scale"
                                    element.iconColor = "green"
                                    element.titleColor = "#006622"
                                    element.fatherCategory = "Investiment Banking and Finance"
                                    break
                                default:
                                    element.iconName = "exclamation-triangle"
                                    element.iconColor = "gray"
                                    element.titleColor = "gray"
                                    break
                                
                            }
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

    componentDidMount(){
        this.loadAllTopics()
    }

    goTo(id,topicName){
        switch(topicName){
            case 'ECM':
                this.goToUserSelection(id)
                break
            case 'INF':
                this.goToSubCategorySelection(id)
                break
            default:
                this.goToSubCategorySelection(id)
                break
        }
    }

    goToUserSelection(id){
        this.props.navigation.navigate('challengeUserSelection',{IDTopic:id})
    }
    
    goToSubCategorySelection(id){
        this.props.navigation.navigate('challengeTopicProgrammingTools',{IDTopic:id})
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
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => 
                            <View style={styles.line}>
                                <View style={styles.buttonContainer}>   
                                    <TouchableOpacity style={styles.button} onPress={_ => this.goTo(item.ID,item.topicsName)}>
                                        <CustomListItem 
                                            iconName= {item.iconName}
                                            iconColor={item.iconColor}
                                            titleColor={item.titleColor}
                                            title={item.fatherCategory}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        keyExtractor={item => "" + item.ID + ""}
                    />
                </SafeAreaView> 
            </ImageBackground>
        );
    }
}


export default ChallengeTopic