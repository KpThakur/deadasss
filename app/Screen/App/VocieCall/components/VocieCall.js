import React from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';
import PulseLoader from '../../../../Components/react-native-pulse-loader';

const VocieCallScreen = (props) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar translucent={true} backgroundColor='#5e9bff' />
            <View style={styles.HeaderContain}>
                <View style={styles.HeaderImgView}>
                    <TouchableOpacity onPress={() => props.OnpressBack()}>
                        {/* <Image source={require('../../../Assets/header-back-btn.png')} /> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.UserNameView}>
                    {/* <Text style={styles.UserNameTxt}>{props.remoteMessage.data.room_id}</Text> */}
                    <Text numberOfLines={1} style={styles.UserNameTxt}>{props.remoteMessage.data.first_name ? props.remoteMessage.data.first_name : null}</Text>
                    {/* <Text style={[styles.RingingTxt, { fontSize: 12, paddingBottom: 10, paddingTop: 10, textTransform: 'capitalize' }]}>{props.remoteMessage.notification.body}</Text> */}
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.MainUserDpView}>
                    <PulseLoader
                        avatar={props.remoteMessage.data.profile_pic}
                    />
                    <Text style={styles.RingingTxt}>RINGING...</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <View style={[styles.disscontedImgView, { bottom: 5 }]}>
                        <TouchableOpacity onPress={() => props.onPressAccept()}>
                            <LottieView
                                visible={true}
                                style={{
                                    backgroundColor: "transparent",
                                    width: 150, height: 150,
                                    // transform: [{ rotate: '110deg' }]
                                }}
                                source={require('../../../../Components/react-native-pulse-loader/lf30_editor_ijbv19wo.json')}
                                autoPlay loop />
                        </TouchableOpacity>
                        {/* <Image source={require('../../../../Assets/call_discontinue_iconnew.png')} /> */}
                    </View>
                    <View style={[styles.disscontedImgView]}>
                        <TouchableOpacity onPress={() => props.onPressReject()}>
                            <Image style={{ width: 85, height: 85 }} source={require('../../../../Assets/call_discontinue_icon.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default VocieCallScreen;