import React, { useEffect } from 'react';
import { View, Text, Image, BackHandler } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, } from 'react-native-popup-dialog';
import Button from '../Button';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_BOLD, YELLOW_COLOR_CODE } from '../../Utils/constant';
export default function success({ message, visible, closeModel }) {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler;
    }, []);
    const backAction = () => {
        closeModel()
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
                onHardwareBackPress={() => {
                    closeModel()
                }}
                dialogTitle={
                    <View style={{ alignItems: "center" }}>
                        <Image
                            resizeMode='contain'
                            style={{width: 60, height: 110 }}
                            source={require('../../Assets/successFul.png')} />
                    </View>
                }
                footer={
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
                        <Button
                            style={{ backgroundColor: 'green', height: 45, justifyContent: 'center', alignItems: 'center',width:'100%' }}
                            buttonText='OK'
                            buttonLabelStyle={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 20 }}
                            onPress={() => closeModel()}
                        />
                    </View>
                }
            >
                <DialogContent>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: FONT_FAMILY_REGULAR,
                            // width: '70%',
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