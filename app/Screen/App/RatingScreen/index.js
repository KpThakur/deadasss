import React, {useState, useContext} from 'react';
import RatingScreen from './component/RatingScreen';
import {View} from 'react-native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../Utils/UserContext';
const RatingScreenView = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
  const [userData, setUserData] = useContext(UserContext);
  const [RatingComment, setRatingComment] = useState('');
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(userData.avg_app_rating);
  const navigation = useNavigation();

  // console.log('find rating', defaultRating);

  //   function validationFrom() {
  //     if (!defaultRating) {
  //       AnimatedAlert.showAlert();
  //       setAlertMessage('Please select a rating before submitting');
  //       return false;
  //     }
  //     return true;
  //   }

  async function onPressCreateRating() {
    // const valid = validationFrom();
    // if (valid) {
    try {
      setIsLoading(true);
      const params = {
        rate: defaultRating,
        rate_comment: RatingComment,
        rating_to: 2,
      };
      const {data} = await apiCall('POST', ENDPOINTS.CREATE_RATING, params);
      if (data.status === 200) {
        setIsLoading(false);
        setAlertSuccessMessage(data.message);
        AnimatedAlertSuccess.showAlert();
        // setUserData(data.data)
        _handleNavigation();
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
    // }
  }
  function _handleNavigation() {
    navigation.navigate('ChallangeScreen');
    // setTimeout(() => {
    //     navigation.navigate("ChallangeScreen")
    // },2000);
  }
  function onPressCross() {
    navigation.goBack(null);
  }

  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <RatingScreen
        maxRating={maxRating}
        defaultRating={defaultRating}
        setDefaultRating={setDefaultRating}
        RatingComment={RatingComment}
        setRatingComment={setRatingComment}
        onPressCreateRating={onPressCreateRating}
        onPressCross={onPressCross}
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
export default RatingScreenView;
