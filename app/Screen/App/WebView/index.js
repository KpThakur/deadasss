import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CHANGE_PASSWORD_COLOUR_CODE, FONT_FAMILY_CURSUE, WHITE_COLOR_CODE, UPDATE_BTN_COLOUR_CODE } from '../../../Utils/constant';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import Button from '../../../Components/Button';

export default function App(props) {
    const navigation = useNavigation()
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const webviewRef = useRef(null)

    async function onPaymentComplete(Code) {
        try {
            setIsLoading(true)
            const { data } = await apiCall('POST', ENDPOINTS.checkStripeAccountVerify);
            if (data.status === 200) {
                navigation.navigate('UserWallet')
                setIsLoading(false)
            } else if (data.status === 201) {
                setIsLoading(false)
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
            } else if (data.status === 202) {
                setIsLoading(false)
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
            } else if (data.status === 401) {
                setIsLoading(false)
                // setAlertMessage(data.message);
                // AnimatedAlert.showAlert()
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <View style={{ height: 50, backgroundColor: CHANGE_PASSWORD_COLOUR_CODE, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => onPressUser()}
                    style={{ paddingLeft: 9 }}>
                    {/* <Image source={require('../../../Assets/backArrow-removebg-preview.png')} style={{ width: 45, height: 27 }} /> */}
                </TouchableOpacity>
                <Text style={{ fontFamily: FONT_FAMILY_CURSUE, fontSize: 30, color: WHITE_COLOR_CODE }}>Add Account</Text>
                <View />
            </View>
            <WebView
                originWhitelist={['*']}
                source={{ uri: props.route.params.url ? props.route.params.url : 'https://instamobile.io/blog' }}
                startInLoadingState={true}
                renderLoading={() => (
                    <ActivityIndicator
                        color='black'
                        size='large'
                        style={styles.flexContainer}
                    />
                )}
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack)
                    setCanGoForward(navState.canGoForward)
                    setCurrentUrl(navState.url)
                }}
            />
            {canGoBack &&
                <View style={{ paddingBottom: 20, paddingTop: 20 }}>
                    <Button
                        onPress={() => onPaymentComplete()}
                        buttonText={"Withdrawal"}
                        style={styles.RegistratnBtn}
                        buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                    />
                </View>
            }
        </View >
    );
}
const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    tabBarContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#b43757'
    },
    button: {
        color: 'white',
        fontSize: 24
    },
    RegistratnBtn: {
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    },
})