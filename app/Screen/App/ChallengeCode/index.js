import React, {useState, useContext, useEffect, useRef} from 'react';
import ChallengeCodeScreen from './component/ChallengeCode';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import {
  FONT_FAMILY_TYPE_WRITER,
  RED_COLOUR_CODE,
} from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import {apiCall, setDefaultHeader} from '../../../Utils/httpClient';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Error from '../../../Components/modal/error';

const ChallengeCode = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [Code, setCode] = useState('');
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
  const [listBid, setListBid] = useState([]);

  const [visibleErr, setVisibleErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log('find bid data ???...', listBid);
  const [ItemData, setItemData] = useState('');
  const [ConfirmMinutes, setConfirmMinutes] = useState('');
  const otpRef = useRef(null);
  // console.log('find code>>>>', Code);

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

  useFocusEffect(
    React.useCallback(() => {
      _handleList();
      return () => {
        _handleList();
      };
    }, []),
  );

  // const [data, setData] = useState([
  //   {
  //     payment_id: 202,
  //     call_start_time: 1715327354,
  //     call_end_time: 1715328254,
  //     create_date: '2024-05-10T07:48:14.000Z',
  //     pay_to_user_id: 111,
  //     pay_from_id: 108,
  //     challenge_code: 'MRF5K',
  //     call_status: 5,
  //     challenge_title: 'Test for call check',
  //     user_id: 111,
  //     first_name: 'Vrashank',
  //     last_name: 'Patidar',
  //     profile_pic: 'default.jpg',
  //   },
  // ]);

  async function _handleList() {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.PAYMENT_CHECK);
      console.log('find payment for bid in responce....????...', data);
      if (data.status === 200) {
        setIsLoading(false);
        setListBid(data);
        console.log('find payment for bid in responce 200....????...', data);
      } else if (data.status === 201) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error in catch bid list', error);
      // setAlertMessage(error.toString());
      // AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }

  const Seconds = moment().unix();

  const _handleCallWait = (item, index) => {
    setItemData(item);
    var Seconds = moment().unix();
    const seconds = item.call_start_time - Seconds;
    var confirm = moment
      .utc(moment.duration(seconds, 'seconds').as('milliseconds'))
      .format('mm');
    setConfirmMinutes(confirm);
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 4.9, flexDirection: 'row'}}>
          {/* <Image style={{ width: 70, height: 70, borderRadius: 80 }} source={require('../../../Assets/image.png')} /> */}
          <Image
            style={{width: 60, height: 60, borderRadius: 80}}
            source={{uri: item.profile_pic}}
          />
          <View style={{paddingLeft: 10, justifyContent: 'center'}}>
            {/* <Text style={{fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 20}}>
              {item.first_name + ' ' + item.last_name}
            </Text> */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: -20,
                width: '95%',
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY_TYPE_WRITER,
                  fontSize: 20,
                }}>
                {item.first_name + ' '}
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY_TYPE_WRITER,
                  fontSize: 20,
                }}>
                {item.last_name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONT_FAMILY_TYPE_WRITER,
                bottom: 20,
                fontSize: 14,
              }}>
              Payment Status : Complete
            </Text>
            {confirm === '00' || confirm === 0 ? (
              seconds < -1 ? (
                <Text
                  style={{
                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                    bottom: 30,
                    fontSize: 14,
                    color: RED_COLOUR_CODE,
                  }}>
                  {' '}
                  end call
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                    bottom: 30,
                    fontSize: 14,
                    color: RED_COLOUR_CODE,
                  }}>
                  {' '}
                  on call
                </Text>
              )
            ) : (
              <Text
                style={{
                  fontFamily: FONT_FAMILY_TYPE_WRITER,
                  bottom: 30,
                  fontSize: 14,
                }}>
                Videocall will start in :
                <Text style={{color: RED_COLOUR_CODE}}>
                  {seconds < -1 ? ' on call' : ' ' + confirm + ' ' + 'min'}
                </Text>
              </Text>
            )}
            {/* <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 30, fontSize: 14 }}>Videocall will start in :
                                <Text style={{ color: RED_COLOUR_CODE }}>
                                {seconds < -1 ? ' on call' : ' ' + confirm + ' ' + 'min'}</Text>
                        </Text> */}
          </View>
        </View>
        <View style={{flex: 0.9, alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => onPressVideoCall(item)}>
            <Image
              source={require('../../../Assets/phone_call.png')}
              resizeMode="center"
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  async function onPressVideoCall(item) {
    setIsLoading(true);
    try {
      const params = {
        challenge_id: item.challenge_id,
        pay_to_id: item.pay_to_user_id,
      };
      const {data} = await apiCall('POST', ENDPOINTS.CHECK_BUSY_CALL, params);
      console.log('find response ???', data);
      if (data.status === 200) {
        setIsLoading(false);
        _handleVideoCall(item);
      } else if (data.status === 201) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 202) {
        setAlertMessage('User busy please with for your call!!');
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }

  async function _handleVideoCall(item) {
    try {
      const params = {
        challenge_id: item.challenge_id,
        pay_to_id: item.pay_to_user_id,
        room_id: item.room_id,
      };
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.VIDEO_CALLING, params);
      console.log('find response in VIDEO_CALLING???', data);
      if (data.status === 200) {
        setIsLoading(false);
        navigation.navigate('VideoCallScreen', {
          data: data.data,
          remoteMessage: data.data,
          Status: 2,
        });
      } else if (data.status === 201) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 202) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }

  function handleOtp(value) {
    setCode(value);
  }
  const navigation = useNavigation();

  const validation = () => {
    if (!Code || Code.length === 0) {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter challenge code you have');
      return false;
    } else if (Code.length !== 5) {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter a 5-digit challenge code');
      return false;
    } else {
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
        console.log("find message in challenge code...???", data)
        if (data.status === 200) {
          setIsLoading(false);
          global.caller_userId = data.data.pay_to_user_id;
          navigation.navigate('PayNowScreen', {data: data.data});
        } else if (data.status === 201) {
          setVisibleErr(true);
          setErrorMessage(data.message);
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert();
          setIsLoading(false);
        } else if (data.status === 202) {
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert();
          global.caller_userId = data.data.pay_to_user_id;
          navigation.navigate('VideoCallStart', {data: data.data});
          setIsLoading(false);
        } else if (data.status === 401) {
          setVisibleErr(true);
          setErrorMessage(data.message);
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert();
          setIsLoading(false);
        } else if (data.status === 204) {
          setVisibleErr(true);
          setErrorMessage("You can't call again");
          // setAlertMessage("You can't call again");
          // AnimatedAlert.showAlert();
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
        listBid={listBid}
        _handleCallWait={_handleCallWait}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
      <AnimatedAlertSuccess
        alertMessage={alertSuccessMessage}
        alertBGColor={'green'}
      />
       <Error
        message={errorMessage}
        visible={visibleErr}
        closeModel={() => setVisibleErr(false)}
      />
    </View>
  );
};
export default ChallengeCode;
