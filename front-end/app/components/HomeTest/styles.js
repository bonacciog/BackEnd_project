import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    heading:{
        fontSize:30,
        color:'#006622',
        fontWeight:'bold'
    },
    parent:{
        flex:1,
        justifyContent:'center'
    },
    optionsBar:{
        flex:2,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        padding:5
    },
    plusButtonBackground:{
        flex:1
        
    },
    challengeButton:{
        flex:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    
    plusButton:{
        padding:10,
        width:120,
        height:120,
        borderRadius: 100,
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

    actions:{
        flex:4,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row'
    },
    leaderBoard:{
        flex:9,
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
            width: 3,
            height: 2,
        },
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor:'white'
    },
    listItem:{
        borderRadius: 5,
        padding:5,
        marginTop:3,
        justifyContent:'center',
        backgroundColor:'white',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#d1d1d1',
        flex:1
    },
    titleListItem:{
        fontSize:20,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
    },
    subtitleListItem:{
        fontSize:18,
        textAlign:'center',
        color:'#006622'
    },
})