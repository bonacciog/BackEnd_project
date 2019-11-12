import ws from './socket'

export const sendMsg = (data) =>{
    return dispatch => {
        console.log('Actions send message')
        dispatch(sentMsg(data))
        ws.send(data)
    }

}

export const receiveMsg = (data) =>{
    return dispatch => {
        console.log('Actions receive message')
        dispatch(receivedMsg(data))
    }
    
}

const sentMsg = data => {
    return {
        type : 'WS_SEND_MESSAGE',
        payload: data
    }
    
}

const receivedMsg = data => {
    return {
        type : 'WS_RECEIVE_MESSAGE',
        payload: data
    }
}