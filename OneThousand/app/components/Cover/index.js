import React, { Component } from 'react'
import {ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import WS from '../WS';
import {connect} from 'react-redux'

class Cover extends Component{

    static navigationOptions = {
        header: null,
    }
    constructor(props){
        super(props)
        
        this.ws = []
    }

    getMyValues = async () => {
        const Key = await AsyncStorage.getItem('Key')
        const UserID = await AsyncStorage.getItem('UserID')
        console.log('Key = ' + Key + ' UserID = ' + UserID)
        this.props.saveUserID(UserID)
        this.props.saveKey(Key)

        const request = {
            request : 'login', 
            UserID: UserID,
            key : JSON.parse(Key)
        }
        this.ws.send(JSON.stringify(request))
    }

    setValue = async (key,value) => {
        try {
            AsyncStorage.setItem(key, JSON.stringify(value))
        } catch(e) {
          // save error
        }
      
        console.log('Done.')
    }

    componentDidMount(){
        let webSocketController = new WS()
        this.ws = webSocketController.ws
        
        this.ws.onopen = () => {
            console.log('[Web Socket] opened')
            this.getMyValues()

       }

       this.ws.onmessage = (evt) => {
            console.log('[Web Socket] message - ' + evt.data)
            const message = JSON.parse(evt.data)
            if(message.error === undefined){
                if(message.UserID === undefined){
                    switch (message.request){
                        case 'challengeProposal':
                            console.log('Challenge request found')
                            this.props.navigation.navigate("challengeRequest")
                            break
                        default:
                            console.log('Login validate')
                            this.props.navigation.navigate("home")
                            break
                    }
                }else{
                    this.setValue('UserID',message.UserID)
                    console.log('Registration done successfully')
                    this.props.navigation.navigate("home")
                }
                
            }else{
                console.log('Not found')
                this.props.navigation.navigate("firstPage")
            }
        
       }
       
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageCover.jpg')}
                style = {{flex:1}}
            >
                

                
            </ImageBackground>
        );
    }
}


function mapStateToProps(state){
    return{
        receivedMessage : state.receivedMessage,
        Key : state.key,
        UserID : state.UserID

    }
}

function mapDispatchToProps(dispatch){
    return{
        saveKey : (key) => dispatch({type:'SAVE_KEY', payload:{Key: key}}),
        saveUserID : (userID) => dispatch({type:'SAVE_USER_ID',payload:{UserID: userID}}) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover)
