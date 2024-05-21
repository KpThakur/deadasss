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
  Platform,
} from 'react-native';
import styles from './styles';
import {
  BLACK_COLOUR_CODE,
  CHANGE_PASSWORD_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  FONT_FAMILY_TYPE_WRITER,
  WHITE_COLOR_CODE,
} from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../../Utils/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
const ManageProfile = props => {
  const [userData, setUserData] = useContext(UserContext);
  const [FirstName, setFirstName] = useState(userData.first_name);
  const [LastName, setLastName] = useState(userData.last_name);
  const [Email, setEmail] = useState(userData.email);
  const [Gender, setGender] = useState(userData.gender);
  const [GenderPopUp, setGenderPopUp] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [BirthDay, setBirthDay] = useState(userData.dob);
  const [ProfileModal, setProfileModal] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [CameraImage, setCameraImage] = useState(userData.profile_pic_path);
  const [filepath, setfilepath] = useState('');

  console.log('find image>>>>', CameraImage);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTimePickerVisible(!timePickerVisible);
    setShow(Platform.OS === 'ios');
    let DateConfirm = moment(currentDate).format('DD/MM/YYYY');
    setDate(currentDate);
    setBirthDay(DateConfirm);
  };
  const onChangeios = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTimePickerVisible(!timePickerVisible);
    setShow(Platform.OS === 'ios');
    let DateConfirm = moment(currentDate).format('DD/MM/YYYY');
    setDate(currentDate);
    setBirthDay(DateConfirm);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const navigation = useNavigation();
  function onPressChallenge() {
    navigation.navigate('ChallangeScreen');
  }
  function onPressUser() {
    navigation.navigate('SettingScreen');
  }
  function onPressGender() {
    setGenderPopUp(true);
  }
  function onPressSelectGender(type) {
    setGender(type);
    setGenderPopUp(false);
  }
  function onPressCalender() {
    setTimePickerVisible(true);
    showMode('date');
  }

  const renderFileUri = () => {
    if (CameraImage !== '') {
      return (
        <View>
          <Fragment>
            {props.profileLoader == true ? (
              <ActivityIndicator
                style={{
                  marginTop: 10,
                  position: 'absolute',
                  zIndex: 1,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                // animating={props.profileLoader}
                size="large"
                color={WHITE_COLOR_CODE}
              />
            ) : null}
            <Image
              onLoadStart={() => props.onLoadProfileStart()}
              onLoadEnd={() => props.onLoadProfileEnd()}
             // source={{ uri: CameraImage }}
              source={{uri: `${CameraImage}`}}
              style={{width: 110, height: 110, borderRadius: 55}}
            />
          </Fragment>
          <Image
            style={{position: 'absolute', bottom: -9, left: -10}}
            source={require('../../../../Assets/border.png')}
          />
        </View>
      );
    } else {
      return (
        <Image source={require('../../../../Assets/profile_select.png')} />
      );
    }
  };
  const openAlbum = () => {
    ImagePicker.openPicker({
      height: 50,
      width: 50,
    }).then(image => {
      setProfileModal(false);
      setCameraImage(image.path);
      setfilepath(image);
    });
  };
  const openMainCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileModal(false);
      setCameraImage(image.path);
      setfilepath(image);
      console.log(image);
    });
  };
  function onPressUpdate() {
    const parameters = {
      filepath: filepath,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Gender: Gender,
      BirthDay: BirthDay,
    };
    props._handleUpdateProfile(parameters);
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 2, justifyContent: 'center', paddingBottom: 30}}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: Platform.OS === 'ios' ? 30 : 5,
                paddingBottom: 30,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View />
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../../../Assets/big_manage.png')} />
                <Text style={styles.LoginTextSTyle}>Manage Profile</Text>
              </View>
              <TouchableOpacity
                onPress={() => props.onPressCross()}
                style={{paddingRight: 25, paddingTop: 10}}>
                <Text style={styles.ChallengeTxt}>X</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../../Assets/big_manage.png')} />
                            <Text style={styles.LoginTextSTyle}>Manage Profile</Text>
                        </View> */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <TouchableOpacity onPress={() => setProfileModal(true)}>
                {renderFileUri()}
                <Image
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    height: 35,
                    width: 35,
                  }}
                  source={require('../../../../Assets/edit.png')}
                />
              </TouchableOpacity>
            </View>
            <Input
              onChangeText={FirstName => setFirstName(FirstName)}
              value={FirstName}
              placeholder="First Name"
              secureTextEntry={false}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
            <Input
              onChangeText={LastName => setLastName(LastName)}
              value={LastName}
              placeholder="Last Name"
              secureTextEntry={false}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
            <Input
              onChangeText={Email => setEmail(Email)}
              value={Email}
              placeholder="Email"
              secureTextEntry={false}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
            <TouchableOpacity
              onPress={() => onPressGender()}
              style={styles.genderContainer}>
              <Text style={styles.genderText}>
                {Gender ? null : 'Gender'}
                {/* {Gender === ""  && 'Gender'}
                                {Gender === null  && 'Gender'} */}
                {Gender === 1 && 'Male'}
                {Gender === 2 && 'Female'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressCalender()}
              style={styles.genderContainer}>
              <Text style={styles.genderText}>
                {BirthDay ? BirthDay : 'Date Of Birth'}
              </Text>
            </TouchableOpacity>
            <Button
              buttonText={'UPDATE'}
              style={styles.RegistratnBtn}
              buttonLabelStyle={{color: WHITE_COLOR_CODE}}
              onPress={() => onPressUpdate()}
            />
          </View>
          <View style={styles.FooterContainer}>
            <TouchableOpacity onPress={() => onPressChallenge()}>
              <Image source={require('../../../../Assets/deadasssDOT.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressUser()}>
              <Image source={require('../../../../Assets/profile.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {Platform.OS === 'ios' ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={timePickerVisible}
            onRequestClose={() => {
              setTimePickerVisible(!timePickerVisible);
            }}>
            <TouchableOpacity
              onPress={() => setTimePickerVisible(!timePickerVisible)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <TouchableOpacity
                activeOpacity={0}
                style={{
                  backgroundColor: '#f4f8f9',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#a9a9a9',
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Select Date Of Birth
                </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(date)}
                  mode={'date'}
                  textColor="#000"
                  maximumDate={new Date()}
                  display={'spinner'}
                  style={{
                    width: 320,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}
                  onChange={dob => {
                    setDate(dob.nativeEvent.timestamp);
                  }}
                />
                <TouchableOpacity
                  onPress={() => onChangeios(date)}
                  style={{
                    height: 45,
                    width: 130,
                    backgroundColor: CHANGE_PASSWORD_COLOUR_CODE,
                    marginTop: 8,
                    marginBottom: 8,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: '#fff'}}>Done</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        ) : (
          show && (
            <DateTimePicker
              maximumDate={new Date()}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )
        )}

        {/* <Modal
                    animationType="slide"
                    hardwareAccelerated={true}
                    transparent={true}
                    visible={timePickerVisible}
                    onRequestClose={() => {
                        setTimePickerVisible(false)
                    }}
                >
                    <View style={styles.MainModalView}>
                        <View style={styles.ModalContainer}>
                            <TouchableOpacity onPress={() => setTimePickerVisible(false)} style={{ position: 'absolute', right: 20, top: 8 }}>
                                <Text style={{ fontSize: 25, color: BLACK_COLOUR_CODE, fontFamily: FONT_FAMILY_TYPE_WRITER }}>X</Text>
                            </TouchableOpacity>
                            <View>
                                <DateTimePicker
                                    maximumDate={new Date()}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display='spinner'
                                    onChange={onChange}
                                    textColor='red'
                                />
                            </View>
                        </View>
                    </View>
                </Modal> */}

        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          transparent={true}
          visible={GenderPopUp}
          onRequestClose={() => {
            setGenderPopUp(false);
          }}>
          <View style={styles.MainModalView}>
            <View style={styles.ModalContainer}>
              <TouchableOpacity
                onPress={() => setGenderPopUp(false)}
                style={{position: 'absolute', right: 20, top: 8}}>
                <Text
                  style={{
                    fontSize: 25,
                    color: BLACK_COLOUR_CODE,
                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                  }}>
                  X
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressSelectGender(1)}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                    fontSize: 24,
                    color:
                      Gender === 1 ? COMMON_BLUE_COLOUR : BLACK_COLOUR_CODE,
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressSelectGender(2)}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                    fontSize: 24,
                    color:
                      Gender === 2 ? COMMON_BLUE_COLOUR : BLACK_COLOUR_CODE,
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          hardwareAccelerated={true}
          transparent={true}
          visible={ProfileModal}
          onRequestClose={() => {
            setProfileModal(false);
          }}>
          <View style={styles.alertBackground}>
            <View style={styles.alertBox}>
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
              <TouchableOpacity
                style={styles.profileModal}
                onPress={() => openMainCamera()}
                underlayColor={'#F5F5F5'}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../../Assets/cameraNew.png')}
                />
                <Text style={styles.modalItem}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileModal}
                onPress={() => openAlbum()}
                underlayColor={'#F5F5F5'}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../../Assets/gallery.png')}
                />
                <Text style={styles.modalItem}>Choose Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default ManageProfile;
