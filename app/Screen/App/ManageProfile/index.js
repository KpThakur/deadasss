import React, {useState, useContext, useEffect, useRef} from 'react';
import ManageProfileScreen from './component/ManageProfile';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import AnimatedAlertSuccess from '../../../Components/AnimatedAlertSuccess';
import {UserContext} from '../../../Utils/UserContext';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {RED_COLOUR_CODE} from '../../../Utils/constant';
const ManageProfile = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const [profileLoader, setProfileLoader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');

  function validationFrom(parameters) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (parameters.Email == '') {
      AnimatedAlert.showAlert();
      setAlertMessage('Please enter your email address');
      return false;
    }
    if (reg.test(parameters.Email) === false) {
      AnimatedAlert.showAlert();
      setAlertMessage('please enter correct email address');
      return false;
    }
    return true;
  }
  async function _handleUpdateProfile(parameters) {
    const valid = await validationFrom(parameters);
    if (valid) {
      try {
        setIsLoading(true);
        let formdata = new FormData();
        formdata.append('first_name', parameters.FirstName);
        formdata.append('last_name', parameters.LastName);
        formdata.append('email', parameters.Email);
        formdata.append('dob', parameters.BirthDay);
        formdata.append('gender', parameters.Gender);
        parameters.filepath.path &&
          formdata.append('profile_pic', {
            uri: parameters.filepath.path,
            type: parameters.filepath.mime,
            name: parameters.filepath.path.substring(
              parameters.filepath.path.lastIndexOf('/') + 1,
            ),
          });
        const {data} = await apiCall(
          'POST',
          ENDPOINTS.UPDATE_PROFILE,
          formdata,
        );
        if (data.status === 200) {
          setIsLoading(false);
          setUserData(data.data);
          setAlertSuccessMessage(data.message);
          AnimatedAlertSuccess.showAlert();
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
    }
  }
  function _handleNavigation() {
    setTimeout(() => {
      navigation.navigate('SettingScreen');
    }, 4000);
  }

  const onLoadProfileStart = () => {
    setProfileLoader(true);
  };
  const onLoadProfileEnd = () => {
    setProfileLoader(false);
  };

  function onPressCross() {
    navigation.goBack(null);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <ManageProfileScreen
        profileLoader={profileLoader}
        onLoadProfileEnd={onLoadProfileEnd}
        onLoadProfileStart={onLoadProfileStart}
        _handleUpdateProfile={_handleUpdateProfile}
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
export default ManageProfile;
