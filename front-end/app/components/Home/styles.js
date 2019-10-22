import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    heading:{
        fontSize:50,

    },
    parent:{
        flex:1,
        justifyContent:'center'
    },
    optionsBar:{
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'center',
        padding:5
    },
    plusButtonBackground:{
        flex:1
        
    },
    curriculumCard:{
        flex:5,
        paddingRight:20,    
        paddingLeft:20,   
        paddingBottom:20,     
        justifyContent:'center',
        borderRadius:25
    },
    card:{
        borderRadius:25,
        flex:1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor:'#f5f5f5',
        alignItems:'stretch'
    },
    cardDetails:{
        flex:2
    },
    achievmentText:{
        fontSize:25,
        fontWeight:'bold',
        color: '#5c5c5c'
    },
    cardFirstLine:{
        padding:5,
        flex:2,
        flexDirection:'row'
    },
    cardAvatar:{
        flex:1
    },
    avatar:{
        width:100,
        height:100,
        borderRadius: 25,
        borderWidth:4,     
        borderColor:'white'
    },
    cardGoals:{
        flex:2,
        flexDirection:'row',
        justifyContent:'center'
    },
    goalButton:{
        //borderWidth:1,
        padding:10,
        margin:2,
        width:80,
        height:80,
        borderRadius: 10,
        borderWidth:1,     
        borderColor:'#c1c1c1',
        justifyContent:'center',
        backgroundColor:'white',
    },
    plusButton:{
        //borderWidth:1,
        padding:10,
        width:90,
        height:90,
        borderRadius: 90,
        borderWidth:3,     
        borderColor:'#f5f5f5',
        justifyContent:'center',
        backgroundColor:'white',
    },
    margin:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
        
    },
    plusText:{
        fontSize:50,
        textAlign:'center',
        color:'#f5f5f5'
    },
    actions:{
        flex:2,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row'
    },
    leaderBoard:{
        flex:5,
        padding:10,
        justifyContent:'center',
    },
    leaderBoardList:{
        padding:10,
        borderRadius:5,
        flex:1,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor:'#f5f5f5'
    },
    listItem:{
        fontSize:20
    }
})