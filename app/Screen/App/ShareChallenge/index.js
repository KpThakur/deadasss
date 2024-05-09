import React, {useCallback, useEffect, useState} from 'react';
import ShareChallengeScreen from './component/ShareChallenge';
import {View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ShareChallenge = ({route}) => {
  const {ChallengeData} = route.params;
  console.log('challange data:>>>> ', ChallengeData);

  const navigation = useNavigation();

  const [challengeData, setChallengeData] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [genratedlink, setGenratedLink] = useState('');

  console.log('find genratedlink in firebase>>>>', genratedlink);

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

  useEffect(() => {
    buildLink();
  }, []);

  const buildLink = async () => {
    const ChallengeCode = ChallengeData?.challenge_code;
    const link = await dynamicLinks().buildLink({
      link: 'https://invertase.io',

      // link: `https://invertase.io?code=${encodeURIComponent(challengeCode)}`,

      domainUriPrefix: 'https://deadasss.page.link/YaCK',
      
      analytics: {
        source: ChallengeCode,
      },
    });

    

    setGenratedLink(link);
  };

  return (
    <View style={{flex: 1}}>
      <ShareChallengeScreen
        challengeData={ChallengeData}
        setAlertMessage={setAlertMessage}
        AnimatedAlert={AnimatedAlert}
        genratedlink={genratedlink}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
    </View>
  );
};
export default ShareChallenge;
