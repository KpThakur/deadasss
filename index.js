
import { AppRegistry,DeviceEventEmitter } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import IncomingCall from 'react-native-incoming-call';
import TrackPlayer from 'react-native-track-player';
import * as RootNavigation from "./RootNavigation";
import App from './App';

import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    global.notification = remoteMessage
    // console.log("Message handled in the background! 1", remoteMessage);
    // alert('sachin =>' + remoteMessage.data.room_id)
    // global.notification.data.room_id
    //     ? RootNavigation.navigate("VocieCall", { remoteMessage:  global.notification })
    //     : console.log(remoteMessage.notification.title)



    // if ( global.notification?.notification?.title === 'Incoming Call') {
    //     // Display incoming call activity.
    //     IncomingCall.display(
    //       'callUUIDv4', // Call UUID v4
    //       'Quocs', // Username
    //       'https://avatars3.githubusercontent.com/u/16166195', // Avatar URL
    //       'Incomming Call', // Info text
    //       20000 // Timeout for end call after 20s
    //     );
    //   } else if ( global.notification?.notification?.title === 'Missed Call') {
    //     // Terminate incoming activity. Should be called when call expired.
    //     IncomingCall.dismiss();
    //   }
     
    //   // Listen to headless action events
    //   DeviceEventEmitter.addListener("endCall", payload => {
    //     // End call action here
    //   });
    //   DeviceEventEmitter.addListener("answerCall", (payload) => {
    //     console.log('answerCall', payload);
    //     if (payload.isHeadless) {
    //       // Called from killed state
    //       IncomingCall.openAppFromHeadlessMode(payload.uuid);
    //     } else {
    //       // Called from background state
    //       IncomingCall.backToForeground();
    //     }
    //   });










});

AppRegistry.registerComponent(appName, () => App);
