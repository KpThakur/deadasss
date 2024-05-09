import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {
  BLACK_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  WHITE_COLOR_CODE,
  OTP_VERIFY_COLOUR_CODE,
} from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import OTPTextView from '../../../../Components/OtpVerification';
const OTPVerificationScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={OTP_VERIFY_COLOUR_CODE} />

        <ScrollView>
          <View style={styles.FirstCOntainer}>
            <Image source={require('../../../../Assets/deadasss.png')} />
            <Text style={styles.LoginTextSTyle}>Verification</Text>
            <Text style={styles.VerifyDescrptn}>
              Enter the verification code you have
            </Text>
            <Text style={[styles.VerifyDescrptn, {bottom: 20}]}>
              received on {props.Email}
            </Text>
          </View>
          <OTPTextView
            handleTextChange={val => props.handleOtp(val)}
            tintColor={COMMON_BLUE_COLOUR}
            containerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 30,
              paddingBottom: 10,
              paddingTop: 0,
            }}
            textInputStyle={{
              borderBottomWidth: 0,
              textAlign: 'center',
              fontSize: 16,
              elevation: 4,
              fontWeight: '500',
              height: 40,
              width: 40,
              backgroundColor: WHITE_COLOR_CODE,
            }}
            inputCount={6}
            inputCellLength={1}
          />
          <Button
            buttonText={'Continue'}
            style={styles.RegistratnBtn}
            buttonLabelStyle={{color: BLACK_COLOUR_CODE}}
            onPress={() => props.onPressContinue()}
          />
          <TouchableOpacity onPress={() => props.onPressResendCode()}>
            <Text style={styles.SendCodeTxt}>Send New Code.</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => props.navTermAndCondtion()} style={styles.DontHaveView}>
                        <Text style={styles.AlredyAccntTxt}>Tap continue to accept <Text style={{ color: COMMON_BLUE_COLOUR, textDecorationLine: 'underline' }}>Terms & Data Policy.</Text></Text>
                    </TouchableOpacity > */}

          <View style={styles.DontHaveView}>
            <Text style={styles.AlredyAccntTxt}>Tap continue to accept</Text>
            <TouchableOpacity onPress={() => props.navTermAndCondtion()}>
              <Text style={[styles.AlredyAccntTxt, {color: COMMON_BLUE_COLOUR, textDecorationLine: 'underline'}]}>Terms & Data Policy.</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default OTPVerificationScreen;
