import React, { Component } from 'react'
import {
        View,
        ImageBackground,
        TouchableOpacity,
        Text,
        Image,
        SafeAreaView,
        FlatList
} from 'react-native';
import styles from './styles'

class WaitForAnswer extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style ={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:2}} />
                    <View style={styles.questionNumber}>
                        <Text style={{fontSize:15, color:'green', fontWeight:'bold'}}>{this.props.id}/10</Text>
                    </View>
                    <View style={{flex:2}} />
                </View>
                <View style={[styles.listItem,{backgroundColor:'#f5f5f5',height:40,flexDirection:'row'}]}>
                    <View style={{flex:2, justifyContent:'center',alignItems:'center', borderTopLeftRadius:10, borderBottomLeftRadius: 10,backgroundColor:'#02e619'}}>
                        <Text style={styles.textAnswered}>{this.props.xpPlayer1} XP</Text>
                    </View>
                    <View style={{flex:2, justifyContent:'center',alignItems:'center', borderTopRightRadius:10,borderBottomRightRadius:10, flexDirection:'row',backgroundColor:'#999999'}}>
                        <Text style={styles.textAnswered}>Wait ...</Text>
                    </View> 
                </View>
            </View>
        );
    }
}

class CustomItemNotAnswered extends Component{
    constructor(props){
        super(props)
    }

    goToChallengeQuestion(id){
        this.props.nav.navigate('challengeQuestion',{idQuestion: id})
    }

    render(){
        return(
            <View style ={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:2}} />
                    <View style={styles.questionNumber}>
                        <Text style={{fontSize:15, color:'green', fontWeight:'bold'}}>{this.props.id}/10</Text>
                    </View>
                    <View style={{flex:2}} />
                </View>
                <TouchableOpacity
                        onPress={_ => this.goToChallengeQuestion(this.props.id)}
                        style={[styles.listItem,{backgroundColor:'#f5f5f5', alignItems:'center', justifyContent:'center'}]}
                >
                    <View>
                        <Image 
                            source = {require('../../assets/images/backgroundImagePlayButton.jpg')}
                            style = {{height:50,width:50,borderRadius:50}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
class CustomItemAnswered extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style ={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:2}} />
                    <View style={styles.questionNumber}>
                        <Text style={{fontSize:15, color:'green', fontWeight:'bold'}}>{this.props.id}/10</Text>
                    </View>
                    <View style={{flex:2}} />
                </View>
                <View style={[styles.listItem,{backgroundColor:'#f5f5f5',height:40,flexDirection:'row'}]}>
                    <View style={{flex:2, justifyContent:'center',alignItems:'center', borderTopLeftRadius:10, borderBottomLeftRadius: 10,backgroundColor:'#02e619'}}>
                        <Text style={styles.textAnswered}>{this.props.xpPlayer1} XP</Text>
                    </View>
                    <View style={{flex:2, justifyContent:'center',alignItems:'center', borderTopRightRadius:10,borderBottomRightRadius:10, flexDirection:'row',backgroundColor:'red'}}>
                        <Text style={styles.textAnswered}>{this.props.xpPlayer2} XP</Text>
                    </View> 
                </View>
            </View>
        );
    }
}

class CustomItem extends Component{
    constructor(props){
        super(props)
    }

    render() {
        if(this.props.answered){
            return(<CustomItemAnswered answered={this.props.answered} id={this.props.id} answerPlayer1={this.props.answerPlayer1} xpPlayer1={this.props.xpPlayer1} answerPlayer2={this.props.answerPlayer2} xpPlayer2={this.props.xpPlayer2}  nav = {this.props.nav} />)
        }else{
            if(this.props.answerPlayer1){
                return(<WaitForAnswer answered={this.props.answered} id={this.props.id} answerPlayer1={this.props.answerPlayer1} xpPlayer1={this.props.xpPlayer1} answerPlayer2={this.props.answerPlayer2} xpPlayer2={this.props.xpPlayer2}  nav = {this.props.nav} />)
            }else{
                return(<CustomItemNotAnswered answered={this.props.answered} id={this.props.id} answerPlayer1={this.props.answerPlayer1} xpPlayer1={this.props.xpPlayer1} answerPlayer2={this.props.answerPlayer2} xpPlayer2={this.props.xpPlayer2}  nav = {this.props.nav} />)
            }
            
        }
    }
        
}

class ChallengeRecap extends Component{

    static navigationOptions = {
        //title: 'Zack',
        header: null,
    }
    constructor(props){
        super(props)
        this.state = {
            questions : []
        }
    }

    componentDidMount(){
        this.loadQuestions()
    }

    loadQuestions = () => {
        const questionsLoaded = [
            {id : 1, answered: true, answerPlayer1: true, xpPlayer1: 15, answerPlayer2: true, xpPlayer2: 10},
            {id : 2, answered: true, answerPlayer1: true, xpPlayer1: 10, answerPlayer2: true, xpPlayer2: 0},
            {id : 3, answered: false, answerPlayer1: true, xpPlayer1: 12, answerPlayer2: false, xpPlayer2: 0},
            {id : 4, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 5, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 6, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 7, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 8, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 9, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0},
            {id : 10, answered: false, answerPlayer1: false, xpPlayer1: 0, answerPlayer2: false, xpPlayer2: 0}
        ]
        this.setState({questions: questionsLoaded})
    }

    sumXP = (name) => {
        
        let sum = 0
        this.state.questions.forEach(function(element) {
            sum = sum + element[name]
        });

        return sum
    }

    surrenderChallange = () => {
        this.props.navigation.navigate('homeTest')
    }

    render() {
        return(
            <ImageBackground 
                source = {require('../../assets/images/backgroundImageWaiting.jpg')}
                style = {{flex:1}}
            >
                <View style={{flex:9}}>
                    <View style={{flex:2, flexDirection:'row'}}>
                        <View style={styles.avatarContainer}>
                            <Image 
                                source = {require('../../assets/images/avatarIcon.png')}
                                style = {styles.avatar}
                            />
                            <Text style={styles.title}>Simo</Text>
                        </View>
                        <View style={styles.score}>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>{this.sumXP('xpPlayer1')}</Text>
                            </View>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>-</Text>
                            </View>
                            <View style={{flex:1}}> 
                                <Text style={styles.scoreValue}>{this.sumXP('xpPlayer2')}</Text>
                            </View>
                        </View>
                        <View style={styles.avatarContainer}>
                            <Image
                                source = {require('../../assets/images/avatarIcon.png')}
                                style = {styles.avatar}
                            />
                            <Text style={styles.title}>Terrone</Text>
                        </View>
                    </View>    
                    <View style={styles.recapBoard}>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={this.state.questions}
                                renderItem={({ item }) => 
                                        <CustomItem answered={item.answered} id={item.id} answerPlayer1={item.answerPlayer1} xpPlayer1={item.xpPlayer1} answerPlayer2={item.answerPlayer2} xpPlayer2={item.xpPlayer2}  nav = {this.props.navigation}/> 
                                }
                                keyExtractor={item => '' + item.id + ''}
                        />
                    </SafeAreaView>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={_ => this.surrenderChallange()}
                        >
                        <View>
                            <Text style={styles.heading}> SURRENDER </Text>

                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default ChallengeRecap