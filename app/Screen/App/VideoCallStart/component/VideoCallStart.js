import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View, Text, StatusBar
} from 'react-native';
import CountDown from 'react-native-countdown-component';

import { FONT_FAMILY_REGULAR, RED_COLOUR_CODE, REGISTRATION_BACKGROUND_COLOUR } from '../../../../Utils/constant';
import styles from './styles';
const VideoCallStart = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor='#f5fdce' />

                <Text style={styles.LetChllngeTxt}>Video Call</Text>
                <Text style={styles.LetChllngeTxt}>Will Start in :</Text>
                {/* {props.Seconds < props.CallStartTime ?
                    <CountDown
                        // until={60 * 10 + 30}
                        until={60 * props.counter}
                        size={18}
                        onFinish={() => console.log('')}
                        digitStyle={{ backgroundColor: '#FFF', margin: 5 }}
                        digitTxtStyle={{ color: '#000' }}
                        timeToShow={['M', 'S']}
                        timeLabels={{ m: 'MM', s: 'SS' }}
                    />
                    :
                    null
                } */}
                {/* <Text style={{ fontSize: 60, fontFamily: FONT_FAMILY_REGULAR, color: RED_COLOUR_CODE }}>{props.seconds < -1 ? '0' : props.counter} MIN</Text> */}
            </View>
        </View>
    )
}
export default VideoCallStart;