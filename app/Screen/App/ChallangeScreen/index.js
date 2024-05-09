import React, {useState, useContext, useEffect, useCallback} from 'react';
import ChallangeScreen from './component/ChallangeScreen';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import moment from 'moment';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ChallangeScreenView = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  function onPressProfile() {
    navigation.navigate('SettingScreen');
  }

  function videoCall() {
    navigation.navigate('VideoCallScreen');
  }
  function onPressReceiver() {
    navigation.navigate('ChallengeCode');
  }
  async function onPressCreate() {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.CHECK_CHALLENGE);
      if (data.status === 200) {
        data.data.cancel_status === 1 && setIsLoading(false);
        navigation.navigate('ChallengeTimeRemaining', {data: data.data});
      } else if (data.status === 201) {
        setIsLoading(false);
        navigation.navigate('CreateChallenge');
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage('Server Problem');
      AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      _handleCallStatusss();
      getAsyncStorageValue();
    }, []),
  );

  const _handleCallStatusss = async () => {
    try {
      const params = {
        room_id: global.notification.data.room_id,
        pay_to_id: global.notification.data.pay_to_id,
      };
      const {data} = await apiCall('POST', ENDPOINTS.GET_CALL_STATUS, params);
      // console.log("🚀 ~ file: index.js ~ line 66 ~ const_handleCallStatusss= ~ data", data)
      if (data.status === 200) {
        if (data.data.call_status === 1) {
          navigation.navigate('VocieCall', {
            remoteMessage: global.notification,
          });
        }
      } else if (data.status === 201) {
      } else if (data.status === 401) {
      }
    } catch (e) {
      console.log(e);
    }
  };


  // useEffect(() => {
  //   const handleDynamicLink = async link => {
  //     try {
  //       console.log('Received link :', link);
  //       console.log('Received url in  link :', link.url);
  //       console.log('Received utcparameter in link:', link.utmParameters);
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       console.log('User token:', userToken);

  //       const parseQueryParams = url => {
  //         const regex = /[?&]([^=#]+)=([^&#]*)/g;
  //         const params = {};
  //         let match;
  //         while ((match = regex.exec(url))) {
  //           params[match[1]] = decodeURIComponent(match[2]);
  //         }
  //         return params;
  //       };

  //       // const url = new URL(link.url);
  //       // const queryParams = parseQueryParams(url);
  //       // const linkParam = decodeURIComponent(queryParams['link']);
  //       // const code = linkParam.match(/([A-Z0-9]+)$/)[0];
  //       // console.log('Extracted check code:', code);

  //       if (link.url && userToken) {
  //         navigation.navigate('ChallengeCode', );
  //         console.log('Navigating to ChallengeCode with data');
  //       } else {
  //         console.log('User not logged in or incorrect URL');
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       if (link) {
  //         handleDynamicLink(link);
  //       }
  //     });
  //   return () => unsubscribe();
  // }, []);

  const getAsyncStorageValue = async () => {
    const roomID = await AsyncStorage.getItem('roomId');
    const payToId = await AsyncStorage.getItem('payToId');
    const challengeId = await AsyncStorage.getItem('challengeId');
    roomID && _handleCallStatus(roomID, payToId, challengeId);
  };
  const ClearAsyncStorageValue = async () => {
    await AsyncStorage.removeItem('roomId');
    await AsyncStorage.removeItem('payToId');
    await AsyncStorage.removeItem('challengeId');
  };
  const _handleCallStatus = async (roomID, payToId, challengeId) => {
    try {
      const params = {
        room_id: roomID,
        pay_to_id: payToId,
      };
      const {data} = await apiCall('POST', ENDPOINTS.GET_CALL_STATUS, params);
      if (data.status === 200) {
        if (data.data.call_status === 2) {
          CallStatusChange(roomID, payToId, challengeId);
        } else {
        }
      } else if (data.status === 201) {
        ClearAsyncStorageValue();
      } else if (data.status === 401) {
        ClearAsyncStorageValue();
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function CallStatusChange(roomID, payToId, challengeId) {
    try {
      const params = {
        room_id: roomID,
        challenge_id: challengeId,
        call_status: 1,
      };
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.VIDEO_CALLING_STATUS,
        params,
      );
      if (data.status === 200) {
        ClearAsyncStorageValue();
      } else if (data.status === 201) {
        ClearAsyncStorageValue();
      } else if (data.status === 401) {
        ClearAsyncStorageValue();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <ChallangeScreen
        onPressProfile={onPressProfile}
        onPressCreate={onPressCreate}
        onPressReceiver={onPressReceiver}
        videoCall={videoCall}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
    </View>
  );
};
export default ChallangeScreenView;
