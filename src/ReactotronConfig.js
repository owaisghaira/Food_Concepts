import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
//import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron
    //.setAsyncStorageHandler(AsyncStorage)
    .configure({ name: "Cotton Concepts", host: '192.168.8.101', port: 9090, }) // controls connection & communication settings
    .use(reactotronRedux())
    .connect() // let's connect!

export default reactotron;
