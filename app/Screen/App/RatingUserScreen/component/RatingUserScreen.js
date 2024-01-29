import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, Platform
} from 'react-native';
import { FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE, CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
// import { Rating, AirbnbRating } from 'react-native-ratings';
const RatingUserScreen = (props) => {
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const navigation = useNavigation()
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={item <= defaultRating
                                    ? require('../../../../Assets/star_New.png')
                                    : require('../../../../Assets/star_blank_New.png')}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };
    function onPressSubmit() {
        navigation.navigate("ChallangeScreen")
    };
    function onPressChallenge() {
        navigation.navigate("ChallangeScreen")
    };
    function onPressUser() {
        navigation.navigate("SettingScreen")
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 5.5, alignItems: 'center', marginBottom: 100, paddingTop: Platform.OS === 'ios' ? 20 : 5 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Image source={require('../../../../Assets/big_star.png')} /> */}
                            <Text style={styles.LoginTextSTyle}>Rate User</Text>
                        </View>
                        <Image source={require('../../../../Assets/deadasss.png')} />
                        <View style={{ paddingTop: 20 }}>
                            <Text style={styles.AboutUsTitle}>
                             We are constantly striving to improve and we’d love to hear from you
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => props.reportFun()} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', paddingRight: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red', textDecorationLine: 'underline' }}>Report</Text>
                        </TouchableOpacity>
                        <CustomRatingBar />
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, color: WHITE_COLOR_CODE, fontSize: 20 }}>Please leave you valuable comment :</Text>
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
                            />
                        </View>
                        <View style={{ width: '100%' }}>
                            <Button
                                onPress={() => props.onPressCreateRating(defaultRating)}
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
export default RatingUserScreen;