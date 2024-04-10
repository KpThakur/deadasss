import React from 'react';
import {
    View, Text, Image, StatusBar
} from 'react-native';
import styles from './styles';
import { BLACK_COLOUR_CODE, FONT_FAMILY_GROY_BOLD, WHITE_COLOR_CODE, WELCOME_BACKGROUND_COLOUR } from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
    const navigation = useNavigation()
    function onPressLogin() {
        navigation.navigate('Login')
    };
    function onPressRegister() {
        navigation.navigate('Registration')
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={WELCOME_BACKGROUND_COLOUR} />
                <View style={styles.WelcomeToView}>
                    <Text style={styles.WelcomeToText}>WELCOME</Text>
                    <Text style={styles.WelcomeToText}>TO</Text>
                </View>
                <View style={styles.SecondCOntain}>
                    <Image source={require('../../../../Assets/deadasss.png')} />
                    <View style={styles.DescrpctnText}>
                        <Text style={styles.DescrpctnTextStyle}>Make the most of your time valuable</Text>
                        <Text style={[styles.DescrpctnTextStyle, { bottom: 20 }]}>much, much more.</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Button
                            buttonText={"Login"}
                            style={[styles.RegisterBtn, { backgroundColor: BLACK_COLOUR_CODE }]}
                            onPress={() => onPressLogin()}
                        />
                        <Button
                            onPress={() => onPressRegister()}
                            buttonText={"Register"}
                            style={styles.RegisterBtn}
                            buttonLabelStyle={{ color: BLACK_COLOUR_CODE }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
export default WelcomeScreen;