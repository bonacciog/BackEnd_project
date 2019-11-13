import {StyleSheet} from 'react-native'

export default StyleSheet.create({

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
    id:{
        fontSize:20,
        color:'#006622'
    }
})