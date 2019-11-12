import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    parent:{
        flex:1,
        padding:10,
        justifyContent:'center',
    },    
    title:{
        flex:4,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    headerLine:{
        flex:1
    },
    content:{
        flex:3,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:10,
        paddingTop:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    title:{
        fontSize:35,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:20,
        textAlign:'center',
        color:'#006622'
    },
    randomText:{
        fontSize:20,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
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
    button:{
        borderRadius: 30,

        justifyContent:'center',
        backgroundColor:'#f5f5f5',
        flexDirection:'row',
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
    
    container:{
        flex:1,
        //marginTop:5
    }
})