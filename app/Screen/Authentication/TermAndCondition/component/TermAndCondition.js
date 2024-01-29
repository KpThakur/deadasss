import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View, Text, Image, TouchableOpacity, StatusBar, ScrollView,Platform
} from 'react-native';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE } from '../../../../Utils/constant';

import styles from './styles';
const TermAndCondition = (props) => {
    const navigation = useNavigation()
    function onPressChallenge() {
        navigation.navigate("ChallangeScreen")
    }
    function onPressUser() {
        navigation.navigate("SettingScreen")
    }
    const OnpressBack = () => {
        navigation.goBack(null);
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />

                <View style={{ flex: 5.2, justifyContent: 'center' }}>

                    <View style={{ flexDirection: 'row', paddingTop: Platform.OS === 'ios' ? 30 : 15, paddingBottom: 30, justifyContent: "space-between", alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={() => OnpressBack()}>
                            <Image source={require('../../../../Assets/backArrow-removebg-preview.png')} tintColor='#fff' style={{ width: 40, height: 20 }} />
                        </TouchableOpacity>
                        <Text style={styles.LoginTextSTyle}>Term's & Condition</Text> */}
                        <View />
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.LoginTextSTyle}>Term's & Condition</Text>
                        </View>
                        <TouchableOpacity onPress={() => OnpressBack()} style={{ paddingRight: 25, paddingTop: 10 }}>
                            <Text style={styles.ChallengeTxt}>X</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Image style={{ height: 130, width: '80%' }} source={require('../../../../Assets/deadasss.png')} /> */}
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <View style={{ paddingTop: 35, padding: 10 }}>
                            <Text style={styles.AboutUsTitle}>
                                {props.AboutUsDescription.termandcondition}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                {/* <View style={styles.FooterContainer}>
                    <TouchableOpacity onPress={() => onPressChallenge()}>
                        <Image source={require('../../../../Assets/deadasssDOT.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPressUser()}>
                        <Image source={require('../../../../Assets/profile.png')} />
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    )
}
export default TermAndCondition;