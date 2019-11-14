import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex:1,
        margin:10, 
        borderRadius:10,
        backgroundColor:'#f5f5f5', 
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems:'center',
        justifyContent:'center',
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    questionText:{
        fontSize:20,
    },
})