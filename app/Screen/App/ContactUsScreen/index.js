import React, { useState, useContext, useEffect } from 'react';
import ContactUsScreen from './component/ContactUsScreen';
import {
    View
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const ContactUsScreenView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ContactData, setContactData] = useState('');
    const navigation = useNavigation()
    useFocusEffect(
        React.useCallback(() => {
            _handle_contact()
        }, [])
    );
    async function _handle_contact() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CONTACT_US);
            if (data.status === 200) {
                setContactData(data.data)
                setIsLoading(false)
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
    };

    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ContactUsScreen
                ContactData={ContactData}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default ContactUsScreenView;