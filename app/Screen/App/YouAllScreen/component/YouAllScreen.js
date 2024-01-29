import React, { useEffect } from 'react';
import {
    View, Text, Image,StatusBar
} from 'react-native';
import styles from './styles';
import { FONT_FAMILY_CURSUE, WHITE_COLOR_CODE,YOU_ALL_COLOUR_CODE } from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
const YouAllScreen = (props) => {
    return (
        <View style={styles.container}>
             <StatusBar backgroundColor={YOU_ALL_COLOUR_CODE} />
            <View style={styles.body}>
                <Text style={{ width: '100%', textAlign: 'center', fontFamily: FONT_FAMILY_CURSUE, fontSize: 60, paddingBottom: 10, color: WHITE_COLOR_CODE }}>Y 'ALL</Text>
                <Image source={require('../../../../Assets/deadasss.png')} />
            </View>
            {/* <View style={{ flex: 1.5 }}>
                <Button
                    buttonText={"As a user"}
                    onPress={() => props.onPressUser()}
                />
                <Button
                    style={{ marginTop: 10 }}
                    onPress={() => props.onPressReceiver()}
                    buttonText={"As a receiver"}
                />
            </View> */}
        </View>
    )
}
export default YouAllScreen;