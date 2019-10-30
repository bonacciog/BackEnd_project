import {StyleSheet} from 'react-native';
//import Constants from 'expo-constants';

export default StyleSheet.create({
    heading:{
        fontSize:15,
        textAlign:'center',
        fontWeight:'bold'
    },
    subheading:{
        fontSize:12,
        textAlign:'center'
    },
    parent:{
        flex:1,
        padding:10,
        borderRadius: 5,
        justifyContent:'center',
        backgroundColor:'white',
        flexDirection:'row'
        
    },    
    title:{
        flex:4,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    icon:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})