import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    avatarContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
        width:100,
        height:100,
        borderRadius: 100,
        borderWidth:2,

        borderColor:'#006622'
    },
    score:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'

    },
    recapBoard:{
        flex:4,
        margin:10
    },
    heading:{
        fontSize:25,
        textAlign:'center',
        color:'#f5f5f5',
        fontWeight:'bold'
    },
    scoreValue:{
        fontSize:30,
        textAlign:'center',
        color:'#f5f5f5',
        fontWeight:'bold'
    },
    title:{
        fontSize:30,
        textAlign:'center',
        color:'#f5f5f5',
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:20,
        textAlign:'center',
        color:'#006622'
    },
    headerLine:{
        flex:1,
        justifyContent:'center',
        paddingTop:20
    },
    line:{
        flex:1,
        justifyContent:'center'
        
    },
    buttonContainer:{
        flex:1,
        padding:10
        
    },
    button:{
        borderRadius: 5,
        justifyContent:'center',
        backgroundColor:'red',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flex:1
    },

    logo:{
        height:150,
        width:150
    },
    container: {
        flex: 1,
        //marginTop: Constants.statusBarHeight,
    },
    listItem:{
        flexDirection:'row',
        flex:3,
        margin:5,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        height:60
    },
    textAnswered:{
        color:'white', 
        fontSize:20,
        fontWeight:'bold'
    }, 
    textNotAnswered:{
        color:'gray', 
        fontSize:20,
        fontWeight:'bold'
    }, 
    questionNumber:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f5f5f5',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    scrollView: {
       // marginHorizontal: 20,
    }
})