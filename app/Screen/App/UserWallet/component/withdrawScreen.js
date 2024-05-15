import React, {useState, useContext, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
} from 'react-native';
import AnimatedAlert from '../../../../Components/AnimatedAlert';

import {
  BLACK_COLOUR_CODE,
  CHANGE_PASSWORD_COLOUR_CODE,
  FONT_FAMILY_TYPE_WRITER,
  WHITE_COLOR_CODE,
  MAP_KEY,
  BLACK_COLOR_CODE,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_CURSUE,
  FONT_FAMILY_SFU_REGULAR,
  RED_COLOUR_CODE,
  YOU_ALL_COLOUR_CODE,
} from '../../../../Utils/constant';
import styles from '../../../App/CreateAccount/component/styles';
import {UserContext} from '../../../../Utils/UserContext';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../../../../Utils/Loader';
import {apiCall} from '../../../../Utils/httpClient';
import apiEndPoints from '../../../../Utils/apiEndPoints';
import {useNavigation} from '@react-navigation/native';
import Styles from '../../ChallangeScreen/component/styles';
const WithdrawScreen = ({route}) => {
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
              source={require('../../../../Assets/deadasss.png')}
            />

            <Text style={Styles.modalTextHoldStyle}>Info!</Text>
            <Text style={[Styles.modalTextStyle, {marginTop: 15}]}>
              Are you Sure you want to Transfer your Amount
            </Text>

            <View style={Styles.buttnView}>
              <TouchableOpacity onPress={() => onClose()}>
                <Text style={[Styles.buttnText, {color: YOU_ALL_COLOUR_CODE}]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => withdraw()}>
                <Text style={Styles.buttnText}>CONFIRM</Text>
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

  const navigation = useNavigation();
  const [profileModal, setProfileModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {WalletDetails, onPressCross, userWalletDetailsfun} = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('route.params', route.params);

  var setvall = '';
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // Autofill the text input when checkbox is checked
      setTextInputValue(WalletDetails?.user_wallet);
      setvall = WalletDetails?.user_wallet;
      console.log('====================================');
      console.log(setvall);
      console.log('====================================');
    } else {
      setTextInputValue(''); // Clear text input when checkbox is unchecked
    }
  };

  const handleTextInputChange = text => {
    if (text && text <= WalletDetails.user_wallet) {
      setTextInputValue(text);
      console.log('🚀 ~ handleTextInputChange ~ text:', text);
      console.log('===================================   dgfgffg=');
      console.log('textInputValue', textInputValue);
      console.log('====================================');
    } else {
      setTextInputValue('');
    }
  };
  const clickhandler = () => {
    if (textInputValue && textInputValue <= WalletDetails.user_wallet) {
      console.log('🚀 ~ clickhandler ~ textInputValue:', textInputValue);
      // setProfileModal(true);
      openModal();
    } else if (textInputValue === '') {
      setAlertMessage('Please Enter an correct Amount');
      AnimatedAlert.showAlert();
    }
    //  else if (textInputValue > WalletDetails.user_wallet) {
    //   setAlertMessage('Please Enter an correct Amount');
    //   AnimatedAlert.showAlert();
    // }
  };

  // Withdraw API CALL-------------------------------------------

  async function withdraw() {
    // setProfileModal(false);
    closeModal();
    try {
      const params = {
        payment_amount: textInputValue,
      };
      setIsLoading(true);
      const {data} = await apiCall(
        'POST',
        apiEndPoints.withdrawWalletAmount,
        params,
      );
      if (data.status === 200) {
        navigation.navigate('successScreen');
        setIsLoading(false);
        userWalletDetailsfun();
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
    <KeyboardAvoidingView style={styles.container}>
      {isLoading && <Loader state={isLoading} />}
      <View style={styles.body}>
        <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 2, paddingTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 30,
                paddingBottom: 30,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View />
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingTop: 8}}></View>
                <Text style={styles.LoginTextSTyle}>Payment Transfer</Text>
              </View>
              <TouchableOpacity
                onPress={() => onPressCross()}
                style={{paddingRight: 25, paddingTop: 10}}>
                <Text style={styles.ChallengeTxt}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 9, marginRight: 9, marginBottom: 9}}>
              <Text
                style={{
                  color: WHITE_COLOR_CODE,
                  fontFamily: FONT_FAMILY_REGULAR,
                  fontSize: 18,
                }}>
                Your Gains will be automatically transfer to your banking
                account between 24-48 hours.
              </Text>
            </View>
            <View
              style={[
                styles.BusinessContainer,
                {
                  marginTop: '1.8%',
                  paddingHorizontal: '5%',
                  rowGap: 30,
                  height: '50%',
                  paddingTop: '18%',
                },
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.modalText, {fontSize: 18}]}>
                  Total Amount :-
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[styles.modalText, {fontSize: 20, margin: 'auto'}]}>
                    $
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 7,
                      marginLeft: 5,
                      color: '#000',
                    }}>
                    {WalletDetails.user_wallet}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.modalText, {fontSize: 18}]}>
                  Transfer Amount :-
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.modalText,
                      {
                        fontSize: 25,
                        marginHorizontal: 5,
                        paddingTop: 5,
                      },
                    ]}>
                    $
                  </Text>
                  {console.log('=========', textInputValue)}
                  <TextInput
                    defaultValue={
                      isChecked
                        ? `${WalletDetails.user_wallet}`
                        : textInputValue
                    }
                    onChangeText={handleTextInputChange}
                    keyboardType="number-pad"
                    editable={isChecked ? false : true}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,

                      width: '60%',
                      height: 45,
                      paddingHorizontal: '5%',
                      color: BLACK_COLOR_CODE,
                      fontSize: 16,
                      fontFamily: FONT_FAMILY_REGULAR,
                    }}
                    placeholder="0.00"
                    maxLength={4}
                  />
                  {/*   <TextInput
                    value={WalletDetails.user_wallet}
                    secureTextEntry={false}
                    placeholder="0.00"
                    keyboardType="phone-pad"
                    placeholderTextColor="#000"
                    style={{
                      fontFamily: FONT_FAMILY_TYPE_WRITER,
                      fontSize: 16,
                      marginLeft: 15,
                      marginTop: 12,
                    }}
                    maxLength={25}
                  /> */}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  style={{margin: 'auto', borderColor: '#fff'}}
                  value={isChecked}
                  onValueChange={handleCheckBoxChange}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginHorizontal: 10,
                    color: BLACK_COLOR_CODE,
                    fontFamily: FONT_FAMILY_REGULAR,
                    // marginLeft: 5,
                  }}>
                  Are you want to Transfer full wallet Amount
                </Text>
              </View>
            </View>

            <View style={{paddingBottom: 20, paddingTop: 20}}>
              <Button
                onPress={() => clickhandler()}
                buttonText={'Confirm'}
                style={styles.RegistratnBtn}
                buttonLabelStyle={{color: WHITE_COLOR_CODE}}
              />
            </View>
          </View>
        </ScrollView>
        {/* <Modal
          animationType="slide"
          hardwareAccelerated={true}
          transparent={true}
          visible={profileModal}
          onRequestClose={() => {
            setProfileModal(false);
          }}>
          <View style={styles.alertBackground}>
            <View
              style={[
                styles.alertBox,
                {
                  flexDirection: 'column',
                  // backgroundColor: 'aqua',
                  width: '90%',
                  height: '25%',
                },
              ]}>
              <TouchableOpacity
                onPress={() => setProfileModal(false)}
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  width: 40,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 20}}>
                  X
                </Text>
              </TouchableOpacity>
              <View style={{margin: 25}}>
                <Text
                  style={{fontFamily: FONT_FAMILY_SFU_REGULAR, fontSize: 16}}>
                  Are you Sure you want to Transfer your Amount
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 15}}>
                <TouchableOpacity
                  onPress={() => setProfileModal(false)}
                  style={styles.profileModal}
                  underlayColor={'#F5F5F5'}>
                  <Text style={[styles.modalItem, {fontSize: 18}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => withdraw()}
                  // onPress={() => navigation.navigate('successScreen')}
                  style={styles.profileModal}
                  underlayColor={'#F5F5F5'}>
                  <Text style={[styles.modalItem, {fontSize: 18}]}>yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}
        <AppExitModal visible={modalVisible} onClose={closeModal} />
        <AnimatedAlert
          alertMessage={alertMessage}
          alertBGColor={RED_COLOUR_CODE}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default WithdrawScreen;
