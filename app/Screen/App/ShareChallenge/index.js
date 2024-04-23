import React, {useCallback, useState} from 'react';
import ShareChallengeScreen from './component/ShareChallenge';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedAlert from '../../../Components/AnimatedAlert'
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const ShareChallenge = ({ route }) => {
  const { ChallengeData } = route.params;
  console.log('challange data:>>>> ', ChallengeData);

  const [challengeData, setChallengeData] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  useFocusEffect(
    useCallback(() => {
      _handleChallengeData();
      return () => {
        _handleChallengeData();
      };
    }, []),
  );

  async function _handleChallengeData() {
    const challengeData = await AsyncStorage.getItem('challengeData');
    const challenge_data = JSON.parse(challengeData);
    setChallengeData(challenge_data);
  }
  return (
    <View style={{flex: 1}}>
      <ShareChallengeScreen challengeData={ChallengeData} setAlertMessage={setAlertMessage} AnimatedAlert={AnimatedAlert}/>
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
    </View>
  );
};
export default ShareChallenge;
