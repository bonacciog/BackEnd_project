import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    parent:{
        flex:1,

    },
    headerLine:{
        flex:1,
        justifyContent:'center',
        paddingTop:20
    },
    title:{
        fontSize:25,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
    },
    subtitle:{
        fontSize:20,
        textAlign:'center',
        color:'#006622'
    },
    container: {
        flex: 1,
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
        backgroundColor:'white',
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
})