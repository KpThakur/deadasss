import React, { useState, useEffect, useCallback } from 'react';
import ChallengeTimeRemainingScreen from './component/ChallengeTimeRemaining';
import { View, BackHandler } from 'react-native';
import moment from "moment";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import AsyncStorage from '@react-native-community/async-storage';
const ChallengeTimeRemaining = ({ route }) => {
    const { data } = route.params;
    const [openDialog, setOpenDialog] = useState(false)
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ChallengeData, setChallengeData] = useState(data);
    const [challengeDataShare, setChallengeDataShare] = useState('');

  //  console.log("find challengeDataShare ???????????:- ", challengeDataShare)

    const seconds = (data.expire_time - data.current_time);
    var confirm = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');
    const [counter, setCounter] = React.useState(confirm);

    useFocusEffect(
        React.useCallback(() => {
            onPressCreate()
            const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 60000);
            (counter === 0 || counter === "00" || counter < -1) && CancelChallenge()
            return () => clearInterval(timer);
        }, [counter])
    );
    
    async function onPressCreate() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CHECK_CHALLENGE);
            // console.log("🚀 ~ file: index.js ~ line 31 ~ onPressCreate ~ data", data)
            if (data.status === 200) {
                data.data.cancel_status === 1 &&
                    setIsLoading(false)
                    const seconds = (data.data.expire_time - data.data.current_time);
                    var confirm = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');
                    setCounter(confirm)
                // navigation.navigate("ChallengeTimeRemaining", { data: data.data })
            } else if (data.status === 201) {
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
                setIsLoading(false)
                navigation.navigate("CreateChallenge")
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

    // var startTime = moment(data.current_time, "HH:mm:ss a");
    // var endTime = moment(data.expire_time, "HH:mm:ss a");
    // var duration = moment.duration(endTime.diff(startTime));
    // var confirmMinutes = parseInt(duration.asMinutes()) % 60;

    useFocusEffect(
        useCallback(() => {
          _handleChallengeData();
          return () => {
            _handleChallengeData();
          };
        }, []),
      );
    
      async function _handleChallengeData() {
        const challengeData = await AsyncStorage.getItem('challengeData');
        const challenge_data = JSON.parse(challengeData);
        setChallengeDataShare(challenge_data);
      }

    function onPressShare() {
        navigation.navigate("ShareChallenge", {ChallengeData: challengeDataShare})
    };
    function onPressUser() {
        navigation.navigate("SettingScreen")
    };
    function onPressCancel() {
        setOpenDialog(true)
    };
    async function onPressYes() {
        setOpenDialog(false)
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CANCEL_CHALLENGE);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate("ChallangeScreen")
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
        navigation.goBack(null)
    };

    async function onPressBid() {
        try {
            setIsLoading(true)
            const  params = {
                "challenge_id": ChallengeData.challenge_id
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_CHALLENGED_PAYMENT_LIST, params);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate("TimeUpChallengeStart", { data: ChallengeData })
            } else if (data.status === 201) {
                data.message === "Challenge  not found !" &&
                    navigation.navigate("TimeUpScreen")
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                setIsLoading(false)
            } else if (data.status === 401) {
                console.log('sata',data)
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

    async function CancelChallenge() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.CANCEL_CHALLENGE);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate("ChallangeScreen")
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
    // const [counter, setCounter] = React.useState(10);
    // useFocusEffect(
    //     React.useCallback(() => {
    //         const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 60000);
    //         (counter === 0 || counter < -1) && CancelChallenge()
    //         return () => clearInterval(timer);
    //     }, [counter])
    //     );
    //     console.log('counter: ', counter);
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ChallengeTimeRemainingScreen
                onPressShare={onPressShare}
                onPressCancel={onPressCancel}
                onPressYes={onPressYes}
                setOpenDialog={setOpenDialog}
                onPressBid={onPressBid}
                onPressUser={onPressUser}
                openDialog={openDialog}
                counter={counter}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default ChallengeTimeRemaining;