import React from 'react';
import {
    View, Text, Image, TouchableOpacity, Modal, ScrollView, RefreshControl, StatusBar

} from 'react-native';
import CountDown from 'react-native-countdown-component';

import { BLACK_COLOUR_CODE, FONT_FAMILY_REGULAR, WHITE_COLOR_CODE, CHANGE_PASSWORD_COLOUR_CODE } from '../../../../Utils/constant';
import styles from './styles';
const ChallengeTimeRemaining = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => props.onPressCross()} style={styles.CrossViewTxt}>
                        <Text style={styles.CrossTextSTyle}>X</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.PaymentDetailTxt}>CHALLENGE TIME</Text>
                        <Text style={[styles.PaymentDetailTxt, { bottom: 20 }]}>REMAINING</Text>
                    </View>
                    <View style={{ flex: 3.5, justifyContent: 'center', }}>
                        {/* <Text style={styles.MinutesView}>{props.counter < 0 ? 0 : props.counter} min</Text> */}
                        <View style={{ marginBottom: 18 }}>
                            <CountDown
                                // until={60 * 10 + 30}
                                until={60 * props.counter}
                                size={20}
                                onFinish={() => console.log('')}
                                digitStyle={{ backgroundColor: '#FFF', marginBottom: 5 }}
                                digitTxtStyle={{ color: '#000', }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: 'MM', s: 'SS' }}
                                timeLabelStyle={{ fontSize: 15 }}
                            />
                            <View style={styles.ShareCancelView}>
                                <TouchableOpacity onPress={() => props.onPressShare()}>
                                    <Text style={styles.ShareCancelTxt}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.onPressCancel()}>
                                    <Text style={styles.ShareCancelTxt}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.DescrptnView}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: WHITE_COLOR_CODE, fontSize: 15 }}>WHILE YOUR CHALLENGE IS ON YOU CANNOT CREATE A NEW ONE</Text>
                        </View>
                        <View style={styles.DescrptnView}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: WHITE_COLOR_CODE, fontSize: 15 }}>WHILE YOUR CHALLENGE IS ON YOU CANNOT BID</Text>
                        </View>
                        <View style={styles.DescrptnView}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: WHITE_COLOR_CODE, fontSize: 15 }}>AFTER THE REMAINING TIME YOU WILL BE AUTOMATICALLY CONNECTED TO YOUR VIDEOCHAT</Text>
                        </View>
                        <View style={[styles.DescrptnView, { paddingBottom: 20 }]}>
                            <Text style={{ fontFamily: FONT_FAMILY_REGULAR, color: WHITE_COLOR_CODE, fontSize: 15 }}>YOUR GAINED WILL BE AUTOMATICALLY TRANSFER TO YOU AFTER THE VIDEOCALL</Text>
                        </View>
                    </View>
                    <View style={styles.FooterView}>
                        <TouchableOpacity onPress={() => props.onPressBid()} style={{ paddingTop: 10 }}>
                            <Image source={require('../../../../Assets/bidding.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.onPressUser()} >
                            <Image style={{ width: 47, height: 47 }} source={require('../../../../Assets/profile.png')} />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="none"
                        hardwareAccelerated={true}
                        transparent={true}
                        opacity={0.7}
                        visible={props.openDialog}
                        onRequestClose={() => {
                            props.setOpenDialog(false)
                        }}
                    >
                        <View style={styles.MainModalView}>
                            <View style={styles.ModalContainer}>
                                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10, width: 40 }} onPress={() => props.setOpenDialog(false)}>
                                    <Text style={[styles.ConifrmText, { color: '#fff' }]}>X</Text>
                                </TouchableOpacity>
                                <Text style={styles.ConifrmText}>Are you sure you want to</Text>
                                <Text style={[styles.ConifrmText, { bottom: 10 }]}>cancel challenge?</Text>
                                <View style={styles.YesNoView}>
                                    <TouchableOpacity onPress={() => props.onPressYes()}>
                                        <Text style={styles.YesNoTextStyle}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.setOpenDialog(false)}>
                                        <Text style={styles.YesNoTextStyle}>No</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </View>
    )
}
export default ChallengeTimeRemaining;