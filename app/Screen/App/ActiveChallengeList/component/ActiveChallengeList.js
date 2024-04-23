import React, { useState } from 'react';
import {
    View, Text, Image, FlatList, TouchableOpacity,StatusBar
} from 'react-native';
import CountDown from 'react-native-countdown-component';

import styles from './styles';
import { WHITE_COLOR_CODE,CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from "moment";
const ActiveChallengeList = (props) => {
    const navigation = useNavigation()
    function onPressChallenge() {
        navigation.navigate("ChallangeScreen")
    };
    function onPressUser() {
        navigation.navigate("SettingScreen")
    };
    const _handleChallenge = (item, index) => {
        var currentDay = moment(new Date(), "DD/MM/YYYY");
        var ChallengeCreated = moment(item.create_date);
        var Days = currentDay.diff(ChallengeCreated, 'days')
        return (
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: WHITE_COLOR_CODE, marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
                <Text style={styles.MainChllngeTxt}>{item.challenge_title}</Text>
                <Text style={styles.MainChllngeTxt}>{Days === 0 ? 'Today' : Days + ' ' + 'days ago'} </Text>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
             <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <View style={{ flex: 5.5, justifyContent: 'center',paddingTop:20 }}>
                    <View style={{ flexDirection: 'row', paddingTop:10, paddingBottom: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingTop:5}}>
                                <Image source={require('../../../../Assets/big_active.png')} />
                                </View>
                                <Text style={[styles.LoginTextSTyle,{paddingLeft:5}]}> Active Challenge List</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 25,paddingTop:10 }}>
                                <Text style={styles.ChallengeTxt}>X</Text>
                            </TouchableOpacity>
                        </View>
                    {props.ConfirmTime === 0 ?
                        <View style={[styles.ChallengeTextStyle, { justifyContent: 'center' }]}>
                            <Text style={styles.MainChllngeTxt}>There is no active challenge !!</Text>
                        </View> :
                        <View style={styles.ChallengeTextStyle}>
                            <Text numberOfLines={1} style={[styles.MainChllngeTxt, { width: '40%' }]}>{props.challengeList.challenge_title}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.MainChllngeTxt]}>Time Left :</Text>
                                <CountDown
                                    // until={60 * 10 + 30}
                                    until={60 * props.ConfirmTime}
                                    size={15}
                                    onFinish={() => console.log('')}
                                    digitStyle={{ backgroundColor: '#FFF', margin: 5 }}
                                    digitTxtStyle={{ color: '#000' }}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: 'MM', s: 'SS' }}
                                />
                            </View>
                            {/* <Text style={[styles.MainChllngeTxt]}>Time Left : {props.ConfirmTime} min</Text> */}
                            {/* <Text style={[styles.MainChllngeTxt]}>Time Left : {props.confirm} min</Text> */}
                        </View>}
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 35, paddingBottom: 25 }}>
                        <Text style={styles.LoginTextSTyle}>Past Challenge List</Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={props.ExpireList}

                        ListEmptyComponent={() =>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.MainChllngeTxt}>No past challenge </Text>
                            </View>
                        }
                        renderItem={({ item, index }) => _handleChallenge(item, index)}
                    />
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
export default ActiveChallengeList;