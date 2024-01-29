import React from 'react';
import {
    View, Text, Image, ScrollView,TouchableOpacity
} from 'react-native';
import styles from './styles';
import { BLACK_COLOUR_CODE, COMMON_BLUE_COLOUR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE } from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import OTPTextView from '../../../../Components/OtpVerification'

const UserVerificationScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.FirstCOntainer}>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <Text style={styles.LoginTextSTyle}>Verification</Text>
                        <Text style={styles.VerifyDescrptn}>Enter the verification code you have</Text>
                        <Text style={[styles.VerifyDescrptn, { bottom: 20 }]}>received on {props.data.data.country_code + ' ' + props.data.data.mobileno}</Text>
                    </View>
                    <OTPTextView
                        handleTextChange={(val) => props.handleOtp(val)}
                        tintColor={COMMON_BLUE_COLOUR}
                        containerStyle={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 30, paddingBottom: 10, paddingTop: 0
                        }}
                        textInputStyle={{
                            borderBottomWidth: 0,
                            textAlign: "center",
                            fontSize: 16,
                            elevation: 4,
                            fontWeight: "500",
                            height: 40,
                            width: 40,
                            backgroundColor: WHITE_COLOR_CODE
                        }}
                        inputCount={6}
                        inputCellLength={1}
                    />
                    <Button
                        buttonText={"Continue"}
                        style={styles.RegistratnBtn}
                        buttonLabelStyle={{ color: BLACK_COLOUR_CODE }}
                        onPress={() => props.onPressContinue()}
                    />
                    <TouchableOpacity onPress={() => props.onPressResend()}>
                        <Text style={styles.SendCodeTxt}>Send New Code.</Text>
                    </TouchableOpacity>
                    <View style={styles.DontHaveView}>
                        <Text style={styles.AlredyAccntTxt}>Tap continue to accept <Text style={{ color: COMMON_BLUE_COLOUR, textDecorationLine: 'underline' }}>Terms & Data Policy.</Text></Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default UserVerificationScreen;