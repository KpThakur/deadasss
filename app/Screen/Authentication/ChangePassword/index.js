import React, { useState } from 'react';
import ChangePasswordScreen from './component/ChangePassword';
import {
    View
} from 'react-native';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import Loader from '../../../Utils/Loader';
const ChangePassword = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
    function validationForm(parameters) {
        if (parameters.NewPassword == '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your new password');
            return false;
        }
        if (parameters.ConfirmPassword == '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your confirm password');
            return false;
        }if (parameters.ConfirmPassword !== parameters.NewPassword) {
            AnimatedAlert.showAlert()
            setAlertMessage("Confirm password and password doesn't match ")
            return false;
        }
        return true;
    };
    async function _handleUpdate(parameters) {
        const valid = await validationForm(parameters)
        if (valid) {
            try {
                setIsLoading(true)
                const params = {
                    "newpassword": parameters.NewPassword,
                    "confirmpassword": parameters.ConfirmPassword,
                }
                const { data } = await apiCall('POST', ENDPOINTS.CHANGE_PASSWORD, params);
                if (data.status === 200) {
                    setAlertSuccessMessage(data.message);
                    AnimatedAlertSuccess.showAlert()
                    navigation.navigate("Login")
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
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ChangePasswordScreen
                _handleUpdate={_handleUpdate}
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
export default ChangePassword;