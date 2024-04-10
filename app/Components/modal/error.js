import React, { useEffect } from 'react';
import { View, Text, Image, BackHandler, TouchableOpacity } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, } from 'react-native-popup-dialog';
import Button from '../Button';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_GROY_BOLD, LOGIN_COLOUR_CODE } from '../../Utils/constant';
export default function error({ message, visible, closeModel }) {
    useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                onBackPress
            );
        };
    }, []);
    const onBackPress = () => {
        closeModel()
        return true;
    };
    return (
        <View>
            <Dialog
                visible={visible}
                width={0.8}
                useNativeDriver={true}
                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                onTouchOutside={() => {
                    closeModel()
                }}
                // onHardwareBackPress={() => {
                //     closeModel()
                // }}
                dialogTitle={
                    <View style={{ alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            style={{ width: 60, height: 85 }}
                            source={require('../../Assets/errorDown.png')} />
                    </View>
                }
                footer={
                    <TouchableOpacity onPress={() => closeModel()} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: LOGIN_COLOUR_CODE }}>
                        <Button
                            style={{ height: 45, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: LOGIN_COLOUR_CODE }}
                            buttonText='OK'
                            buttonLabelStyle={{
                                fontFamily: FONT_FAMILY_GROY_BOLD,
                                fontSize: 20
                            }}
                            onPress={() => closeModel()}
                        />
                    </TouchableOpacity>
                }
            >
                <DialogContent>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: FONT_FAMILY_REGULAR,
                            textAlign: "center",
                            fontSize: 17,
                            lineHeight: 25
                        }}>
                            {message}
                        </Text>
                    </View>
                </DialogContent>
            </Dialog>
        </View>
    )
};