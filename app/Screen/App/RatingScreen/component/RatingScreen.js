import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, StatusBar, Platform, ScrollView
} from 'react-native';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE, CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const RatingScreen = (props) => {

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {props.maxRating.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => props.setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={item <= props.defaultRating
                                    ? require('../../../../Assets/star_New.png')
                                    : require('../../../../Assets/star_blank_New.png')}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

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

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 5.5, paddingTop: Platform.OS === 'ios' ? 25 : 3 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 2, paddingBottom: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View />
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../../../../Assets/big_star.png')} />
                                <Text style={styles.LoginTextSTyle}>Rate Us</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 25, paddingTop: 10 }}>
                                <Text style={styles.ChallengeTxt}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../../Assets/deadasss.png')} />
                        </View>
                        <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.AboutUsTitle} >
                            We are constantly striving to improve and we’d love to hear from you
                           </Text>
                        </View>
                        <CustomRatingBar />
                        <View style={{ width: '100%' }}>
                            <Text style={{ paddingLeft: 15, fontFamily: FONT_FAMILY_TYPE_WRITER, color: WHITE_COLOR_CODE, fontSize: 20 }}>Please leave your valuable comment :</Text>
                            <TextInput
                                style={[styles.InputBox, {
                                    height: 100,
                                    paddingVertical: 10,
                                    textAlignVertical: 'top',
                                    fontFamily: FONT_FAMILY_TYPE_WRITER
                                }]}
                                multiline={true}
                                placeholder={"Please let us kow more...."}
                                onChangeText={(RatingComment) => props.setRatingComment(RatingComment)}
                                value={props.RatingComment}
                                placeholderStyle={{ fontFamily: FONT_FAMILY_REGULAR }}
                            />
                        </View>
                        <View style={{ width: '100%', }}>
                            <Button
                                onPress={() => props.onPressCreateRating()}
                                buttonText={"SUBMIT"}
                                style={styles.RegisterBtn}
                                buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                            />
                        </View>
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
export default RatingScreen;