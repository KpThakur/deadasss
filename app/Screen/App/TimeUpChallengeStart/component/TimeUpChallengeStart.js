import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity,StatusBar
} from 'react-native';
import { BLACK_COLOUR_CODE, FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER,TIME_UP_START_COLOUR_CODE, RED_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
import styles from './styles';
import moment from "moment";
const TimeUpChallengeStart = (props) => {
    const showTiming = (props.ItemData.call_start_time - props.Seconds) < -1 ? 'On call' : (props.ItemData.call_start_time - props.Seconds) + ' ' + "min";
    var confirm = moment.utc(moment.duration(showTiming, 'seconds').as('milliseconds')).format('mm');
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <StatusBar backgroundColor={TIME_UP_START_COLOUR_CODE} />

                <View style={{ flex: 2.5 }}>
                    <TouchableOpacity onPress={() => props.onPressCross()} style={[styles.CrossViewTxt,{marginTop:35}]}>
                        <Text style={styles.CrossTextSTyle}>X</Text>
                    </TouchableOpacity>
                    <Text style={[styles.PaymentDetailTxt, { fontSize: 30 }]}>TIME UP</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: WHITE_COLOR_CODE, fontFamily: FONT_FAMILY_REGULAR }}>{props.listChallenge.length} people bids on you</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={styles.PaymentDetailTxt}>FIRST VIDEOCALL WILL START IN</Text>
                        <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: RED_COLOUR_CODE, fontSize: 30, textAlign: 'center' }}>
                            {/* {confirm === "00" || confirm === 0 ? 'on call' : confirm} */}
                            {/* {console.log('props.listChallenge: ', props.listChallenge[0].call_start_time -props.Seconds )} */}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 3.5, borderWidth: 2, borderColor: WHITE_COLOR_CODE, marginHorizontal: 10, marginTop: 40, marginBottom: 20, padding: 10 }}>
                    <FlatList
                        // keyExtractor={(item, index) => index.toString()}
                        data={props.listChallenge}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() =>
                            <View style={{ alignItems: 'center', paddingTop: 40 }}>
                                <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOUR_CODE, fontSize: 18 }}>No Bid yet!!</Text>
                            </View>}
                        renderItem={({ item, index }) => props._handleCallWait(item, index)}
                    />
                </View>
            </View>
        </View>
    )
}
export default TimeUpChallengeStart;