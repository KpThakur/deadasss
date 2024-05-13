import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import styles from './styles';
import {
  BLACK_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  WHITE_COLOR_CODE,
  YELLOW_COLOUR_CODE,
  OTP_VERIFY_COLOUR_CODE,
  FONT_FAMILY_TYPE_WRITER,
} from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import OTPTextView from '../../../../Components/OtpVerification';
const ChallengeCodeScreen = props => {
  // useEffect(() => {
  //   if (props.Code) {
  //     props.otpRef.current?.setValue(props.Code);
  //   }
  // }, [props.Code]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={YELLOW_COLOUR_CODE} />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: Platform.OS === 'ios' ? 20 : 5,
            justifyContent: 'space-between',
          }}>
          <View style={{width: '6%'}} />
          <View>
            {/* <Text style={styles.ChallengeTxt}>Challenge</Text> */}
          </View>
          <TouchableOpacity
            onPress={() => props.onPressCross()}
            style={{paddingRight: 25, paddingTop: 10}}>
            <Text style={styles.ChallengeTxt}>X</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
        <View style={styles.FirstCOntainer}>
          <Image
            style={styles.imgStyle}
            resizeMode="contain"
            source={require('../../../../Assets/deadasss.png')}
          />
          <Text style={styles.LoginTextSTyle}>Challenge Code</Text>
          <Text style={styles.VerifyDescrptn}>
            Enter the challenge code you have
          </Text>
          {/* <Text style={[styles.VerifyDescrptn, { bottom: 20 }]}>received on {props.Email}</Text> */}
        </View>
        <OTPTextView
         // ref={props.otpRef}
          handleTextChange={(val) => props.handleOtp(val)}
          //  handleTextChange={(val) => console.log("OTP Value:", val)}
          tintColor={COMMON_BLUE_COLOUR}
          containerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 55,
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
          keyboardType={'default'}
          inputCount={5}
          inputCellLength={1}
        />
        <Button
          buttonText={'Continue'}
          style={styles.RegistratnBtn}
          buttonLabelStyle={{color: BLACK_COLOUR_CODE}}
          onPress={() => props.onPressContinue()}
        />
        {/* <TouchableOpacity onPress={() => props.onPressResendCode()}>
                        <Text style={styles.SendCodeTxt}>Send New Code.</Text>
                    </TouchableOpacity> */}
        {/* <TouchableOpacity  onPress={() => props.navTermAndCondtion()} style={styles.DontHaveView}>
                        <Text style={styles.AlredyAccntTxt}>Tap continue to accept <Text style={{ color: COMMON_BLUE_COLOUR, textDecorationLine: 'underline' }}>Terms & Data Policy.</Text></Text>
                    </TouchableOpacity> */}

        {(!props.listBid.error && props.listBid.status ) ? (
          <View
            style={{
              flex: 3.5,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: WHITE_COLOR_CODE,
              marginHorizontal: 20,
              marginTop: 40,
              marginBottom: 20,
              padding: 10,
              backgroundColor: WHITE_COLOR_CODE
            }}>
            <FlatList
              // keyExtractor={(item, index) => index.toString()}
              data={props.listBid?.data}
             // data={props.data}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={() => (
                <View style={{alignItems: 'center', paddingTop: 40}}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY_TYPE_WRITER,
                      color: BLACK_COLOUR_CODE,
                      fontSize: 18,
                    }}>
                    No Bid yet!!
                  </Text>
                </View>
              )}
              renderItem={({item, index}) => props._handleCallWait(item, index)}
            />
          </View>
        ) : null}

        {/* </ScrollView> */}
      </View>
    </View>
  );
};
export default ChallengeCodeScreen;
