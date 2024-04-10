import React, { useCallback, useState, useEffect } from 'react';
import ActiveChallengeListScreen from './component/ActiveChallengeList';
import {
    View
} from 'react-native';
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
const ActiveChallengeList = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [challengeList, setChallengeList] = useState('');
    const [ExpireList, setExpireList] = useState('');
    const [ConfirmTime, setConfirmTime] = useState('');

    useFocusEffect(useCallback(() => {
        _handleList()
        return () => { _handleList() }
    }, [])
    );
    useEffect(() => {
        if (challengeList === undefined || challengeList === "") {
            setConfirmTime(0)
        } else {
            const seconds = (challengeList.expire_time - challengeList.current_time);
            var confirm = moment.utc(moment.duration(seconds, 'seconds').as('milliseconds')).format('mm');
            setConfirmTime(confirm)
        }
    }, [challengeList]);

    async function _handleList() {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.USER_CHALLENGE_LIST);
            if (data.status === 200) {
                setIsLoading(false)
                setChallengeList(data.Active_challenge);
                setExpireList(data.Expire_challenge);
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
    };
    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <ActiveChallengeListScreen
                ConfirmTime={ConfirmTime}
                ExpireList={ExpireList}
                challengeList={challengeList}
                onPressCross={onPressCross}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>

    )
}
export default ActiveChallengeList;