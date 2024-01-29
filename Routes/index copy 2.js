import React, { useEffect, useContext, Fragment } from 'react';
import { StatusBar, View, StyleSheet, Image, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { UserContext } from '../app/Utils/UserContext';
import { apiCall, setDefaultHeader } from '../app/Utils/httpClient';
import ENDPOINTS from '../app/Utils/apiEndPoints';
import { FONT_FAMILY_BOLD, WHITE_COLOR_CODE } from '../app/Utils/constant';
import { AuthContext } from '../app/Components/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from '../app/Screen/Splash';
import WelcomeScreen from '../app/Screen/Authentication/WelcomeScreen';
import RegistrationScreen from '../app/Screen/Authentication/Registration';
import LoginScreen from '../app/Screen/Authentication/Login';
import ForgotPasswordScreen from '../app/Screen/Authentication/ForgotPassword';
import ChangePasswordScreen from '../app/Screen/Authentication/ChangePassword';
import OTPVerificationScreen from '../app/Screen/Authentication/OTPVerification';

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
import SettingChangePasswordScreen from '../app/Screen/App/SettingChangePassword';
import ActiveChallengeListScreen from '../app/Screen/App/ActiveChallengeList';
import PaymentDetailSettingScreen from '../app/Screen/App/PaymentDetailSetting';
import AboutUsScreen from '../app/Screen/App/AboutUs';
import ContactUsScreen from '../app/Screen/App/ContactUsScreen';
import RatingScreen from '../app/Screen/App/RatingScreen';
import VideoCallScreen from '../app/Screen/App/VideoCallScreen';
import RatingUserScreen from '../app/Screen/App/RatingUserScreen';
import UserVerificationScreen from '../app/Screen/Authentication/UserVerification';

const Stack = createStackNavigator();
const Auth = createStackNavigator();

function AuthStack() {
    return (
        <Auth.Navigator screenOptions={{ headerShown: false }} >
            <Auth.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Auth.Screen name="Login" component={LoginScreen} />
            <Auth.Screen name="UserVerification" component={UserVerificationScreen} />
            <Auth.Screen name="Registration" component={RegistrationScreen} />
            <Auth.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Auth.Screen name="OTPVerification" component={OTPVerificationScreen} />
            <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Auth.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
        </Auth.Navigator>
    )
}
function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="YouAllScreen" component={YouAllScreen} />
            <Stack.Screen name="ChallengeCode" component={ChallengeCodeScreen} />
            <Stack.Screen name="TimeUpChallengeStart" component={TimeUpChallengeStartScreen} />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
            <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
            <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
            <Stack.Screen name="RatingUserScreen" component={RatingUserScreen} />
            <Stack.Screen name="RatingScreen" component={RatingScreen} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="PaymentDetailSetting" component={PaymentDetailSettingScreen} />
            <Stack.Screen name="ActiveChallengeList" component={ActiveChallengeListScreen} />
            <Stack.Screen name="SettingChangePassword" component={SettingChangePasswordScreen} />
            <Stack.Screen name="ManageProfile" component={ManageProfileScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="ChallengeLateScreen" component={ChallengeLateScreen} />
            <Stack.Screen name="BeforeAcceptScreen" component={BeforeAcceptScreen} />
            <Stack.Screen name="VideoCallStart" component={VideoCallStartScreen} />
            <Stack.Screen name="PayNowScreen" component={PayNowScreen} />
            <Stack.Screen name="ShareChallenge" component={ShareChallengeScreen} />
            <Stack.Screen name="ChallengeTimeRemaining" component={ChallengeTimeRemainingScreen} />
            <Stack.Screen name="TimeUpScreen" component={TimeUpScreen} />
            {/* <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} /> */}
            <Stack.Screen name="ChallangeScreen" component={ChallangeScreen} />
        </Stack.Navigator>
    )
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
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const [userData, setUserData] = useContext(UserContext);

    const authContext = React.useMemo(() => ({
        signIn: async (token) => {
            const userToken = token;
            try {
                await setDefaultHeader('authorization', userToken);
                await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', id: "userName", token: userToken });
        },
        signOut: async () => {
            try {
                setUserData([])
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
        },
    }), []);
    React.useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, });
        }, 3000);
    }, []);
    if (loginState.isLoading) {
        return (
            <View style={styles.ViewContainer}>
                <StatusBar
                    translucent={true}
                    backgroundColor='transparent'
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../app/Assets/deadasss.png')} />
                </View>
            </View>
        );
    }
    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {loginState.userToken == null ? (
                    <Stack.Screen name="Auth" component={AuthStack} />
                ) : (
                        <Stack.Screen name="App" component={AppStack} />
                    )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
function Route() {
    useEffect(() => {
        getToken()
    }, [])
    const [userData, setUserData] = useContext(UserContext);
    async function getToken() {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            console.log('userToken: ', userToken);
            if (userToken === null) {
                const { data } = await apiCall('GET', ENDPOINTS.GENERATE_TOKEN);
                if (data.status === 200) {
                    console.log('generatedata: ', data.token);
                    setDefaultHeader('authorization', data.token)
                } else if (data.status === 201) {
                    console.log('data.message: ', data.message);
                } else if (data.status === 401) {
                    console.log('data.message: ', data.message);
                }
            } else {
                await setDefaultHeader('authorization', userToken);
                const { data } = await apiCall('GET', ENDPOINTS.GET_USER_PROFILE);
                console.log('data getttt: ', data);
                if (data.status === 200) {
                    setUserData(data.data)
                } else if (data.status === 201) {
                    console.log('data.message: ', data.message);
                } else if (data.status === 401) {
                    console.log('data.message: ', data.message);
                }
                console.log('AuthToken', userToken)
            }
        } catch (error) {
            alert(error)
        }
    }

    const linking = {
        prefixes: ['deadasss://'],
        config: {
            screens: {
                Login: 'Login',
            }
        },
    };
    return (
        <NavigationContainer linking={linking}  >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthLoading" component={AuthLoading} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Route;
const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        backgroundColor: WHITE_COLOR_CODE,
        justifyContent: 'center',
        alignItems: 'center'
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
        color: "#e62f5f",
        fontFamily: FONT_FAMILY_BOLD
    }
})
