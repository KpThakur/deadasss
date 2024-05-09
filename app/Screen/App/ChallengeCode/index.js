import React, {useState, useContext, useEffect, useRef} from 'react';
import ChallengeCodeScreen from './component/ChallengeCode';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import {apiCall, setDefaultHeader} from '../../../Utils/httpClient';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import moment from 'moment';

const ChallengeCode = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [Code, setCode] = useState('');
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
  const otpRef = useRef(null);
   console.log("find code>>>>", Code)

  //  console.log("ChallengeCode from route params:", route.params?.challengeCode);
  
  //  useEffect(() => {
    
  //   if (route.params?.challengeCode) {
  //     setCode(route.params.challengeCode); 
  //     otpRef.current?.setValue(route.params.challengeCode); 
  //   }
  // }, [route.params]);
  


  // useEffect(() => {
  //   if (route.params?.challengeCode) {
  //     otpRef.current?.setValue(route.params.challengeCode);
  //   }
  // }, [route.params]);

 

  function handleOtp(value) {
    setCode(value);
  }
  const navigation = useNavigation();

  const validation = () => {
    if (!Code || Code.length === 0) {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter challenge code you have');
      return false;
    }else if (Code.length !== 5) {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter a 5-digit challenge code');
      return false;
    }
     else {
      return true;
    }
  };
  async function onPressContinue() {
    const valid = validation();
    if (valid) {
      try {
        setIsLoading(true);
        const params = {
          challenge_code: Code,
        };
        const {data} = await apiCall(
          'POST',
          ENDPOINTS.CHALLENGE_CODE_VERIFY,
          params,
        );
        if (data.status === 200) {
          setIsLoading(false);
          global.caller_userId = data.data.pay_to_user_id;
          navigation.navigate('PayNowScreen', {data: data.data});
        } else if (data.status === 201) {
          setAlertMessage(data.message);
          AnimatedAlert.showAlert();
          setIsLoading(false);
        } else if (data.status === 202) {
          setAlertMessage(data.message);
          AnimatedAlert.showAlert();
          global.caller_userId = data.data.pay_to_user_id;
          navigation.navigate('VideoCallStart', {data: data.data});
          setIsLoading(false);
        } else if (data.status === 401) {
          setAlertMessage(data.message);
          AnimatedAlert.showAlert();
          setIsLoading(false);
        } else if (data.status === 204) {
          setAlertMessage("You can't call again");
          AnimatedAlert.showAlert();
          setIsLoading(false);
        }
      } catch (error) {
        setAlertMessage('Server Problem');
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } else {
      console.log('validation failed');
    }
  }
  async function onPressResendCode() {
    // try {
    //     setIsLoading(true)
    //     const params = {
    //         "username": Email,
    //     }
    //     const { data } = await apiCall('POST', ENDPOINTS.FORGOT_PASSWORD, params);
    //     if (data.status === 200) {
    //         setDefaultHeader('authorization', data.token);
    //         AnimatedAlertSuccess.showAlert()
    //         setAlertSuccessMessage(data.message);
    //         setIsLoading(false)
    //     } else if (data.status === 201) {
    //         setAlertMessage(data.message);
    //         AnimatedAlert.showAlert()
    //         setIsLoading(false)
    //     } else if (data.status === 401) {
    //         setAlertMessage(data.message);
    //         AnimatedAlert.showAlert()
    //         setIsLoading(false)
    //     }
    // } catch (error) {
    //     setAlertMessage(error.toString());
    //     AnimatedAlert.showAlert()
    //     setIsLoading(false)
    // }
  }
  function navTermAndCondtion() {
    navigation.navigate('TermAndCondition');
  }
  function onPressCross() {
    navigation.goBack(null);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <ChallengeCodeScreen
        // Email={Email}
        handleOtp={handleOtp}
        onPressContinue={onPressContinue}
        onPressResendCode={onPressResendCode}
        navTermAndCondtion={navTermAndCondtion}
        onPressCross={onPressCross}
        otpRef={otpRef}
        Code={Code}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
      <AnimatedAlertSuccess
        alertMessage={alertSuccessMessage}
        alertBGColor={'green'}
      />
    </View>
  );
};
export default ChallengeCode;
