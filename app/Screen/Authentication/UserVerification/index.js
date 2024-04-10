import React, { useState, useContext, useEffect } from 'react';
import UserVerificationScreen from './component/UserVerification';
import {
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import { apiCall, setDefaultHeader } from '../../../Utils/httpClient';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { AuthContext } from '../../../Components/AuthContext';

const UserVerification = ({ route }) => {
    const { Email, token } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useContext(AuthContext);

    const [alertMessage, setAlertMessage] = useState('');
    const [Code, setCode] = useState('');
    const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
    function handleOtp(value) {
        setCode(value)
    }
    const navigation = useNavigation()
    async function onPressContinue() {
        try {
            setIsLoading(true)
            const params = {
                "otp": Code,
            }
            const { data } = await apiCall('POST', ENDPOINTS.OTP_CHECK, params);
            if (data.status === 200) {
                _handleVerification()
                // setIsLoading(false)
                // signIn(token)
                // setDefaultHeader('authorization', token);
                // navigation.navigate('ChangePassword')
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



    async function _handleVerification() {
        try {
            setIsLoading(true)
            const params = {
                "verify_status": 1,
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_VERIFICATION, params);
            if (data.status === 200) {
                signIn(token)
                setDefaultHeader('authorization', token);
                setIsLoading(false)
                // navigation.navigate("PaymentDetails", { token: token })
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


    async function onPressResendCode() {
        try {
            setIsLoading(true)
            const params = {
                "username": Email,
            }
            const { data } = await apiCall('POST', ENDPOINTS.FORGOT_PASSWORD, params);
            if (data.status === 200) {
                setDefaultHeader('authorization', data.token);
                AnimatedAlertSuccess.showAlert()
                setAlertSuccessMessage(data.message);
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
    }

    function navTermAndCondtion() {
        navigation.navigate('TermAndCondition')
    }

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <UserVerificationScreen
                Email={Email}
                handleOtp={handleOtp}
                onPressContinue={onPressContinue}
                onPressResendCode={onPressResendCode}
                navTermAndCondtion={navTermAndCondtion}
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
export default UserVerification;