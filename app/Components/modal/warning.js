import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Dialog, { DialogContent, SlideAnimation, } from 'react-native-popup-dialog';
import Button from '../Button';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_LIGHT, FONT_FAMILY_BOLD } from '../../Utils/constant';
export default function warning({ message, visible, closeModel, _handlebutton }) {
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
                            style={{ width: 60, height: 110 }}
                            source={require('../../Assets/errorDown.png')} />
                    </View>
                }
                footer={
                    <View style={{ flexDirection: "row" }}>
                        <Button
                            style={{ flex: 1, height: 55, alignItems: 'center', justifyContent: 'center' }}
                            buttonText='Cancel'
                            buttonLabelStyle={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 18 }}
                            onPress={() => closeModel()}
                        />
                        <Button
                            style={{
                                flex: 1,
                                backgroundColor: "red",
                                height: 55,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            buttonText='Confirm'
                            buttonLabelStyle={{
                                fontFamily: FONT_FAMILY_BOLD,
                                fontSize: 18,
                            }}
                            onPress={() => _handlebutton()}
                        />
                    </View>
                }
            >
                <DialogContent>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: FONT_FAMILY_BOLD,
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