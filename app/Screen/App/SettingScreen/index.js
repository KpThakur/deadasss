import React, {useState, useContext, useEffect} from 'react';
import SettingScreen from './component/SettingScreen';
import {View, Alert, TouchableOpacity, Text, Image, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Components/AuthContext';

import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import {
  BLACK_COLOUR_CODE,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_TYPE_WRITER,
  RED_COLOUR_CODE,
  YOU_ALL_COLOUR_CODE,
} from '../../../Utils/constant';
import Styles from '../ChallangeScreen/component/styles';

const SettingScreenView = () => {
  const {signOut} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigtaion = useNavigation();

  //   function onPressLogout() {
  //     Alert.alert(
  //       'Log out configuration',
  //       'Are you sure want to logout?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         // { text: "OK", onPress: () => signOut() }
  //         {text: 'OK', onPress: () => _handleLogout()},
  //       ],
  //       {cancelable: false},
  //     );
  //   }
  const AppExitModal = ({visible, onClose}) => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => onClose()}>
        <View style={Styles.modalMainView}>
          <View style={Styles.modalContainView}>
            <Image
              resizeMode="contain"
              style={Styles.imgStyle}
              source={require('../../../Assets/deadasss.png')}
            />

            <Text style={[Styles.modalTextHoldStyle, {marginTop: 15}]}>
              ! Log out confirmation
            </Text>

            <Text
              style={[
                Styles.modalTextStyle,
                {marginTop: 15, color: BLACK_COLOUR_CODE},
              ]}>
              Are you sure want to logout?
            </Text>

            <View
              style={[
                Styles.buttnView,
                {
                  justifyContent: 'space-around',
                  borderTopWidth: 0.5,
                  paddingTop: 0,
                  marginTop: 10,
                  borderColor: 'grey',
                },
              ]}>
              <TouchableOpacity onPress={() => onClose()}>
                <Text
                  style={[
                    Styles.buttnText,
                    {
                      color: YOU_ALL_COLOUR_CODE,
                      marginRight: 0,
                      marginTop: 5,
                      //   borderRightWidth: 1,
                      //   paddingRight: 70,
                    },
                  ]}>
                  NO
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  borderLeftWidth: 0.5,
                  height: 30,
                  borderColor: 'grey',
                }}></Text>
              <TouchableOpacity onPress={() => _handleLogout()}>
                <Text
                  style={[Styles.buttnText, {marginRight: 0, marginTop: 5}]}>
                  YES
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  async function _handleLogout() {
    closeModal();
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.USER_LOGOUT);
      if (data.status === 200) {
        setIsLoading(false);
        signOut();
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
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}
      <SettingScreen onPressLogout={openModal} />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />
      <AppExitModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
};
export default SettingScreenView;
