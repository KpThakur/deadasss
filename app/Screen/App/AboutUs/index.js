import React, { useState, useCallback, useEffect } from 'react';
import AboutUsScreen from './component/AboutUs';
import {
    View
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const AboutUs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [AboutUsDescription, setAboutUs] = useState('');
    const navigation = useNavigation();


    useFocusEffect(useCallback(() => {
        _handleAboutUs()
        return () => { _handleAboutUs() }
    }, [])
    );

    async function _handleAboutUs(params) {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.ABOUT_US);
            console.log('data: ', data);
            if (data.status === 200) {
                setIsLoading(false)
                setAboutUs(data.data)
                // setChallengeList(data.Active_challenge);
            } else if (data.status === 201) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
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
    }

    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <AboutUsScreen
                AboutUsDescription={AboutUsDescription}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default AboutUs;