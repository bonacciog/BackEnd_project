import React, { Component } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './styles'
import { REACT_APP_API_URL } from 'react-native-dotenv';
import { connect } from 'react-redux'

class ChallengeRequest extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }

    acceptChallenge() {
        fetch('http://' + REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request : "challengeAccepted",
                ReceiverProposal_ID : this.props.Challenge.ReceiverProposal_ID,
                SenderProposal_ID : this.props.Challenge.SenderProposal_ID,
                TopicID : this.props.Challenge.TopicID
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.error === undefined) {
                    console.log(responseJson)
                    const challenge = {
                        ChallengeID: this.props.Challenge.ChallengeID,
                        ReceiverProposal_ID: this.props.UserID,
                        SenderProposal_ID: this.props.SenderProposal_ID,
                        TopicID: this.props.TopicID,
                        Accepted: true
                    }
                    this.props.saveChallenge(challenge)
                    this.props.navigation.navigate('challengeRecap')
                } else {
                    console.log(responseJson.error)
                    this.props.navigation.navigate('home')
                }
            })
            .catch((error) => {
                console.log('Catch')
                const challenge = {
                    ChallengeID: this.props.Challenge.ChallengeID,
                    ReceiverProposal_ID: this.props.UserID,
                    SenderProposal_ID: this.props.Challenge.SenderProposal_ID,
                    TopicID: this.props.Challenge.TopicID,
                    Accepted: true
                }
                this.props.saveChallenge(challenge)
                //this.props.navigation.navigate('challengeRecap')
            });
        this.props.navigation.navigate('challengeRecap')
    }

    retireChallenge() {
        fetch('http://' + REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request: "challengeRejected",
                ReceiverProposal_ID: this.props.Challenge.ReceiverProposal_ID,
                SenderProposal_ID: this.props.Challenge.SenderProposal_ID,
                challengeID: this.props.Challenge.ChallengeID 
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.error === undefined) {
                    console.log(responseJson)
                    this.props.navigation.navigate('home')
                } else {
                    console.log(responseJson.error)
                    this.props.navigation.navigate('home')
                }
            })
            .catch((error) => {
                console.log('Catch')
                this.props.navigation.navigate('home')
            });
        this.props.navigation.navigate('homeTest')
    }

    getUserNameFromUserId(userID) {
        let result = 'None'
        this.props.UserList.forEach(function (element) {
            if (element.UserID == userID) {
                result = element.Firstname
            }
        });
        return result
    }

    getTopicNameFromTopicId(topicID) {
        let result = 'None'
        this.props.TopicList.forEach(function (element) {
            if (element.ID == topicID) {
                result = element.fatherCategory
            }
        });
        return result
    }

    componentDidMount() {

    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/images/backgroundImageWaiting.jpg')}
                style={styles.parent}
            >
                <View style={{ flex: 2, alignItems:'center' }}>
                    <Image
                        source={require('../../assets/images/logo2.png')}
                        style={{flex:1,width:200,height:200}}
                    />
                </View>
                <View style={{ flex: 4, paddingRight:25, paddingLeft:25 }}>
                    <Text style={styles.title}>{this.getUserNameFromUserId(this.props.Challenge.SenderProposal_ID)}</Text>
                    <Text style={styles.subtitle}>is willing to challenge you in</Text>
                    <Text style={styles.title}>{this.getTopicNameFromTopicId(this.props.Challenge.TopicID)}</Text>
                    <Text style={styles.subtitle}>Do you dare accepting</Text>
                    <Text style={styles.subtitle}>this challenge?</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'green' }]}
                        onPress={_ => this.acceptChallenge()}
                    >
                        <Text style={styles.heading}> ACCEPT </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={_ => this.retireChallenge()}
                    >
                        <Text style={styles.heading}> REFUSE </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        Key: state.key,
        UserID: state.UserID,
        UserList: state.UserList,
        TopicList: state.TopicList,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeRequest)