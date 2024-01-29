import React, { useState } from 'react';
import PaymentDetailsScreen from './component/PaymentDetails';
import { View } from 'react-native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import stripe from "tipsi-stripe";
import Loader from '../../../Utils/Loader';
import { useNavigation } from '@react-navigation/native';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import { AuthContext } from '../../../Components/AuthContext';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';

const PaymentDetails = ({ route }) => {
    const { token } = route.params;
    const navigtaion = useNavigation()
    const { signIn } = React.useContext(AuthContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [AccountNumber, setAccountNumber] = useState('');
    const [StripeID, setStripeID] = useState('');
    function validationForm() {
        if (AccountNumber === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter account number');
            return false;
        }
        if (StripeID === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter stripe Id');
            return false;
        }
        return true;
    };
    async function onPressUpdate() {
        const valid = await validationForm()
        console.log('valid: ', valid);
        if (valid) {
            paymentApiCall();
            // try {
            //     setIsLoading(true);
            //     await stripe.paymentRequestWithCardForm({
            //         smsAutofillDisabled: true,
            //         requiredBillingAddressFields: 'zip'
            //     })
            //         .then((token) => {
            //             if (token) {
            //                 console.log('token: ', token);
            //                 setIsLoading(false);
            //             } else {
            //                 setAlertMessage('server Crashed Please Try Again');
            //                 AnimatedAlert.showAlert();
            //                 setIsLoading(false);
            //             }
            //         }).catch(err => {
            //             setIsLoading(false);
            //             setAlertMessage(err.toString());
            //             AnimatedAlert.showAlert();
            //         });
            // } catch (error) {
            //     setAlertMessage(error.toString());
            //     AnimatedAlert.showAlert();
            //     setIsLoading(false);
            // };
        }
        // navigtaion.navigate("YouAllScreen")
    };
    async function paymentApiCall() {
        try {
            setIsLoading(true)
            const params = {
                "account_number": AccountNumber,
                "stripe_id": StripeID,
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_RECEIVED_PAYMENT, params);
            if (data.status === 200) {
                setIsLoading(false)
                signIn(token)
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
        // navigtaion.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <PaymentDetailsScreen
                onPressUpdate={onPressUpdate}
                onPressCross={onPressCross}
                setAccountNumber={setAccountNumber}
                AccountNumber={AccountNumber}
                setStripeID={setStripeID}
                StripeID={StripeID}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default PaymentDetails;