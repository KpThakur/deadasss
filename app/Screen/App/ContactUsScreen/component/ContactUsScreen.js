import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView, StatusBar,Platform
} from 'react-native';
import styles from './styles';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE } from '../../../../Utils/constant';

const ContactUsScreen = (props) => {
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
                <ScrollView>
                    <View style={{ flex: 5.2, paddingTop:Platform.OS === 'ios' ? 25:15 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 2, paddingBottom: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingTop:8 }}>
                                <Image source={require('../../../../Assets/big_contact.png')}  />
                                </View>
                                <Text style={styles.LoginTextSTyle}>Contact Us</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 25,paddingTop:10 }}>
                                <Text style={styles.ChallengeTxt}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../../Assets/deadasss.png')} />
                        </View>
                        <View style={{ paddingTop: 35 }}>
                            <Text style={styles.AboutUsTitle}>
                                {props.ContactData.contactus_discription}

                            </Text>
                        </View>
                        {/* <View style={{ paddingTop: 20 }}>
                            <Text style={[styles.AboutUsTitle, { fontSize: 20, lineHeight: 40 }]}>Contact Number :</Text>
                            <Text style={[styles.AboutUsTitle, { fontSize: 20, lineHeight: 40, bottom: 10 }]}>+{props.ContactData.contactus_country_code} - {props.ContactData.contactus_mobileno}</Text>
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Text style={[styles.AboutUsTitle, { fontSize: 20, lineHeight: 40 }]}>Email :</Text>
                            <Text style={[styles.AboutUsTitle, { fontSize: 17, lineHeight: 40, bottom: 20 }]}>{props.ContactData.email}</Text>
                        </View> */}
                    </View>

                </ScrollView>
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
export default ContactUsScreen;