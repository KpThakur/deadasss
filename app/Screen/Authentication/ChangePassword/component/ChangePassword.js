import React, { useState } from 'react';
import {
    View, Text, Image, ScrollView,StatusBar
} from 'react-native';
import styles from './styles';
import { WHITE_COLOR_CODE,CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const ChangePasswordScreen = (props) => {
    const [NewPassword, setNewPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const navigation = useNavigation()
    function onPressUpdate() {
        const parameters = {
            NewPassword, NewPassword,
            ConfirmPassword: ConfirmPassword,
        }
        props._handleUpdate(parameters)
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <View style={styles.FirstCOntainer}>
                    <Image source={require('../../../../Assets/deadasss.png')} />
                    <Text style={styles.LoginTextSTyle}>Reset Password</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Input
                        onChangeText={(NewPassword) => setNewPassword(NewPassword)}
                        value={NewPassword}
                        placeholder="New Password:"
                        secureTextEntry={true}
                        textInputStyle={{ paddingLeft: 20, height: 59, paddingTop: 20 }}
                    />
                    <Input
                        onChangeText={(ConfirmPassword) => setConfirmPassword(ConfirmPassword)}
                        value={ConfirmPassword}
                        placeholder="Confirm Password:"
                        secureTextEntry={true}
                        textInputStyle={{ paddingLeft: 20, height: 59, paddingTop: 20 }}
                    />
                    <Button
                        buttonText={"UPDATE"}
                        style={styles.RegistratnBtn}
                        onPress={() => onPressUpdate()}
                        buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                    />
                </View>
            </View>
        </View>
    )
}
export default ChangePasswordScreen;