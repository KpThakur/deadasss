import React from 'react';
import WelcomeScreen from './component/WelcomeScreen';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const WelcomeView = () => {
    useFocusEffect(
        React.useCallback(() => {
            getFcmToken()
            return () => { getFcmToken() }
        }, [])
    );

    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem("fcmToken", fcmToken)
            console.log("find fcm token>>>", fcmToken)
        } else {
            console.log("Failed", "No token received");
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <WelcomeScreen
            />
        </View>

    )
}
export default WelcomeView;