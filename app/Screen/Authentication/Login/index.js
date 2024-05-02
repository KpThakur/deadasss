import React, {useState, useContext, useEffect} from 'react';
import LoginScreen from './component/Login';
// import AnimatedAlert from '../../../Components/AnimatedAlert';
import {
  FONT_FAMILY_TYPE_WRITER,
  RED_COLOUR_CODE,
} from '../../../Utils/constant';
import auth from '@react-native-firebase/auth';
import Loader from '../../../Utils/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Image, Modal, Text, TouchableOpacity} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {UserContext} from '../../../Utils/UserContext';
import {apiCall, setDefaultHeader} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Components/AuthContext';
import styles from './component/styles';

import Error from '../../../Components/modal/error';
const Login = () => {
  const {signIn} = React.useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState('');
  const [userData, setUserData] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [ActiveModal, setActiveModal] = useState(false);
  const [visibleErr, setVisibleErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  function validationForm(parameters) {
    let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
    if (parameters.Email === '' || parameters?.Email?.trim() === '') {
      // AnimatedAlert.showAlert()
      setVisibleErr(true);
      setErrorMessage('Please enter your email address');
      return false;
    }
    if (reg.test(parameters.Email) === false) {
      setVisibleErr(true);
      setErrorMessage('please enter correct email address');
      return false;
    }
    if (parameters.Password === '') {
      // AnimatedAlert.showAlert()
      setVisibleErr(true);
      setErrorMessage('Please enter password');
      return false;
    }
    return true;
  }
  async function _handleLogin(parameters) {
    const deviceToken = await AsyncStorage.getItem('fcmToken');
    let deviceId = DeviceInfo.getDeviceId();
    let deviceType = DeviceInfo.getDeviceType();
    const valid = await validationForm(parameters);
    if (valid) {
      try {
        setIsLoading(true);
        const params = {
          username: parameters.Email,
          password: parameters.Password,
          device_type: deviceType,
          device_id: deviceId,
          device_token: deviceToken,
        };
        const {data} = await apiCall('POST', ENDPOINTS.USER_SIGN_IN, params);
        console.log('find fcm token in params', params);
        console.log('data: ', data);
        if (data.status === 200) {
          if (data.data.status === 1) {
            if (data.data.verify_status === 1) {
              if (data.data.receive_payment_status === 1) {
                setUserData(data.data);
                setDefaultHeader('authorization', data.token);
                setIsLoading(false);
                signIn(data.token);
              } else {
                setUserData(data.data);
                setDefaultHeader('authorization', data.token);
                setIsLoading(false);
                signIn(data.token);
                // navigation.navigate("PaymentDetails", { token: data.token })
              }
            } else {
              setUserData(data.data);
              setDefaultHeader('authorization', data.token);
              setIsLoading(false);
              navigation.navigate('UserVerification', {
                Email: parameters.Email,
                token: data.token,
              });
              // await auth().signInWithPhoneNumber(data.data.country_code + data.data.mobileno)
              //     .then(confirmResult => {
              //         setUserData(data.data)
              //         setDefaultHeader('authorization', data.token);
              //         setIsLoading(false)
              //         navigation.navigate("UserVerification", { confirmResult: confirmResult, data: data, token: data.token })
              //     })
            }
          } else {
            setIsLoading(false);
            _handlePopUp();
          }
        } else if (data.status === 201) {
          setVisibleErr(true);
          setErrorMessage(data.message);
          // AnimatedAlert.showAlert()
          setIsLoading(false);
        } else if (data.status === 401) {
          setIsLoading(false);
          setVisibleErr(true);
          setErrorMessage(data.message);
          // AnimatedAlert.showAlert()
        }
      } catch (error) {
        // AnimatedAlert.showAlert()
        setIsLoading(false);
        setVisibleErr(true);
        setErrorMessage(error.toString());
      }
    } else {
      console.log('validation failed');
    }
  }
  function _handlePopUp() {
    setActiveModal(true);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <LoginScreen _handleLogin={_handleLogin} />
      {/* <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            /> */}
      <Error
        message={errorMessage}
        visible={visibleErr}
        closeModel={() => setVisibleErr(false)}
      />
      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        transparent={true}
        visible={ActiveModal}
        onRequestClose={() => {
          setActiveModal(false);
        }}>
        <View style={styles.alertBackground}>
          <View style={styles.alertBox}>
            <TouchableOpacity
              onPress={() => setActiveModal(false)}
              style={{
                position: 'absolute',
                right: 20,
                top: 10,
                width: 40,
                alignItems: 'flex-end',
              }}>
              <Text style={{fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 20}}>
                X
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONT_FAMILY_TYPE_WRITER,
                fontSize: 18,
                paddingTop: 20,
              }}>
              User is inactive by admin
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Login;
