import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {
  RED_COLOUR_CODE,
  FONT_FAMILY_TYPE_WRITER,
  BLACK_COLOR_CODE,
  WHITE_COLOR_CODE,
  BLACK_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  REGISTRATION_BACKGROUND_COLOUR,
} from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryData from '../../../../Components/CountryData/countryData';

const RegistrationScreen = props => {
  const navigation = useNavigation();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [GenderPopUp, setGenderPopUp] = useState('');
  const [Gender, setGender] = useState('');
  const [filterCountry, SetfilterCountry] = useState(CountryData);
  const [ModalVisible, setModalVisible] = useState(false);
  const [CountrySelected, setCountrySelected] = useState('');
  const [CountryCode, setCountryCode] = useState('');
  const [Countryname, setCountryname] = useState('');
  const [FlagSelected, setFlagSelected] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [BirthDay, setBirthDay] = useState('');
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
  function onPressGender() {
    setGenderPopUp(true);
  }
  function onPressSelectGender(type) {
    setGender(type);
    setGenderPopUp(false);
  }
  function onPressCalender() {
    showMode('date');
    setTimePickerVisible(!timePickerVisible);
  }
  function onPressRegister() {
    const parameters = {
      FirstName: FirstName,
      LastName: LastName,
      Username: Username,
      Email: Email,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      ContactNumber: ContactNumber,
      Gender: Gender,
      BirthDay: BirthDay,
      CountryCode: CountryCode,
      Countryname: Countryname,
    };
    props._handleRegistration(parameters);
  }

  console.log('find country name???',  Countryname);
  function _handleRegion() {
    SetfilterCountry(CountryData);
    setModalVisible(true);
  }
  function OnpressCountry(item) {
    setCountryCode(item.dial_code);
    setCountrySelected(item.name);
    setCountryname(item.code);
    setFlagSelected(item.flag);
    setModalVisible(false);
  }
  function SearchCountry(searchKey) {
    const lowerCased = searchKey.toLowerCase();
    let list = CountryData.filter(data =>
      data.name.toLowerCase().includes(lowerCased),
    );
    SetfilterCountry(list.length > 0 ? list : CountryData);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={REGISTRATION_BACKGROUND_COLOUR} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{paddingTop: 30, paddingBottom: 30, alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY_TYPE_WRITER,
                textAlign: 'center',
                fontSize: 30,
              }}>
              REGISTER
            </Text>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}
              onPress={() => props.setProfileModal(true)}>
              {props.renderFileUri()}
            </TouchableOpacity>
          </View>
          <Input
            onChangeText={FirstName => setFirstName(FirstName)}
            value={FirstName}
            placeholder="First Name"
            secureTextEntry={false}
            leftImage={require('../../../../Assets/user.png')}
          />
          <Input
            onChangeText={LastName => setLastName(LastName)}
            value={LastName}
            placeholder="Last Name"
            secureTextEntry={false}
            leftImage={require('../../../../Assets/user.png')}
          />
          {/* <Input
                        onChangeText={(Username) => setUsername(Username)}
                        value={Username}
                        placeholder="Username"
                        secureTextEntry={false}
                        leftImage={require('../../../../Assets/user.png')}
                    /> */}
          <Input
            onChangeText={Email => setEmail(Email)}
            value={Email}
            placeholder="Email"
            secureTextEntry={false}
            autoCapitalize={'none'}
            leftImage={require('../../../../Assets/email.png')}
          />
          <Input
            onChangeText={Password => setPassword(Password)}
            value={Password}
            placeholder="Password"
            secureTextEntry={true}
            keyboardType={'default'}
            leftImage={require('../../../../Assets/password.png')}
          />
          <Input
            onChangeText={ConfirmPassword =>
              setConfirmPassword(ConfirmPassword)
            }
            value={ConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry={true}
            keyboardType={'default'}
            leftImage={require('../../../../Assets/password.png')}
          />
          <TouchableOpacity
            onPress={() => _handleRegion()}
            style={{
              marginTop: 0,
              borderRadius: 4,
              backgroundColor: WHITE_COLOR_CODE,
              margin: 15,
              marginBottom: 12,
              flexDirection: 'row',
              height: 55,
              alignItems: 'center',
            }}>
            <Image
              style={[styles.GenderImge, {marginTop: 0}]}
              source={require('../../../../Assets/worldwide.png')}
            />
            <Text
              style={{
                fontSize: CountryCode ? 14 : 14,
                fontFamily: FONT_FAMILY_TYPE_WRITER,
                color: BLACK_COLOUR_CODE,
                paddingLeft: 25,
              }}>
              {CountryCode
                ? FlagSelected + ' ' + CountryCode + '  ' + CountrySelected
                : 'Select country'}
            </Text>
          </TouchableOpacity>
          <Input
            onChangeText={ContactNumber => setContactNumber(ContactNumber)}
            value={ContactNumber}
            placeholder="Contact Number"
            secureTextEntry={false}
            keyboardType={'number-pad'}
            maxLength={10}
            leftImage={require('../../../../Assets/Number.png')}
          />
          <View style={styles.GenderDateContainer}>
            <TouchableOpacity
              onPress={() => onPressGender()}
              style={styles.GenderContainer}>
              <Image
                style={styles.GenderImge}
                source={require('../../../../Assets/gender.png')}
              />
              <Text style={[styles.GenderText, {paddingTop: 8}]}>
                {Gender === '' && 'Gender (Optional)'}
                {Gender === 1 && 'Male'}
                {Gender === 2 && 'Female'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressCalender()}
              style={styles.GenderContainer}>
              <Image
                style={styles.GenderImge}
                source={require('../../../../Assets/calendar.png')}
              />
              {/* {
                Platform.OS === "android" &&
                  <Text style={[styles.GenderText, { paddingTop: 10 }]}>
                    {BirthDay ? BirthDay : "Date Of Birth"}
                  </Text>
              } */}
              {Platform.OS === 'android' ? (
                <Text style={[styles.GenderText, {paddingTop: 10}]}>
                  {BirthDay ? BirthDay : 'Date Of Birth'}
                </Text>
              ) : (
                <View>
                  <Text
                    style={[
                      styles.GenderText,
                      {paddingTop: BirthDay ? 20 : 0, fontSize: 16},
                    ]}>
                    {' '}
                    {BirthDay ? BirthDay : 'Date Of Birth'}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 12,
                        paddingLeft: 10,
                        paddingBottom: BirthDay ? 0 : 5,
                      },
                    ]}>
                    {' '}
                    {BirthDay ? null : '(Optional)'}
                  </Text>
                </View>
              )}

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
                          backgroundColor: REGISTRATION_BACKGROUND_COLOUR,
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
                    display="calendar"
                    onChange={onChange}
                    style={{
                      width: '100%',
                      position: Platform.OS === 'ios' ? 'absolute' : '',
                      left: Platform.OS === 'ios' ? 45 : '',
                    }}
                  />
                )
              )}
            </TouchableOpacity>
          </View>
          <Button
            buttonText={'Register'}
            style={styles.RegistratnBtn}
            buttonLabelStyle={{color: WHITE_COLOR_CODE}}
            onPress={() => onPressRegister()}
          />
          {/* <TouchableOpacity onPress={() => props.onPressLoginHere()}>
            <Text style={styles.AlredyAccntTxt}>
              Already have an account?
              <Text style={{ color: RED_COLOUR_CODE }}> Login Here.</Text>
            </Text>
          </TouchableOpacity> */}

          <View style={styles.alrdyAccView}>
            <Text style={styles.AlredyAccntTxt}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.onPressLoginHere()}>
              <Text style={[styles.AlredyAccntTxt, {color: RED_COLOUR_CODE}]}>
                {' '}
                Login Here.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
          visible={props.ProfileModal}
          onRequestClose={() => {
            props.setProfileModal(false);
          }}>
          <View style={styles.alertBackground}>
            <View style={styles.alertBox}>
              <TouchableOpacity
                onPress={() => props.setProfileModal(false)}
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
                onPress={() => props.openMainCamera()}
                underlayColor={'#F5F5F5'}>
                <Image
                  style={{height: 40, width: 40}}
                  source={require('../../../../Assets/cameraNew.png')}
                />
                <Text style={styles.modalItem}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileModal}
                onPress={() => props.openAlbum()}
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
        <Modal
          animationType="fade"
          hardwareAccelerated={true}
          transparent={true}
          visible={ModalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: '100%',
                  borderBottomWidth: 0.5,
                  borderColor: BLACK_COLOUR_CODE,
                  borderBottomColor: '#dadada',
                }}>
                <TextInput
                  placeholder={'Search your country....'}
                  onChangeText={text => SearchCountry(text)}
                  style={styles.TxtInptStyle}
                  placeholderTextColor={BLACK_COLOUR_CODE}
                  selectionColor={BLACK_COLOR_CODE}
                />
                <TouchableOpacity
                  style={styles.TouchableFlse}
                  onPress={() => setModalVisible(false)}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../../../Assets/chat_close_icon.png')}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={filterCountry}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.MainCntrySlctTouchble}
                    onPress={() => {
                      console.log('Pressed country....????:', item);
                      OnpressCountry(item);
                    }}>
                    <Text style={styles.CountryText}>{item.dial_code}</Text>
                    <Text style={styles.CountryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegistrationScreen;
