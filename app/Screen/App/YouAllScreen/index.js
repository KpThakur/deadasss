import React, { useState, useContext, useEffect } from 'react';
import YouAllScreen from './component/YouAllScreen';
import {
    View, Platform, Linking, Text
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const YouAllScreenView = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [Data, setData] = useState('');
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                navigation.navigate("ChallangeScreen", { data: Data })
            }, 1000);
            CheckChallenge()
        }, [])
    );


    async function CheckChallenge() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CHECK_CHALLENGE);
            console.log("🚀 ~ file: index.js ~ line 31 ~ CheckChallenge ~ data", data)
            if (data.status === 200) {
                setIsLoading(false)
                setData(data.data)
            } else if (data.status === 201) {
                setIsLoading(false)
            } else if (data.status === 401) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        } catch (error) {
            setAlertMessage(error.toString());
            AnimatedAlert.showAlert()
            setIsLoading(false)
        }
    };
    function onPressUser() {
        navigation.navigate("ChallangeScreen", { data: Data })
    }
    function onPressReceiver() {
        navigation.navigate("ChallengeCode")
    }
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <YouAllScreen
                Data={Data}
                onPressUser={onPressUser}
                onPressReceiver={onPressReceiver}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>
    )
}
export default YouAllScreenView;