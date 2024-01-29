import React, { useState, useRef } from 'react';
import {
    View, Text, Image, FlatList, TextInput, ScrollView, TouchableOpacity,StatusBar
} from 'react-native';
import styles from './styles';
import { FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE,CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import { useNavigation } from '@react-navigation/native';
const PaymentDetailSetting = (props) => {
    const [pastList, setPastList] = useState([
        {
            id: '01',
            paymentPrice: '150',
            ChallengeDate: '12/11/2020'
        },
        {
            id: '02',
            paymentPrice: '150',
            ChallengeDate: '08/09/2020'
        },
        {
            id: '03',
            paymentPrice: '150',
            ChallengeDate: '25/08/2020'
        },
    ]);
    const _handleChallenge = (item, index) => {
        return (
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: WHITE_COLOR_CODE, marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
                <Text style={styles.MainChllngeTxt}>$ {item.paymentPrice}</Text>
                <Text style={styles.MainChllngeTxt}>{item.ChallengeDate}</Text>
            </View>
        )
    };
    const navigation = useNavigation()
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
                    <View style={{ flex: 3.5, justifyContent: 'center' }}>
                        <View style={styles.ChallengeHeading}>
                            <Image source={require('../../../../Assets/Big_payment.png')} />
                            <Text style={styles.LoginTextSTyle}>  Payment Details</Text>
                        </View>
                        <View style={styles.AccountNumberView}>
                            <Text style={styles.AccountNumberTxt}>Account Number:</Text>
                            <TextInput
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                                    position: 'absolute',
                                    right: 0,
                                    paddingTop: 15,
                                    width: '53%',
                                    fontSize: 17,
                                    bottom: -8,
                                    height:55
                                }}
                                selectionColor={"transparent"}
                                keyboardType={"number-pad"}
                                onChangeText={(AccountNumber) => props.setAccountNumber(AccountNumber)}
                                value={props.AccountNumber}
                            />
                        </View>
                        <View style={styles.AccountNumberView}>
                            <Text style={styles.AccountNumberTxt}>Stripe ID:</Text>
                            <TextInput
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER,
                                    position: 'absolute',
                                    right: 0,
                                    bottom: -8,
                                    paddingTop: 15,
                                    fontSize: 17,
                                    width: '72%',
                                    height: 55
                                }}
                                selectionColor={"transparent"}
                                keyboardType={"number-pad"}
                                onChangeText={(StripeID) => props.setStripeID(StripeID)}
                                value={props.StripeID}
                            />
                        </View>
                        <Button
                            buttonText={"UPDATE"}
                            style={styles.RegisterBtn}
                            buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                            onPress={() => props.updatePaymentDetails()}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20, paddingBottom: 15 }}>
                            <Text style={[styles.LoginTextSTyle, { fontSize: 24 }]}>Payment Recived Details</Text>
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={pastList}
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
                </ScrollView>

            </View>
        </View>
    )
}
export default PaymentDetailSetting;