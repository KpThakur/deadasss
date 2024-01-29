import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, ScrollView, TouchableOpacity,StatusBar
} from 'react-native';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE ,CHANGE_PASSWORD_COLOUR_CODE} from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const ReportScreen = (props) => {
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

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 5.5, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', paddingTop: 50, paddingBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../../Assets/big_star.png')} />
                            <Text style={styles.LoginTextSTyle}>Report</Text>
                        </View>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <View style={{ width: '100%',paddingTop:20 }}>
                            <Text style={{ paddingLeft: 15, fontFamily: FONT_FAMILY_TYPE_WRITER, color: WHITE_COLOR_CODE, fontSize: 20 }}>Write your content :</Text>
                            <TextInput
                                style={[styles.InputBox, {
                                    height: 250,
                                    paddingVertical: 10,
                                    textAlignVertical: 'top',
                                    fontFamily: FONT_FAMILY_TYPE_WRITER
                                }]}
                                multiline={true}
                                placeholder={"Write...."}
                                onChangeText={(RatingComment) => props.setRatingComment(RatingComment)}
                                value={props.RatingComment}
                                placeholderStyle={{ fontFamily: FONT_FAMILY_REGULAR }}
                            />
                        </View>
                        <View style={{ width: '100%' }}>
                            <Button
                                onPress={() => props.onPressCreateRating()}
                                buttonText={"SUBMIT"}
                                style={styles.RegisterBtn}
                                buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                            />
                        </View>
                    </View>
                    <View style={styles.FooterContainer}>
                        <TouchableOpacity onPress={() => onPressChallenge()}>
                            <Image source={require('../../../../Assets/deadasssDOT.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressUser()}>
                            <Image source={require('../../../../Assets/profile.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
export default ReportScreen;