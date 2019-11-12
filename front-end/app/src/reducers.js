const initialState = {
    receivedMessage : 'none',
    key: '',
    UserID: ''
}

function socketReducer (state = initialState, action) {
    switch(action.type){
        case 'WS_SEND_MESSAGE':
            return {receivedMessage: action.payload}
        case 'WS_RECEIVE_MESSAGE':
            return {receivedMessage: action.payload}
        default:
            return state
    }
}

export default socketReducer