import React, { useState, useContext, useEffect } from 'react';
import RatingUserScreen from './component/RatingUserScreen';
import {
    View, BackHandler
} from 'react-native';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';

const RatingUserScreenView = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
    const [RatingComment, setRatingComment] = useState('');

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

    function reportFun() {
        navigation.navigate("ReportScreen")
    }

    async function onPressCreateRating(defaultRating) {
        try {
            setIsLoading(true)
            const params = {
                "rate": defaultRating,
                "rate_comment": RatingComment,
                "rating_to": 1,
                "user_id_to": global.caller_userId
            }
            const { data } = await apiCall('POST', ENDPOINTS.CREATE_RATING, params);
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
        navigation.navigate("SettingScreen")
        // setTimeout(() => {
        // }, 4000);
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <RatingUserScreen
                reportFun={reportFun}
                onPressCreateRating={(defaultRating) => onPressCreateRating(defaultRating)}
                RatingComment={RatingComment}
                setRatingComment={setRatingComment}
            />
        </View>

    )
}
export default RatingUserScreenView;