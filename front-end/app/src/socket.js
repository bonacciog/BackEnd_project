import { REACT_APP_API_URL } from 'react-native-dotenv';

const ws = new WebSocket('ws://' + REACT_APP_API_URL)
console.log("WebSocket called")
console.log(REACT_APP_API_URL)
export default ws