import React, {useEffect, useState} from 'react';
import Routes from './Routes';
import {
  PermissionsAndroid,
  Platform,
  View,
  Alert,
  LogBox,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {UserProvider} from './app/Utils/UserContext';
import stripe from 'tipsi-stripe';
import * as RootNavigation from './RootNavigation';
import {apiCall} from '././app/Utils/httpClient';
import ENDPOINTS from '././app/Utils/apiEndPoints';
// stripe.setOptions({
//   publishableKey: 'pk_test_51IWDO3F4GSPB2KGLihAnobT30EUwrSYbSvaZTBeCBcNq1JDiFlUHK9qG1bvxO9bDQqHkn1C5aUKoYvTmEsEct8hF00HA8RRgRa',
//   androidPayMode: 'test', // Android only
// });

import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';

const App = () => {
  LogBox.ignoreAllLogs();

  async function navigationService(remoteMessage) {
    RootNavigation.navigate('VocieCall', {remoteMessage: remoteMessage});
    console.log('find remoteMessage message>>>>', remoteMessage);
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.POST_NOTIFICATIONS'] &&
          result['android.permission.CAMERA'] &&
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.RECORD_AUDIO'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE']
        ) {
        } else if (
          result['android.permission.POST_NOTIFICATIONS'] ||
          result['android.permission.CAMERA'] ||
          result['android.permission.READ_EXTERNAL_STORAGE'] ||
          result['android.permission.RECORD_AUDIO'] ||
          result['android.permission.WRITE_EXTERNAL_STORAGE']
        ) {
        }
      });
    }

    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      remoteMessage.data.room_id
        ? navigationService(remoteMessage)
        : console.log(remoteMessage.notification.title);
    });

    // messaging().onMessage(async remoteMessage => {
    //   console.log("Foreground message received:", remoteMessage);
    //   if (remoteMessage.data.room_id) {
    //     navigationService(remoteMessage);
    //   } else {
    //     console.log("Notification:", remoteMessage.notification.title);
    //   }
    // });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage?.data?.room_id) {
        NotificationSounds.getNotifications('ringtone').then(soundsList => {
          //console.log('SOUNDS', JSON.stringify(soundsList));
          const sound = {
            soundID: '35',
            url: 'content://media/internal/audio/media/35',
            //url: require('./app/skype-23266.mp3'),
            title: 'Dynamic',
          };
          playSampleSound(soundsList[0]);
        });
        // setTimeout(() => {
        //   stopSampleSound();
        // },5000)
      }
      console.log('remoteMessage in background: ', remoteMessage);
      global.notification = remoteMessage;
      remoteMessage.data.room_id
        ? navigationService(remoteMessage)
        : console.log(remoteMessage.notification.title);
    });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log('Message handled in the kill state!', remoteMessage);
        // if (remoteMessage?.data?.room_id) {
        //   NotificationSounds.getNotifications('ringtone').then(soundsList => {
        //     playSampleSound(soundsList[0]);
        //   });
        // }
        global.notification = remoteMessage;
        remoteMessage.data.room_id
          ? navigationService(remoteMessage)
          : console.log(remoteMessage.notification.title);
      });

    return () => {
      unsubscribe;
    };
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  }
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log('find fcmToken>>>>>>:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <View style={{flex: 1}}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </View>
  );
};
export default App;
