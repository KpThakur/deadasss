import React, { useState } from 'react';
import {
    View, Text, TextInput, ScrollView, TouchableOpacity, Platform, StatusBar
} from 'react-native';
import { BLACK_COLOUR_CODE, FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_GROY_BOLD, RED_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
const CreateChallenge = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={RED_COLOUR_CODE} />
                <View style={{ flexDirection: 'row', paddingTop: Platform.OS === 'ios' ? 20 : 5, justifyContent: 'space-between', alignItems: 'center', height: 120, marginTop: 10 }}>
                    <View style={{ width: '6%' }} />
                    <View>
                        <Text style={[styles.ChallengeTxt, { paddingLeft: 30 }]}>CREATE</Text>
                        <Text style={styles.ChallengeTxt}>CHALLENGE</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 15 }}>
                        <Text style={styles.ChallengeTxt1}>X</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ justifyContent: 'center', marginTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <TextInput
                                style={styles.challegeTitle}
                                onChangeText={(ChallengeTitle) => props.setChallengeTitle(ChallengeTitle)}
                                value={props.ChallengeTitle}
                                selectionColor={RED_COLOUR_CODE}
                                placeholderTextColor={RED_COLOUR_CODE}
                                placeholder={"Challenge Title :"}
                            />
                        </View>
                        <Text style={[styles.VideoHandleText, { marginTop: 20 }]}>
                            HOW MANY 15 MINS VIDEOCALL CAN YOU HANDLE ?
                       </Text>
                        <View style={[styles.BoxesCOntainer, { marginTop: 30, marginBottom: 15 }]}>
                            <TouchableOpacity onPress={() => props.onPressNumber(1)} style={styles.BoxesView}>
                                <Text style={[styles.BoxesText, { color: props.selectNumber === 1 ? RED_COLOUR_CODE : BLACK_COLOUR_CODE }]}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.onPressNumber(2)} style={styles.BoxesView}>
                                <Text style={[styles.BoxesText, { color: props.selectNumber === 2 ? RED_COLOUR_CODE : BLACK_COLOUR_CODE }]}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.onPressNumber(3)} style={styles.BoxesView}>
                                <Text style={[styles.BoxesText, { color: props.selectNumber === 3 ? RED_COLOUR_CODE : BLACK_COLOUR_CODE }]}>3</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.onPressNumber(4)} style={styles.BoxesView}>
                                <Text style={[styles.BoxesText, { color: props.selectNumber === 4 ? RED_COLOUR_CODE : BLACK_COLOUR_CODE }]}>4</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.RequestDescprtnTxt}>
                            YOU CAN REQUEST A FEE FOR EACH VIDEOCALL
                          </Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={styles.DollarCOntainer}>
                            <Text style={styles.DollarText}>$</Text>
                            <TextInput
                                style={styles.amoutSty}
                                onChangeText={(priceCovert) => props._handlePrice(priceCovert)}
                                value={props.priceCovert}
                                maxLength={4}
                                selectionColor={"transparent"}
                                keyboardType={"number-pad"}
                            />
                        </View>
                        <View style={styles.amotshowCon}>
                            <Text style={styles.amotshowTxt}>Total : {'$' + ' ' + props.selectNumber * props.priceCovert}</Text>
                        </View>

                        <View style={styles.videoChatTxt}>
                            {/* <Text style={[styles.RequestDescprtnTxt]}>Deadass commision is {props.userData.commission_amount}% so you will get withdrawl amount $ {((props.selectNumber * props.priceCovert) - props.userAmout).toFixed(2)}</Text> */}
                            <Text style={[styles.RequestDescprtnTxt1]}>Deadass commission will be deducted</Text>
                        </View>

                        <View style={styles.videoChatTxt}>
                            <Text style={styles.RequestDescprtnTxt1}>VideoChat challenge will start instantly. Sit Tight !</Text>
                        </View>
                        <View style={styles.createBtnCon}>
                            <TouchableOpacity onPress={() => props.onPressCreateChallenge()} style={{ width: '60%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', height: 50, borderRadius: 5 }}>
                                <Text style={{ fontFamily: FONT_FAMILY_GROY_BOLD, fontSize: 18, color: '#fff' }}>Create A Challenge</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}
export default CreateChallenge;