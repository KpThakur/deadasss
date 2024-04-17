import React, { useState, useEffect, useContext } from 'react';
import PayNowScreen from './component/PayNowScreen';
import { View, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import { UserContext } from '../../../Utils/UserContext';
import moment from "moment";
import stripe from "tipsi-stripe";
const PayNowScreenView = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation()
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [FormData, setFormData] = useState('');
    const [StripeToken, setStripeToken] = useState('');
    const [DataChallenege, setDataChallenege] = useState(data);
    const [userData, setUserData] = useContext(UserContext);
    const [defaultRating, setDefaultRating] = useState(data.rating);

   // console.log("find stripeToken >>>>>", StripeToken)


    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [])
    );
    const backAction = () => {
        return true;
    };
    const seconds = data.expire_time - data.current_time;
    var confirmMinute = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');
    const [counter, setCounter] = React.useState(confirmMinute);

    useFocusEffect(
        React.useCallback(() => {
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 60000);
            (counter === 0 || counter < -1) && navigation.navigate("ChallengeLateScreen")
            return () => clearInterval(timer);
        }, [counter === 0 && navigation.navigate("ChallengeLateScreen")])
    );

    // const onPressPayNow = async (form) => {
    //     setFormData(form)
    //     try {
    //         if (form.status.number === "valid" && form.status.cvc === 'valid' && form.status.expiry === "valid") {
    //             const expiryArray = form.values.expiry.split('/')
    //             const params = {
    //                 number: form.values.number,
    //                 expMonth: parseInt(expiryArray[0]),
    //                 expYear: parseInt(expiryArray[1]),
    //                 cvc: form.values.cvc,
    //             }
    //             const tok = await stripe.createTokenWithCard(params)
    //             console.log("🚀 ~ file: index.js ~ line 59 ~ onPressPayNow ~ tok", tok)
    //             setStripeToken(tok.tokenId);
    //         }
    //         else {
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const _handlePayment = async (form) => {
        await stripe.paymentRequestWithCardForm({
            theme: {
                primaryBackgroundColor: 'white',
                secondaryBackgroundColor: 'white',
                primaryForegroundColor: 'black',
                secondaryForegroundColor: 'black',
                accentColor: 'blue',
                errorColor: 'red',
            },
        })
            .then(async (token) => {
                setStripeToken(token.id)
                try {
                    setIsLoading(true)
                    try {
                        setIsLoading(true)
                        const params = {
                            "stripe_token": token.id,
                            "challenge_id": DataChallenege.challenge_id
                        }
                        console.log('params: ', params);
                        const { data } = await apiCall('POST', ENDPOINTS.PAYMENT_FOR_CHALLENGE, params);
                        console.log('responce data in handlepayment >>>>>.: ', data);
                        if (data.status === 200) {
                            setIsLoading(false)
                            navigation.navigate("VideoCallStart", { data: data.data })
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
                        setAlertMessage('Your credentials are either missing or wrong. Try again.');
                        AnimatedAlert.showAlert()
                        setIsLoading(false)
                    }
                } catch (e) {
                    setIsLoading(false)
                    console.log('Error', e)
                }
            }).catch(err => {
                console.log('err', err)
            });
    }


    function onPressSetting() {
        navigation.navigate("SettingScreen")
    };
    function onPressChallenge() {
        navigation.navigate("ChallangeScreen")
    };
    async function _handlePayment_old() {
        try {
            setIsLoading(true)
            const params = {
                "stripe_token": StripeToken,
                "challenge_id": DataChallenege.challenge_id
            }
            console.log('params: ', params);
            const { data } = await apiCall('POST', ENDPOINTS.PAYMENT_FOR_CHALLENGE, params);
            console.log('data: ', data);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate("VideoCallStart", { data: data.data })
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
            setAlertMessage('Your credentials are either missing or wrong. Try again.');
            AnimatedAlert.showAlert()
            setIsLoading(false)
        }
    }
    function onPressCross() {
        navigation.goBack(null)
    };


    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <PayNowScreen
                // onPressPayNow={onPressPayNow}
                _handlePayment={_handlePayment}
                onPressSetting={onPressSetting}
                onPressChallenge={onPressChallenge}
                data={data}
                counter={counter}
                FormData={FormData}
                maxRating={maxRating}
                defaultRating={defaultRating}
                setDefaultRating={setDefaultRating}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />





        </View>

    )
}
export default PayNowScreenView;