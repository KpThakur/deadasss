import React, { useState, useEffect, useContext } from 'react';
import UserVerificationScreen from './component/UserVerification';
import {
    View
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import { apiCall, setDefaultHeader } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { AuthContext } from '../../../Components/AuthContext';
const UserVerification = ({ route, navigation }) => {
    const { confirmResult, data, token } = route.params;
    const { signIn } = React.useContext(AuthContext);
    const [ConfirmResult, setConfirmResult] = useState('');
    const [code, setCode] = useState('');
    const [Data, setData] = useState(data);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    useEffect(() => {
        setConfirmResult(confirmResult)
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    function onAuthStateChanged(user) {
        if (user) {
            _handleVerification()
        }
    };
    function handleOtp(value) {
        setCode(value)
    };
    async function onPressContinue() {
        setIsLoading(true)
        if (code !== "") {
            ConfirmResult.confirm(code).then(user => {
                setIsLoading(false)
                _handleVerification()
            })
                .catch(error => {
                    setIsLoading(false)
                    AnimatedAlert.showAlert()
                    setAlertMessage('Please enter correct OTP');
                })
        } else {
            setIsLoading(false)
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your OTP');
        }
    };
    async function _handleVerification() {
        try {
            setIsLoading(true)
            const params = {
                "verify_status": 1,
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_VERIFICATION, params);
            if (data.status === 200) {
                auth().signOut()
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
    async function onPressResend() {
        try {
            setIsLoading(true)
            await auth().signInWithPhoneNumber(data.data.country_code + data.data.mobileno)
                .then(confirmResult => {
                    setIsLoading(false)
                    navigation.navigate("UserVerification", { confirmResult: confirmResult, data: data, token: data.token })
                })
                .catch(er => console.log("error", JSON.stringify(er)));
        } catch (error) {
            setIsLoading(false)
            setAlertMessage(error.toString());
            AnimatedAlert.showAlert()
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <UserVerificationScreen
                handleOtp={handleOtp}
                onPressContinue={onPressContinue}
                data={data}
                onPressResend={onPressResend}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default UserVerification;