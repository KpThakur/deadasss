import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View, Text, TouchableOpacity,StatusBar
} from 'react-native';
import styles from './styles';
import {
    COMMON_BLUE_COLOUR, PAYMENT_DETAIL_SCREEN_COLOUR_CODE, WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE
} from '../../../../Utils/constant';
const TimeUpScreen = () => {
    const navigation = useNavigation();
    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <StatusBar backgroundColor={PAYMENT_DETAIL_SCREEN_COLOUR_CODE} />
                <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:150}}>
                   <View></View>
                    <Text style={styles.PaymentDetailTxt}>Time Up</Text>
                    <TouchableOpacity onPress={() => onPressCross()} style={styles.CrossViewTxt}>
                        <Text style={styles.CrossTextSTyle}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.UpdateAccountView}>
                    <Text style={styles.UpdateAccountTxt}>No one bid on you</Text>
                    <Text style={styles.UpdateAccountTxt}>try again !!!</Text>
                    <Text style={styles.UpdateAccountTxt}>Make Sure to share</Text>
                    <Text style={styles.UpdateAccountTxt}>your challenge</Text>
                    {/* <Text style={styles.UpdateAccountTxt}>everywhere next</Text> */}
                    {/* <Text style={styles.UpdateAccountTxt}>time</Text> */}
                </View>
            </View>
        </View>
    )
}
export default TimeUpScreen;