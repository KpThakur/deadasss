import React, { useState } from 'react';
import TimeUpChallengeStartScreen from './component/TimeUpChallengeStart';
import {
    View, Text, Image, TouchableOpacity
} from 'react-native';
import { FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE } from '../../../Utils/constant';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import moment from "moment";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const TimeUpChallengeStart = ({ route }) => {
    const { data } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [listChallenge, setListChallenge] = useState('');
    const [ItemData, setItemData] = useState('');
    const [ConfirmMinutes, setConfirmMinutes] = useState('');
    const [ChallengeData, setChallengeData] = useState(data);

    useFocusEffect(React.useCallback(() => {
        _handleList()
        return () => { _handleList() }
    }, [])
    );
    
    async function _handleList() {
        try {
            setIsLoading(true)
            const params = {
                "challenge_id": ChallengeData.challenge_id
            }
            const { data } = await apiCall('POST', ENDPOINTS.USER_CHALLENGED_PAYMENT_LIST, params);
            if (data.status === 200) {
                setIsLoading(false)
                setListChallenge(data.data)
            } else if (data.status === 201) {
                data.message === "Challenge  not found !" &&
                    navigation.navigate("TimeUpScreen")
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
    const navigation = useNavigation()



    // const [counter, setCounter] = React.useState('');

    const Seconds = moment().unix();

    const _handleCallWait = (item, index) => {
        setItemData(item)
        var Seconds = moment().unix();
        const seconds = (item.call_start_time - Seconds);
        var confirm = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');
        setConfirmMinutes(confirm)
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 4.5, flexDirection: 'row' }}>
                    {/* <Image style={{ width: 70, height: 70, borderRadius: 80 }} source={require('../../../Assets/image.png')} /> */}
                    <Image style={{ width: 70, height: 70, borderRadius: 80 }} source={{ uri: item.profile_pic }} />
                    <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                        {/* <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 20 }}>{item.first_name + ' ' + item.last_name}</Text> */}
                        <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                rowGap: -20,
                width: '95%',
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY_TYPE_WRITER,
                  fontSize: 20,
                }}>
                {item.first_name + ' '}
              </Text>
              <Text
                style={{
                  fontFamily: FONT_FAMILY_TYPE_WRITER,
                  fontSize: 20,
                }}>
                {item.last_name}
              </Text>
            </View>
                        <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 20, fontSize: 14 }}>Payment Status : Complete</Text>
                        {confirm === "00" || confirm === 0 ?
                            seconds < -1 ?
                                <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 30, fontSize: 14, color: RED_COLOUR_CODE }}> end call</Text>
                                : <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 30, fontSize: 14, color: RED_COLOUR_CODE }}> on call</Text>
                            :
                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 30, fontSize: 14 }}>Videocall will start in :
                                <Text style={{ color: RED_COLOUR_CODE }}>
                                    {seconds < -1 ? ' on call' : ' ' + confirm + ' ' + 'min'}</Text>
                            </Text>
                        }
                        {/* <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, bottom: 30, fontSize: 14 }}>Videocall will start in :
                                <Text style={{ color: RED_COLOUR_CODE }}>
                                {seconds < -1 ? ' on call' : ' ' + confirm + ' ' + 'min'}</Text>
                        </Text> */}
                    </View>
                </View>
                <View style={{ flex: 1.5, alignItems: 'center', marginTop: 10 }}>
                    {item.payment_status == 3 ?
                        <Image source={require('../../../Assets/phone.png')} resizeMode='center' style={{ height: 30, width: 30 }} />
                        :
                        <TouchableOpacity onPress={() => onPressVideoCall(item)}>
                            <Image source={require('../../../Assets/phone_call.png')} resizeMode='center' style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    };


    async function onPressVideoCall(item) {
        setIsLoading(true)
        try {
            const params = {
                "challenge_id": ChallengeData.challenge_id,
                "pay_to_id": item.pay_from_id
            }
            const { data } = await apiCall('POST', ENDPOINTS.CHECK_BUSY_CALL, params);
            if (data.status === 200) {
                setIsLoading(false)
                _handleVideoCall(item)
            } else if (data.status === 201) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                setIsLoading(false)
            } else if (data.status === 202) {
                setAlertMessage("User busy please with for your call!!");
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





    async function _handleVideoCall(item) {
        try {
            const params = {
                "challenge_id": ChallengeData.challenge_id,
                "pay_to_id": item.pay_from_id,
                "room_id": item.room_id,
            }
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.VIDEO_CALLING, params);
            if (data.status === 200) {
                setIsLoading(false)
                navigation.navigate("VideoCallScreen", { data: data.data, remoteMessage: data.data, Status: 2 })
            } else if (data.status === 201) {
                setAlertMessage(data.message);
                AnimatedAlert.showAlert()
                setIsLoading(false)
            } else if (data.status === 202) {
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
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <TimeUpChallengeStartScreen
                listChallenge={listChallenge}
                onPressCross={onPressCross}
                _handleCallWait={_handleCallWait}
                Seconds={Seconds}
                ConfirmMinutes={ConfirmMinutes}
                ItemData={ItemData}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default TimeUpChallengeStart;