import React, { useState } from 'react';
import {
    View, Text, Image, TouchableOpacity,StatusBar
} from 'react-native';
import styles from './styles';
import { WHITE_COLOR_CODE, COMMON_BLUE_COLOUR,LOGIN_COLOUR_CODE } from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = (props) => {
    const navigation = useNavigation()
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    function onPressRemember() {
        setRemember(!remember)
    };
    function onPressForgotPassword() {
        navigation.navigate('ForgotPassword')
    };
    function onPressLogin() {
        const parameters = {
            Email: Email,
            Password: Password
        }
        props._handleLogin(parameters)
    };
    function onPressRegister() {
        navigation.navigate('Registration')
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <StatusBar backgroundColor={LOGIN_COLOUR_CODE} />
                <View style={styles.FirstCOntainer}>
                    <Image source={require('../../../../Assets/deadasss.png')} />
                    <Text style={styles.LoginTextSTyle}>LOGIN</Text>
                </View>
                <View style={{ flex: 4, paddingTop: 25 }}>
                    <Input
                        onChangeText={(Email) => setEmail(Email)}
                        value={Email}
                        placeholder="Email"
                        autoCapitalize={"none"}
                        secureTextEntry={false}
                        leftImage={require('../../../../Assets/user.png')}
                    />
                    <Input
                        onChangeText={(Password) => setPassword(Password)}
                        value={Password}
                        placeholder="Password"
                        secureTextEntry={true}
                        leftImage={require('../../../../Assets/password.png')}
                    />
                    <View style={styles.RemberMeView}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => onPressRemember()}>
                            {remember ?
                                <Image style={{ bottom: 3, }} source={require('../../../../Assets/check_box.png')} />
                                :
                                <Image style={{ bottom: 3, }} source={require('../../../../Assets/check_box_checked.png')} />
                            }
                            <Text style={styles.ForgotPsswrdTxt}>Remember Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressForgotPassword()}>
                            <Text style={styles.ForgotPsswrdTxt}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        buttonText={"Login"}
                        style={styles.RegistratnBtn}
                        buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                        onPress={() => onPressLogin()}
                    />
                    <TouchableOpacity onPress={() => onPressRegister()} style={styles.DontHaveView}>
                        <Text style={styles.AlredyAccntTxt}>If you don't have an account, <Text style={{ color: COMMON_BLUE_COLOUR }}>Register Yourself Here.</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default LoginScreen;