import React, {useEffect, useContext, Fragment, useState} from 'react';
import {StatusBar, View, StyleSheet, Image, Text, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {UserContext} from '../app/Utils/UserContext';
import {apiCall, setDefaultHeader} from '../app/Utils/httpClient';
import ENDPOINTS from '../app/Utils/apiEndPoints';
import {FONT_FAMILY_BOLD, WHITE_COLOR_CODE} from '../app/Utils/constant';
import {AuthContext} from '../app/Components/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {navigationRef, isReadyRef} from '../RootNavigation';
import AnimatedAlert from '../app/Components/AnimatedAlert';
import {RED_COLOUR_CODE} from '../app/Utils/constant';

import SplashScreen from '../app/Screen/Splash';
// import SplashScreen from 'react-native-splash-screen';
import WelcomeScreen from '../app/Screen/Authentication/WelcomeScreen';
import RegistrationScreen from '../app/Screen/Authentication/Registration';
import LoginScreen from '../app/Screen/Authentication/Login';
import ForgotPasswordScreen from '../app/Screen/Authentication/ForgotPassword';
import ChangePasswordScreen from '../app/Screen/Authentication/ChangePassword';
import OTPVerificationScreen from '../app/Screen/Authentication/OTPVerification';
import TermAndConditionScreen from '../app/Screen/Authentication/TermAndCondition';

import ChallengeCodeScreen from '../app/Screen/App/ChallengeCode';
import YouAllScreen from '../app/Screen/App/YouAllScreen';
import ChallangeScreen from '../app/Screen/App/ChallangeScreen';
import CreateChallengeScreen from '../app/Screen/App/CreateChallenge';
import PaymentDetailsScreen from '../app/Screen/App/PaymentDetails';
import TimeUpScreen from '../app/Screen/App/TimeUpScreen';
import ChallengeTimeRemainingScreen from '../app/Screen/App/ChallengeTimeRemaining';
import TimeUpChallengeStartScreen from '../app/Screen/App/TimeUpChallengeStart';
import ShareChallengeScreen from '../app/Screen/App/ShareChallenge';
import PayNowScreen from '../app/Screen/App/PayNowScreen';
import VideoCallStartScreen from '../app/Screen/App/VideoCallStart';
import BeforeAcceptScreen from '../app/Screen/App/BeforeAcceptScreen';
import ChallengeLateScreen from '../app/Screen/App/ChallengeLateScreen';
import SettingScreen from '../app/Screen/App/SettingScreen';
import ManageProfileScreen from '../app/Screen/App/ManageProfile';
import CreateAccount from '../app/Screen/App/CreateAccount';
import SettingChangePasswordScreen from '../app/Screen/App/SettingChangePassword';
import ActiveChallengeListScreen from '../app/Screen/App/ActiveChallengeList';
import PaymentDetailSettingScreen from '../app/Screen/App/PaymentDetailSetting';
import AboutUsScreen from '../app/Screen/App/AboutUs';
import ContactUsScreen from '../app/Screen/App/ContactUsScreen';
import RatingScreen from '../app/Screen/App/RatingScreen';
import ReportScreen from '../app/Screen/App/ReportScreen';
import VideoCallScreen from '../app/Screen/App/VideoCallScreen';
import RatingUserScreen from '../app/Screen/App/RatingUserScreen';
import UserVerificationScreen from '../app/Screen/Authentication/UserVerification';
import VocieCallScreen from '../app/Screen/App/VocieCall';
import UserWalletScreen from '../app/Screen/App/UserWallet';
import WebViewScreen from '../app/Screen/App/WebView';
import VideoPlayScreen from '../app/Screen/App/VideoPlay';
import PaymentReturnScreen from '../app/Screen/App/PaymentReturn';
// import * as RootNavigation from "../RootNavigation";

import stripe from 'tipsi-stripe';
import {useFocusEffect} from '@react-navigation/native';
import WithdrawScreen from '../app/Screen/App/UserWallet/component/withdrawScreen';
import SucessScreen from '../app/Screen/App/UserWallet/component/sucessScreen';
import ChallengeCode from '../app/Screen/App/ChallengeCode';

const Stack = createStackNavigator();
const Auth = createStackNavigator();
function AuthStack() {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="UserVerification" component={UserVerificationScreen} />
      <Auth.Screen name="Registration" component={RegistrationScreen} />
      <Auth.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Auth.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Auth.Screen name="TermAndCondition" component={TermAndConditionScreen} />
      <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Auth.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
    </Auth.Navigator>
  );
}
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="YouAllScreen" component={YouAllScreen} />
      <Stack.Screen name="ChallengeCode" component={ChallengeCodeScreen} />
      <Stack.Screen
        name="TimeUpChallengeStart"
        component={TimeUpChallengeStartScreen}
      />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
      <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
      <Stack.Screen name="VideoCallStart" component={VideoCallStartScreen} />
      <Stack.Screen name="RatingUserScreen" component={RatingUserScreen} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen
        name="PaymentDetailSetting"
        component={PaymentDetailSettingScreen}
      />
      <Stack.Screen
        name="ActiveChallengeList"
        component={ActiveChallengeListScreen}
      />
      <Stack.Screen
        name="SettingChangePassword"
        component={SettingChangePasswordScreen}
      />
      <Stack.Screen name="ManageProfile" component={ManageProfileScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="ChallengeLateScreen"
        component={ChallengeLateScreen}
      />
      <Stack.Screen name="BeforeAcceptScreen" component={BeforeAcceptScreen} />
      <Stack.Screen name="PayNowScreen" component={PayNowScreen} />
      <Stack.Screen name="ShareChallenge" component={ShareChallengeScreen} />
      <Stack.Screen
        name="ChallengeTimeRemaining"
        component={ChallengeTimeRemainingScreen}
      />
      <Stack.Screen name="TimeUpScreen" component={TimeUpScreen} />
      <Stack.Screen name="ChallangeScreen" component={ChallangeScreen} />
      <Stack.Screen name="VocieCall" component={VocieCallScreen} />
      <Stack.Screen name="UserWallet" component={UserWalletScreen} />
      <Stack.Screen name="PaymentReturn" component={PaymentReturnScreen} />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="VideoPlay" component={VideoPlayScreen} />
      <Stack.Screen name="successScreen" component={SucessScreen} />

      <Stack.Screen
        name="TermAndCondition"
        component={TermAndConditionScreen}
      />
    </Stack.Navigator>
  );
}
function AuthLoading() {
  const navigation = useNavigation();
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const authContext = React.useMemo(
    () => ({
      signIn: async token => {
        const userToken = token;
        try {
          await setDefaultHeader('authorization', userToken);
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: 'userName', token: userToken});
      },
      signOut: async () => {
        try {
          // setUserData([])
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
    }),
    [],
  );
  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 3000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={styles.ViewContainer}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../app/Assets/deadasss.png')} />
        </View>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loginState.userToken == null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
function Route(props) {
  const [alertMessage, setAlertMessage] = useState('');
  useEffect(() => {
    getToken();
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  // useEffect(() => {
  //     setTimeout(() => {
  //         SplashScreen.hide();
  //       }, 3000);
  // },[])

  const linking = {
    // prefixes: ['http://68.183.93.52/deadasss/', 'deadasss://'],
    // prefixes: ['https://deadasss.com:3000/', 'deadasss://'],
    // prefixes: ['https://deadasss.page.link', 'deadasss://'],
    // prefixes: ['https://itinformatix.org/deadasss', 'deadasss://'],
    prefixes: ['http://192.168.1.21/deadasss', 'deadasss://'],
  };

  useEffect(() => {
    getUrl();
    /*  setTimeout(() => {
      getUrl();
      // CheckCallStatus()
    }, 4000); */
  });

  const getUrl = async () => {
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl === null) {
      return;
    }
    console.log('initialUrl:======= ', initialUrl);
    if (initialUrl.includes('PayNowScreen')) {
      const route = initialUrl.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[1];
      console.log('routeName PayNowScreen:======= ', routeName);
      onPressContinue(routeName);
    } else if (initialUrl.includes('UserWallet')) {
      const route = initialUrl.replace(/.*?:\/\//g, '');
      const routeName = route.split('/')[1];
      console.log('routeName UserWallet:======= ', routeName);
      onPaymentComplete(routeName);
    }
  };

  const navigate = data => {
    setTimeout(() => {
      navigationRef.current.navigate('PayNowScreen', {data: data.data});
      console.log("++=====>>>>>>>>>>>>>",data.data);
    }, 1000);
  };

  const stripeKeyDynamic = async () => {
    try {
      // await AsyncStorage.setItem('agoraId','7878b551491f49aeb284895aedb843d9');
      // stripe.setOptions({
      //     publishableKey: 'pk_test_jJq1wfZCXc2StuOxN1lDqV19',
      //     // androidPayMode: 'test', // Android only
      // });

      const {data} = await apiCall('POST', ENDPOINTS.GET_STRIPE_KEY);
      console.log('find stripeKeyDynamic >>>>>>>>>>>>', data.data);
      console.log('🚀  file: index.js  line 258  stripeKeyDynamic  data', data);
      if (data.status === 200) {
        await AsyncStorage.setItem('agoraId', data.data.agora_app_certificate);
        stripe.setOptions({
          publishableKey: data.data.public_key,
          // androidPayMode: 'test', // Android only
        });
      } else if (data.status === 201) {
        // alert(data.message)
      } else if (data.status === 401) {
        // alert(data.message)
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function onPaymentComplete(Code) {
    try {
      const {data} = await apiCall('POST', ENDPOINTS.checkStripeAccountVerify);
      console.log('data in onPaymentComplete: ', data);
      if (data.status === 200) {
        navigationRef.current.navigate('UserWallet');
      } else if (data.status === 201) {
        setAlertMessage(data?.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 202) {
        setAlertMessage(data?.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 401) {
        setAlertMessage(data?.message);
        AnimatedAlert.showAlert();
      }
    } catch (error) {
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
    }
  }

  async function onPressContinue(Code) {
    console.log('Code: -------------------', Code);
    try {
      const params = {
        challenge_code: Code,
      };
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.CHALLENGE_CODE_VERIFY,
        params,
      );
      console.log('data: ', data);
      if (data.status === 200) {
        navigate(data);
        // navigationRef.current.navigate('PayNowScreen', {data: data.data});
      } else if (data.status === 201) {
        console.log('data.status: ', data.message);
        setAlertMessage(data?.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 202) {
        navigationRef.current.navigate('VideoCallStart', {data: data.data});
      } else if (data.status === 401) {
        setAlertMessage(data?.message);
        AnimatedAlert.showAlert();
      }
    } catch (error) {
      console.log('error: ', error);
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
      // setIsLoading(false)
    }
  }

  const [userData, setUserData] = useContext(UserContext);
  async function getToken() {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('userToken: ', userToken);
      if (userToken === null) {
        const {data} = await apiCall('GET', ENDPOINTS.GENERATE_TOKEN);
        if (data.status === 200) {
          setDefaultHeader('authorization', data.token);
          stripeKeyDynamic();
        } else if (data.status === 201) {
          console.log('data.message: ', data.message);
        } else if (data.status === 401) {
          console.log('data.message: ', data.message);
        }
      } else {
        await setDefaultHeader('authorization', userToken);
        const {data} = await apiCall('GET', ENDPOINTS.GET_USER_PROFILE);
        if (data.status === 200) {
          stripeKeyDynamic();
          setUserData(data.data);
        } else if (data.status === 201) {
          console.log('data.message: ', data.message);
        } else if (data.status === 401) {
          console.log('data.message: ', data.message);
        }
      }
    } catch (error) {
      // alert(error)
    }
  }

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
      </Stack.Navigator>
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
    </NavigationContainer>
  );
}
export default Route;
const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    backgroundColor: WHITE_COLOR_CODE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextContainer: {
    flexDirection: 'row',
    // backgroundColor:'red'
    // flex: 1.5,
    // width: '100%',
    // justifyContent: 'space-evenly'
  },
  TextStyles: {
    fontSize: 13,
    color: '#e62f5f',
    fontFamily: FONT_FAMILY_BOLD,
  },
});
