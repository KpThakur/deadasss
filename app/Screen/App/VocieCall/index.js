import React, {useState, useEffect} from 'react';
import VocieCallScreen from './components/VocieCall';
import {navigate} from '../../../../RootNavigation';
import {View, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Loader from '../../../Utils/Loader';
import TrackPlayer, { Capability, RepeatMode,  } from 'react-native-track-player';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import NotificationSounds, {
  playSampleSound,
  stopSampleSound,
} from 'react-native-notification-sounds';

let isInitialized = false;

const VocieCall = ({navigation, route}) => {
  const {remoteMessage} = route.params;

 console.log("find room_id in voiceCall>>>>", remoteMessage.data)
 
  global.caller_userId = remoteMessage.data.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [counter, setCounter] = React.useState(25);
  global.notification = [];
//   useFocusEffect(
//     React.useCallback(() => {
//       initializePlayer();
//       //isPlayerInitialized();
//       togglePlay();
      
//       return () => togglePause();
//     }, []),
//   );

  useFocusEffect(
    React.useCallback(() => {
      console.log("here is navigate in voice call")
     //stopSampleSound();
        // async function initAndPlay() {
        //     await initializePlayer();  
            togglePlay();
        // }

        // initAndPlay();

        return () => {
            togglePause();  
        };
    }, [])
);

    

    async function initializePlayer() {
      if (!isInitialized) {
        try {
          await TrackPlayer.setupPlayer();
          await TrackPlayer.updateOptions({
            capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
            ],
          });
          isInitialized = true;
          console.log('TrackPlayer has been set up.');
        } catch (e) {
          console.error('Error setting up TrackPlayer:', e);
        }
      } else {
        console.log('TrackPlayer is already initialized.');
      }
    }

//   async function isPlayerInitialized() {
//     let isInitialized = false;

//     try {
//       await TrackPlayer.setupPlayer();
//       await TrackPlayer.updateOptions({
//         capabilities: [
//           Capability.Play,
//           Capability.Pause,
//           Capability.SkipToNext,
//           Capability.SkipToPrevious,
//         ],
//       });

//       isInitialized = true;
//     } catch (e) {
//       console.log('error in catch', e);
//     }
//   }

  async function togglePlay() {
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // if (currentTrack == null) {
    //   await TrackPlayer.reset();
    //   await TrackPlayer.add({
    //     url: require('../../../../app/skype-23266.mp3'),
    //   });
    //   await TrackPlayer.play();
    //   await TrackPlayer.setRepeatMode(RepeatMode.Track)
    // } else {
    //   console.log('Failed to play');
    // }
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
  }

  async function togglePause() {
    //await TrackPlayer.reset();
    stopSampleSound()
  }

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        _handleCallStatus(interval);
      }, 2000);
    }, [counter]),
  );

  const _handleCallStatus = async interval => {
    try {
      const params = { 

        room_id: remoteMessage?.data?.room_id,
        pay_to_id: remoteMessage?.data?.pay_to_id,
      };
     // console.log("find room id in _handleCallStatus in voiceScreen" , params)
      const {data} = await apiCall('POST', ENDPOINTS.GET_CALL_STATUS, params);
      //console.log('data:--in getCallStatus api---', data);
      if (data.status === 200) {
        if (data.data.call_status === 3) {
          clearInterval(interval);
          navigation.navigate('YouAllScreen');
        } else if (data.data.call_status === 5) {
          clearInterval(interval);
          navigation.navigate('YouAllScreen');
        }
      } else if (data.status === 201) {
        navigation.navigate('YouAllScreen');
      } else if (data.status === 401) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function onPressAccept() {
    //togglePause();
    stopSampleSound()
    setIsLoading(true);
    try {
      const params = {
        room_id: remoteMessage?.data?.room_id,
        challenge_id: remoteMessage?.data?.challenge_id,
        call_status: 2,
      };
     // console.log("find room id in onPressAccept in voiceScreen" , params)
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.VIDEO_CALLING_STATUS,
        params,
      );
      // console.log("🚀 ~ file: index.js ~ line 73 ~ onPressAccept ~ data", data)
      if (data.status === 200) {
        setIsLoading(false);
        navigate('VideoCallScreen', {
          data: remoteMessage.data,
          remoteMessage: remoteMessage,
          Status: 1,
        });
      } else if (data.status === 201) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setAlertMessage(e.toString());
    }
  }

  async function onPressReject() {
    //togglePause();
    stopSampleSound()
    setIsLoading(true);
    try {
      const params = {
        room_id: remoteMessage?.data?.room_id,
        challenge_id: remoteMessage?.data?.challenge_id,
        call_status: 4,
      };
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.VIDEO_CALLING_STATUS,
        params,
      );
      if (data.status === 200) {
        setIsLoading(false);
        navigate('YouAllScreen');
      } else if (data.status === 201) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      setAlertMessage(e.toString());
    }
  }
  const OnpressBack = () => {
    navigation.goBack(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  const backAction = () => {
    return true;
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <VocieCallScreen
        OnpressBack={OnpressBack}
        remoteMessage={remoteMessage}
        onPressReject={onPressReject}
        onPressAccept={onPressAccept}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
    </View>
  );
};
export default VocieCall;
