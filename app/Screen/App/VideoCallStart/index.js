import React, { useState, useEffect } from 'react';
import VideoCallStart from './component/VideoCallStart';
import { View, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from "moment";
import KeepAwake from 'react-native-keep-awake';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const VideoCallStartView = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation()
    var Seconds = moment().unix();
    const seconds = (data.call_start_time - Seconds);
    // const seconds = 60;
    var confirm = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');

    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [Data, setDATA] = useState(data);
    const [CallStartTime, setCallStartTime] = useState(data.call_start_time );
    const [counter, setCounter] = React.useState(confirm);

    useFocusEffect(
        React.useCallback(() => {
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 60000);
            (counter === 0 || counter === "00" || counter < -1) && _handleCall()
            return () => clearInterval(timer);
        }, [counter])
    );


    useEffect(() => {
        const interval = setInterval(() => {
            _handleCall(interval)
            seconds < -1 && _handleCall()
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    async function _handleCall(interval) {
        if (counter === 0 || counter === "00" || counter < -1 || seconds < -1) {
            setIsLoading(true)
            try {
                const params = {
                    "challenge_id": Data.challenge_id,
                    "pay_to_id": Data.pay_from_id
                }
                const { data } = await apiCall('POST', ENDPOINTS.CHECK_BUSY_CALL, params);
                if (data.status === 200) {
                    setIsLoading(false)
                    clearInterval(interval)
                    _handleVideoCall()
                } else if (data.status === 201) {
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                } else if (data.status === 202) {
                    setAlertMessage("User busy please with for your call!!");
                    AnimatedAlert.showAlert()
                    navigation.navigate("ChallangeScreen")
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                    navigation.navigate("ChallangeScreen")
                }
            } catch (error) {
                setAlertMessage(error.toString());
                AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        }
    }

    async function _handleVideoCall() {
        try {
            const params = {
                "challenge_id": Data.challenge_id,
                "pay_to_id": Data.pay_from_id,
                "room_id": Data.room_id,
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.VIDEO_CALLING, params);
            if (data.status === 200) {
                setIsLoading(false)
                // navigation.navigate("VideoPlay", { data: data.data, remoteMessage: data.data, Status: 2, callType: 'sender' })
                navigation.navigate("VideoCallScreen", { data: data.data, remoteMessage: data.data, Status: 2, callType: 'sender' })
            } else if (data.status === 201) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                navigation.navigate("PaymentReturn")
                // setTimeout(() =>  navigation.navigate("ChallangeScreen"), 2000)
                setIsLoading(false)
            } else if (data.status === 202) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                navigation.navigate("ChallangeScreen")
                setIsLoading(false)
            } else if (data.status === 401) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                setIsLoading(false)
                navigation.navigate("ChallangeScreen")
            }
        } catch (error) {
            setAlertMessage(error.toString());
            AnimatedAlert.showAlert()
            setIsLoading(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [])
    );
    const backAction = () => {
        navigation.goBack(null);
        return true;
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <VideoCallStart
                counter={counter}
                seconds={seconds}
                Seconds={Seconds}
                CallStartTime={CallStartTime}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
               <KeepAwake />
        </View>

    )
}
export default VideoCallStartView;