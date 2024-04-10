import React, { useState } from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity,StatusBar
} from 'react-native';
import styles from './styles';
import { WHITE_COLOR_CODE, LOGIN_COLOUR_CODE ,FONT_FAMILY_TYPE_WRITER,COMMON_BLUE_COLOUR} from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
const ForgotPasswordScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <StatusBar backgroundColor={LOGIN_COLOUR_CODE} />

                <ScrollView>
                    <View style={styles.FirstCOntainer}>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <Text style={styles.LoginTextSTyle}>Forgot Password</Text>
                    </View>
                    <Input
                        onChangeText={(Email) => props.setEmail(Email)}
                        value={props.Email}
                        placeholder="Email"
                        secureTextEntry={false}
                        autoCapitalize={"none"}
                        leftImage={require('../../../../Assets/email.png')}
                    />
                    <Button
                        buttonText={"Send Verification Code"}
                        style={styles.RegistratnBtn}
                        buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                        onPress={() => props.onPressCode()}
                    />
                    <TouchableOpacity onPress={() => props.onPressLoginHere()} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 22 }}>
                        <Text style={styles.AlredyAccntTxt}>
                            {/* Already have an account? */}
                            <Text style={{
                                fontFamily: FONT_FAMILY_TYPE_WRITER,
                                color: COMMON_BLUE_COLOUR,
                                fontSize: 16,
                            }}> Login Here.</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}
export default ForgotPasswordScreen;