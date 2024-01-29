import React, { useState } from 'react';
import ForgotPasswordScreen from './component/ForgotPassword';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import { apiCall, setDefaultHeader } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';

const ForgotPassword = () => {
    const [Email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigation = useNavigation()
    function validationFrom() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (Email == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your email address');
            return false;
        }
        if (reg.test(Email) === false) {
            AnimatedAlert.showAlert()
            setAlertMessage("please enter correct email address");
            return false;
        }
        //  if (Email.length <= 9) {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage("contact number should be min 10 digit");
        //     return false;
        // }
        return true;
    };
    async function onPressCode() {
        const valid = await validationFrom()
        if (valid) {
            try {
                setIsLoading(true)
                const params = {
                    "username": Email,
                }
                const { data } = await apiCall('POST', ENDPOINTS.FORGOT_PASSWORD, params);
                console.log("🚀 ~ file: index.js ~ line 44 ~ onPressCode ~ data", data)
                if (data.status === 200) {
                    setDefaultHeader('authorization', data.token);
                    setIsLoading(false)
                    navigation.navigate("OTPVerification", { Email: Email })
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
    function onPressLoginHere() {
        navigation.navigate("Login");
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ForgotPasswordScreen
                onPressCode={onPressCode}
                onPressLoginHere={onPressLoginHere}
                Email={Email}
                setEmail={setEmail}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default ForgotPassword;