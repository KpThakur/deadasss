import React, { useState } from 'react';
import SettingChangePasswordScreen from './component/SettingChangePassword';
import {
    View
} from 'react-native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../Components/AuthContext';

const SettingChangePassword = () => {
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
    const navigation = useNavigation()
    async function _handleUpdatePassword(parameters) {
        try {
            setIsLoading(true)
            const params = {
                "oldpassword": parameters.OldPassword,
                "newpassword": parameters.NewPassword,
                "confirmpassword": parameters.ConfirmPassword,
            }
            const { data } = await apiCall('POST', ENDPOINTS.UPDATE_PASSWORD, params);
            if (data.status === 200) {
                setIsLoading(false)
                setAlertSuccessMessage(data.message);
                AnimatedAlertSuccess.showAlert()
                _handleLogout()
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

    function _handleNavigation() {
        setTimeout(() => {
            navigation.navigate("SettingScreen")
        }, 4000);
    };
    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <SettingChangePasswordScreen
                _handleUpdatePassword={_handleUpdatePassword}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
            <AnimatedAlertSuccess
                alertMessage={alertSuccessMessage}
                alertBGColor={'green'}
            />
        </View>

    )
}
export default SettingChangePassword;