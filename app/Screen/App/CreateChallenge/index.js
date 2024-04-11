import React, {useState, useContext} from 'react';
import CreateChallenge from './component/CreateChallenge';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {BLACK_COLOUR_CODE, RED_COLOUR_CODE} from '../../../Utils/constant';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../../Utils/UserContext';

const CreateChallengeView = () => {
  const navigation = useNavigation();
  const [selectNumber, setSelectNUmber] = useState(2);
  const [priceCovert, setPriceCovert] = useState('');
  const [ChallengeTitle, setChallengeTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userData, setUserData] = useContext(UserContext);

  function onPressNumber(status) {
    setSelectNUmber(status);
  }

  console.log('find title:-', ChallengeTitle);

  function validationFrom() {
    if (ChallengeTitle === '') {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter challenge title');
      return false;
    }
    if (selectNumber === '') {
      AnimatedAlert.showAlert();
      setAlertMessage('Please select any one number');
      return false;
    }
    if (priceCovert === '') {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter a amount');
      return false;
    }

    return true;
  }

  async function onPressCreateChallenge() {
    const valid = validationFrom();
    if (valid) {
      const totalAmount = selectNumber * priceCovert;
      try {
        const params = {
          challenge_title: ChallengeTitle,
          for_no_of_user: selectNumber,
          challenge_amount: priceCovert,
          total_amount: totalAmount,
        };
        setIsLoading(true);
        const {data} = await apiCall(
          'POST',
          ENDPOINTS.CREATE_CHALLENGE,
          params,
        );
        if (data.status === 200) {
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert()
          setIsLoading(false);
          setChallengeTitle('');
          setPriceCovert('');
          await AsyncStorage.setItem(
            'challengeData',
            JSON.stringify(data.data),
          );
          navigation.navigate('ChallengeTimeRemaining', {data: data.data});
        } else if (data.status === 201) {
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert()
          setIsLoading(false);
        } else if (data.status === 401) {
          // setAlertMessage(data.message);
          // AnimatedAlert.showAlert()
          setIsLoading(false);
        }
      } catch (error) {
        setAlertMessage(error.toString());
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } else {
      console.log('validation failed');
    }
  }
  function onPressCross() {
    navigation.goBack(null);
  }
  function _handlePrice(priceCovert) {
    setPriceCovert(priceCovert);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <CreateChallenge
        onPressCreateChallenge={onPressCreateChallenge}
        _handlePrice={_handlePrice}
        onPressCross={onPressCross}
        onPressNumber={onPressNumber}
        priceCovert={priceCovert}
        selectNumber={selectNumber}
        ChallengeTitle={ChallengeTitle}
        setChallengeTitle={setChallengeTitle}
        userData={userData}
        userAmout={
          ((selectNumber * priceCovert) / 100) * userData.commission_amount
        }
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={BLACK_COLOUR_CODE}
      />
    </View>
  );
};
export default CreateChallengeView;
