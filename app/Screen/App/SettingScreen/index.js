import React, { useState, useContext, useEffect } from 'react';
import SettingScreen from './component/SettingScreen';
import {
    View, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../Components/AuthContext';

import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';

const SettingScreenView = () => {
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigtaion = useNavigation()

    function onPressLogout() {
        Alert.alert(
            "Log out configuration",
            "Are you sure want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                // { text: "OK", onPress: () => signOut() }
                { text: "OK", onPress: () => _handleLogout() }
            ],
            { cancelable: false }
        );
    };
    async function _handleLogout() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.USER_LOGOUT);
            if (data.status === 200) {
                setIsLoading(false)
                signOut()
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
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <SettingScreen
                onPressLogout={onPressLogout}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default SettingScreenView;