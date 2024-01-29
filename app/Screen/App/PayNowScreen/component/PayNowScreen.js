import React from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity, StatusBar
} from 'react-native';
import styles from './styles';
import Button from '../../../../Components/Button';
import { WHITE_COLOR_CODE, REGISTRATION_BACKGROUND_COLOUR } from '../../../../Utils/constant';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import CountDown from 'react-native-countdown-component';




const PayNowScreen = (props) => {
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {props.maxRating.map((item, index) => {
                    return (
                        <View
                            key={index}
                        // onPress={() => props.setDefaultRating(item)}
                        >
                            <Image
                                style={styles.starImageStyle}
                                tintColor={item <= props.defaultRating ? '#000' : '#fff'}
                                source={item <= props.defaultRating
                                    ? require('../../../../Assets/smallStar.png')
                                    : require('../../../../Assets/smallStar.png')}
                            />
                        </View>
                    );
                })}
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={REGISTRATION_BACKGROUND_COLOUR} />

                <ScrollView>
                    <View style={styles.FirstContainer}>
                       <View style={{alignItems:'flex-end',}}>
                       <TouchableOpacity onPress={() => props.onPressCross()}
                       style={styles.CrossViewTxt}>
                            <Text style={styles.CrossTextSTyle}>X</Text>
                        </TouchableOpacity>
                       </View>
                        <Text style={styles.LetChllngeTxt}>Videocall 15 mins</Text>
                        <Text style={styles.LetChllngeTxt}>with</Text>
                        <Text numberOfLines={1} style={styles.LetChllngeTxt}>{props.data.name}</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.PayTitle}>Time Remained :</Text>
                            {/* <Text style={styles.TimingText}>{props.counter}</Text> */}
                            {/* <Text style={styles.TimingText}>{props.data.remainningTime}</Text> */}
                            <CountDown
                                // until={60 * 10 + 30}
                                until={60 * props.counter}
                                size={18}
                                onFinish={() => console.log('')}
                                digitStyle={{ backgroundColor: '#FFF', margin: 5 }}
                                digitTxtStyle={{ color: REGISTRATION_BACKGROUND_COLOUR }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: 'MM', s: 'SS' }}
                            />
                            <Text style={styles.TimingPriceTxt}>NOW :<Text style={{ color: WHITE_COLOR_CODE }}> ${props.data.challenge_amount}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#000', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{parseFloat(props.data.rating).toFixed(2)}</Text>
                            </View>
                            <CustomRatingBar />
                            <View style={{}}>
                                <Text style={{ fontSize: 18 }}>({props.data.review_count} reviews)</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18 }}>{props.data?.name}</Text>
                        </View>
                        {/* <View style={{ marginTop: 13, marginBottom: 20, borderWidth: 1, borderColor: WHITE_COLOR_CODE, margin: 5, borderRadius: 5, padding: 15 }}>
                            <LiteCreditCardInput
                                placeholderColor={WHITE_COLOR_CODE}
                                placeholders={{ number: "**** **** **** ****", expiry: "MM/YY", cvc: "CVC" }}
                                onChange={props.onPressPayNow}
                                inputStyle={{ color: WHITE_COLOR_CODE, fontSize: 18 }}
                                validColor={"#009900"}
                            />
                        </View>
                        {props.FormData.valid === true &&
                            <Button
                                style={styles.PayNowStyle}
                                buttonText={"PAY NOW"}
                                onPress={() => props.FormData.valid === true && props._handlePayment()}
                            />
                        } */}

                        <Button
                            style={styles.PayNowStyle}
                            buttonText={"PAY NOW"}
                            onPress={() => props._handlePayment()}
                        />
                    </View>
                    <View style={styles.SecondContainer}>
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={styles.ActNoewTxt}>ACT FAST BEFORE IT IS TOO LATE</Text>
                        </View>
                        <View style={{ paddingLeft: 15, paddingTop: 20, paddingBottom: 20 }}>
                            <Text style={styles.ActNoewTxt}>VIDEOCALL WILL START INSTANTLY </Text>
                        </View>
                        <View style={styles.SecondCOntain}>
                            {/* <TouchableOpacity onPress={() => props.onPressChallenge()}>
                            <Image source={require('../../../../Assets/deadasssDOT.png')} />
                        </TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => props.onPressSetting()}>
                            <Image source={require('../../../../Assets/profile.png')} />
                        </TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
export default PayNowScreen;