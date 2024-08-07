import React, {useState, useContext} from 'react';
import ReportScreen from './component/ReportScreen';
import {View} from 'react-native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../Utils/UserContext';
const ReportScreenView = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
  const [userData, setUserData] = useContext(UserContext);
 // const [RatingComment, setRatingComment] = useState(2);
  const [RatingComment, setRatingComment] = useState('');
  const navigation = useNavigation();

  console.log("check Reprot message", RatingComment);

  const validation = () => {
    if (RatingComment === '') {
      setAlertMessage('Please provide a description for the report.');
      AnimatedAlert.showAlert();
      return false;
    }
    return true;
  };


  async function onPressCreateRating() {
    const valid = validation();
    if (valid) {
        try {
            setIsLoading(true);
            const params = {
              report_to: global.caller_userId,
              report_msg: RatingComment,
            };
            const {data} = await apiCall('POST', ENDPOINTS.createReport, params);
            if (data.status === 200) {
              setAlertSuccessMessage(data.message);
              AnimatedAlertSuccess.showAlert();
              setIsLoading(false);
              _handleNavigation();
              setRatingComment('');
            } else if (data.status === 201) {
              setAlertMessage(data.message);
              AnimatedAlert.showAlert();
              setIsLoading(false);
            } else if (data.status === 401) {
              setAlertMessage(data.message);
              AnimatedAlert.showAlert();
              setIsLoading(false);
            }
          } catch (error) {
            setAlertMessage(error.toString());
            AnimatedAlert.showAlert();
            setIsLoading(false);
          }
    } else {
        console.log("validation failed")
    }
  }

  function _handleNavigation() {
    setTimeout(() => {
      navigation.navigate('ChallangeScreen');
    }, 1500);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <ReportScreen
        RatingComment={RatingComment}
        setRatingComment={setRatingComment}
        onPressCreateRating={onPressCreateRating}
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
  );
};
export default ReportScreenView;
