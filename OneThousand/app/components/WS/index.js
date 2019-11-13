import { REACT_APP_API_URL } from 'react-native-dotenv'

let instance = null

class WS {

    constructor(){

        if(!instance){
            instance = this;
        }
        this.ws = new WebSocket('ws://' + REACT_APP_API_URL);
        return instance;
    }
}

export default WS