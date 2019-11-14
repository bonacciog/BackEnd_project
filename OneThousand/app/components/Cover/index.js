import React, { Component } from 'react'
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import WS from '../WS';
import { connect } from 'react-redux'

class Cover extends Component {

    static navigationOptions = {
        header: null,
    }
    constructor(props) {
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
            request: 'login',
            UserID: UserID,
            key: JSON.parse(Key)
        }
        this.ws.send(JSON.stringify(request))
    }

    setValue = async (key, value) => {
        try {
            AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            // save error
        }

        console.log('Done.')
    }

    componentDidMount() {
        let webSocketController = new WS()
        this.ws = webSocketController.ws

        this.ws.onopen = () => {
            console.log('[Web Socket] opened')
            this.getMyValues()

        }

        this.ws.onmessage = (evt) => {
            console.log('[Web Socket] message - ' + evt.data)
            const message = JSON.parse(evt.data)
            if (message.error === undefined) {
                if (message.UserID === undefined) {

                    if (message.notificationType === undefined) {
                        switch (message.request) {
                            case 'challengeAccepted':
                                console.log('Challenge accepted')
                                const challenge = {
                                    ChallengeID: this.props.Challenge.ChallengeID,
                                    ReceiverProposal_ID: this.props.UserID,
                                    SenderProposal_ID: this.props.Challenge.SenderProposal_ID,
                                    TopicID: this.props.Challenge.TopicID,
                                    Accepted: true
                                }
                                this.props.saveChallenge(challenge)
                                this.props.navigation.navigate("challengeRecap")
                                break
                            default:
                                console.log('Login validate')
                                this.props.navigation.navigate("home")
                                break
                        }
                    } else {
                        switch (message.notificationType) {
                            case 'challengeProposal':
                                console.log('Challenge request found')

                                const challenge = {
                                    ChallengeID: message.challengeID,
                                    ReceiverProposal_ID: this.props.UserID,
                                    SenderProposal_ID: message.SenderProposal_ID,
                                    TopicID: message.TopicID,
                                    Accepted: false
                                }
                                this.props.saveChallenge(challenge)
                                console.log('Challenge request saved in local: ' + JSON.stringify(this.props.Challenge))
                                this.props.navigation.navigate("challengeRequest")
                                break
                            case 'challengeRejected':
                                console.log('Challenge rejected received')

                                this.props.saveChallenge({})
                                console.log('Challenge request deleted in local: ' + JSON.stringify(this.props.Challenge))
                                this.props.navigation.navigate("home")
                                break
                            default:
                                console.log('Go home')
                                this.props.navigation.navigate("home")
                                break
                        }
                    }


                } else {
                    this.setValue('UserID', message.UserID)
                    console.log('Registration done successfully')
                    this.props.navigation.navigate("home")
                }

            } else {
                console.log('Not found')
                this.props.navigation.navigate("firstPage")
            }

        }

    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/images/backgroundImageCover.jpg')}
                style={{ flex: 1 }}
            >



            </ImageBackground>
        );
    }
}


function mapStateToProps(state) {
    return {
        Key: state.key,
        UserID: state.UserID,
        Challenge: state.Challenge
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveKey: (key) => dispatch({ type: 'SAVE_KEY', payload: { Key: key } }),
        saveUserID: (userID) => dispatch({ type: 'SAVE_USER_ID', payload: { UserID: userID } }),
        saveChallenge: (challenge) => dispatch({ type: 'SAVE_CHALLENGE', payload: { Challenge: challenge } })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover)
