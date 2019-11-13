import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    heading:{
        fontSize:15,
        textAlign:'center',
        color:'#006622',
        fontWeight:'bold'
    },
    parent:{
        flex:1,

    },
    headerLine:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:20
    },
    line:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
        
    },
    buttonContainer:{
        flex:1,
        padding:20
        
    },
    button:{
        padding:20,
        borderRadius: 5,
        justifyContent:'center',
        backgroundColor:'white',
        flexDirection:'column',
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
    buttonHeader:{
        flex:2
    },
    buttonContent:{
        flex:3,
        alignItems:'center',
        justifyContent:'center'
    },
    iconButton:{
        width:50,
        height:50,

    },
    logo:{
        height:150,
        width:150
    }
})