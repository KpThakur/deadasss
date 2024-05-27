import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import {
  UPDATE_BTN_COLOUR_CODE,
  WHITE_COLOR_CODE,
  CHANGE_PASSWORD_COLOUR_CODE,
} from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
import {useNavigation} from '@react-navigation/native';
const SettingScreen = props => {
  const navigtaion = useNavigation();
  function onPressManageProfile() {
    navigtaion.navigate('ManageProfile');
  }
  function onPressCreateAccount() {
    navigtaion.navigate('CreateAccount');
  }
  function onPressChangePsswrd() {
    navigtaion.navigate('SettingChangePassword');
  }
  function onPressActiveList() {
    navigtaion.navigate('ActiveChallengeList');
  }
  function onPressPaymentDetail() {
    navigtaion.navigate('UserWallet');
  }
  function onPressAboutUs() {
    navigtaion.navigate('AboutUs');
  }
  function onPressContactUs() {
    navigtaion.navigate('ContactUsScreen');
  }
  function onPressRating() {
    navigtaion.navigate('RatingScreen');
  }
  function onPressChallenge() {
    navigtaion.navigate('ChallangeScreen');
  }
  function onPressTermsAndCondition() {
    navigtaion.navigate('TermAndCondition');
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
        <View style={styles.FirstContainer}>
          <Text style={styles.SettingMainTxt}>Setting</Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.MiddleContain}>
            <TouchableOpacity
              onPress={() => onPressManageProfile()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_manage.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Manage Profile</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => onPressCreateAccount()} style={styles.OptionView}>
                            <View style={styles.ImageContainer}>
                                <Image source={require('../../../../Assets/Create_account.png')} />
                            </View>
                            <View style={styles.ImgeTextContain}>
                                <Text style={styles.OptionTxtMain}>Create Account</Text>
                            </View>
                        </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => onPressChangePsswrd()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_change.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Change Password</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressActiveList()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_active.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Active Challenge List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressPaymentDetail()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/Big_payment.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Payment Details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressAboutUs()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_aboutus.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>About Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressRating()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_star.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Rate Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressContactUs()}
              style={styles.OptionView}>
              <View style={styles.ImageContainer}>
                <Image
                  source={require('../../../../Assets/big_contact.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Contact Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressTermsAndCondition()}
              style={styles.OptionView}>
              <View style={[styles.ImageContainer, {paddingLeft: 2}]}>
                <Image
                  source={require('../../../../Assets/729549-200.png')}
                  style={{height: 40, width: 40, tintColor: '#fff'}}
                />
              </View>
              <View style={styles.ImgeTextContain}>
                <Text style={styles.OptionTxtMain}>Term's & Condition</Text>
              </View>
            </TouchableOpacity>
            <Button
              buttonText={'LOGOUT'}
              style={{backgroundColor: UPDATE_BTN_COLOUR_CODE, marginTop: 25}}
              buttonLabelStyle={{color: WHITE_COLOR_CODE}}
              onPress={() => props.onPressLogout()}
            />
          </View>
        </ScrollView>
        <View
          style={{
            flex: 0.5,
            paddingBottom: 15,
            paddingRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: CHANGE_PASSWORD_COLOUR_CODE,
          }}>
          <TouchableOpacity onPress={() => onPressChallenge()}>
            <Image source={require('../../../../Assets/deadasssDOT.png')} />
          </TouchableOpacity>
          <Image source={require('../../../../Assets/profile.png')} />
        </View>
      </View>
    </View>
  );
};
export default SettingScreen;
