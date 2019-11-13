import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    parent:{
        flex:1
    },
    title:{
        fontSize:30,
        color:'green',
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold',
        padding:5
    },
    customLogo:{
        flex:2
    },
    subtitle:{
        fontSize:18,
        color:'green',
        textAlign:'center',
        color:'#006622',
        padding:5
    },
    details:{
        flex:1,
        justifyContent:'center',
        padding:4,
        alignItems:'center'
    },
    customContent:{
        flex:1,
        marginLeft:20,
        marginRight:20
    },
    
    customLogin:{
        flex:1
    },
    customBottom:{
        flex:1
    },
    customSignup:{
        flex:1,
        justifyContent:'center',
    },
    heading:{
        fontSize:20,
        textAlign:'center'
    },
    loginText:{
        color:'#f5f5f5'
    },
    
    loginButton:{
        backgroundColor:'green',
        borderColor:'#f5f5f5',
    },
    button:{
        borderWidth:1,
        borderRadius:15,
        padding:15,
        justifyContent:'center'
    }
    
})