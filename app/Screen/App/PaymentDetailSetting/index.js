import React, { useState, useCallback, useEffect } from 'react';
import PaymentDetailSettingScreen from './component/PaymentDetailSetting';
import {
    View
} from 'react-native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const PaymentDetailSetting = () => {
    const navigation = useNavigation();
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [AccountDetails, setAccountDetails] = useState('');
    const [AccountNumber, setAccountNumber] = useState(AccountDetails.account_number);
    const [StripeID, setStripeID] = useState(AccountDetails.stripe_id);
    const [alertSuccessMessage, setAlertSuccessMessage] = useState('');

    async function updatePaymentDetails() {
        try {
            setIsLoading(true)
            const params = {
                "account_number": AccountNumber,
                "stripe_id": StripeID,
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_PAYMENT_DEATAILS, params);
            if (data.status === 200) {
                setIsLoading(false)
                setAlertSuccessMessage(data.message);
                AnimatedAlertSuccess.showAlert()
                _handleNavigation()
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
    function _handleNavigation() {
        setTimeout(() => {
            navigation.navigate("SettingScreen")
        }, 4000);
    }
    useFocusEffect(useCallback(() => {
        _handlePaymentDetail()
        return () => { _handlePaymentDetail() }
    }, [])
    );
    useEffect(() => {
        setStripeID(AccountDetails.stripe_id)
        setAccountNumber(AccountDetails.account_number)
    }, [AccountDetails])
    async function _handlePaymentDetail() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.GET_ACCOUNT_DETAILS);
            if (data.status === 200) {
                setIsLoading(false)
                setAccountDetails(data.data)
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
            <PaymentDetailSettingScreen
                updatePaymentDetails={updatePaymentDetails}
                setAccountNumber={setAccountNumber}
                AccountNumber={AccountNumber}
                setStripeID={setStripeID}
                StripeID={StripeID}
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
export default PaymentDetailSetting;