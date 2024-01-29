import React, { useState, useContext, useEffect } from 'react';
import PaymentReturnScreen from './component/PaymentReturn';
import {
    View,BackHandler
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import moment from 'moment'
const PaymentReturnView = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    function onPressProfile() {
        navigation.navigate("SettingScreen")
    };

    function videoCall() {
        navigation.navigate("VideoCallScreen")
    };
    function onPressReceiver() {
        navigation.navigate("ChallengeCode")
    }
    

    async function onPressCreate() {
        navigation.navigate("ChallangeScreen")
    };

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [])
    );
    const backAction = () => {
        return true;
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <PaymentReturnScreen
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

    )
}
export default PaymentReturnView;