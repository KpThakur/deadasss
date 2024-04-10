import React, { useState, useCallback, useEffect } from 'react';
import UserWalletScreen from './component/UserWallet';
import {
    View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const UserWallet = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [AboutUsDescription, setAboutUs] = useState('');
    const [userWalletDetails, setUserWalletDetails] = useState('');
    const [historyData, setHistoryData] = useState([]);

    useFocusEffect(useCallback(() => {
        _UserWalletDetails()
        HistoryFun()
        return () => { _UserWalletDetails(), HistoryFun() }
    }, [])
    );

    async function _UserWalletDetails(params) {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.getwalletAmount);
            console.log("🚀 ~ file: index.js ~ line 30 ~ _UserWalletDetails ~ data", data)
            if (data.status === 200) {
                setIsLoading(false)
                setUserWalletDetails(data.data)
            } else if (data.status === 201) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                setIsLoading(false)
            } else if (data.status === 401) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        } catch (error) {
            setAlertMessage(error.toString());
            AnimatedAlert.showAlert()
            setIsLoading(false)
        }
    }
    async function HistoryFun(params) {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.getPaymentHistory);
            if (data.status === 200) {
                setIsLoading(false)
                setHistoryData(data.data)
            } else if (data.status === 201) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                setIsLoading(false)
            } else if (data.status === 401) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        } catch (error) {
            // setAlertMessage(error.toString());
            // AnimatedAlert.showAlert()
            setIsLoading(false)
        }
    }


    async function WithdrawalFun() {
        if (userWalletDetails.stripe_account_verifie == '0') {
            props.navigation.navigate("CreateAccount")
            // try {
            //     setIsLoading(true)
            //     const { data } = await apiCall('POST', ENDPOINTS.createStripeAccount);
            //     if (data.status === 200) {
            //         setIsLoading(false)
            //         props.navigation.navigate("WebView", { url: data.data.accountLink })
            //     } else if (data.status === 201) {
            //         setAlertMessage(data.message);
            //         AnimatedAlert.showAlert()
            //         setIsLoading(false)
            //     } else if (data.status === 401) {
            //         // setAlertMessage(data.message);
            //         // AnimatedAlert.showAlert()
            //         setIsLoading(false)
            //     }
            // } catch (error) {
            //     setAlertMessage(error.toString());
            //     AnimatedAlert.showAlert()
            //     setIsLoading(false)
            // }
        } else {
            try {
                const params = {
                    'payment_amount': userWalletDetails.user_wallet
                }
                setIsLoading(true)
                const { data } = await apiCall('POST', ENDPOINTS.withdrawWalletAmount, params);
                if (data.status === 200) {
                    setIsLoading(false)
                    _UserWalletDetails()
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

    }


    function onPressCross() {
        props.navigation.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <UserWalletScreen
                userWalletDetails={userWalletDetails}
                historyData={historyData}
                WithdrawalFun={() => WithdrawalFun()}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default UserWallet;