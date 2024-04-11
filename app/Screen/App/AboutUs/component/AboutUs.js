import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View, Text, Image, TouchableOpacity, StatusBar, ScrollView,Platform
} from 'react-native';
import styles from './styles';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE } from '../../../../Utils/constant';

const AboutUs = (props) => {
    const navigation = useNavigation()
    function onPressChallenge() {
        navigation.navigate("ChallangeScreen")
    }
    function onPressUser() {
        navigation.navigate("SettingScreen")
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <View style={{ flex: 5.2, paddingTop: Platform.OS === 'ios' ? 30 : 5 }}>
                    <View style={{ flexDirection: 'row', paddingTop: 2, paddingBottom: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View />
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require('../../../../Assets/big_aboutus.png')} />
                            <Text style={styles.LoginTextSTyle}>About Us</Text>
                        </View>
                        <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 25, paddingTop: 10 }}>
                            <Text style={styles.ChallengeTxt}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Image style={{ height: 130, width: '80%' }} source={require('../../../../Assets/deadasss.png')} /> */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'  }}>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <View style={{ paddingTop: 35, paddingBottom: 60, padding: 10 }}>
                            <Text style={styles.AboutUsTitle}>
                                {props.AboutUsDescription.aboutus_description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.FooterContainer}>
                    <TouchableOpacity onPress={() => onPressChallenge()}>
                        <Image source={require('../../../../Assets/deadasssDOT.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPressUser()}>
                        <Image source={require('../../../../Assets/profile.png')} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
export default AboutUs;