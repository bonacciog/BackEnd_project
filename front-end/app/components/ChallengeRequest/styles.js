import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    parent:{
        flex:1,
        padding:10,
        justifyContent:'center',
    },  
    heading:{
        fontSize:25,
        color:'#f5f5f5',
        fontWeight: 'bold'
    } ,
    title:{
        fontSize:35,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:30,
        textAlign:'center',
        color:'#006622'
    },
    button:{
        borderRadius: 5,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
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
    }
})