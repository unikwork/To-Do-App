/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import PushNotification from "react-native-push-notification";

import { name as appName } from './app.json';
LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);


// PushNotification.configure({
//     permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: true,
// });