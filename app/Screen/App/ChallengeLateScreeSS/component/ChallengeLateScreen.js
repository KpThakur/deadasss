import React from 'react';
import {
    View, Text
} from 'react-native';
import { BLACK_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';
const ChallengeLateScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Text style={styles.LetChllngeTxt}>Sorry You're</Text>
                    <Text style={styles.LetChllngeTxt}>Too Late</Text>
                    <Text style={styles.LetChllngeTxt}>Challenge is</Text>
                    <Text style={styles.LetChllngeTxt}>Close</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Button
                        buttonText={"LOGIN"}
                    />
                    <Button
                        style={{ backgroundColor: WHITE_COLOR_CODE, marginTop: 15 }}
                        buttonLabelStyle={{ color: BLACK_COLOUR_CODE }}
                        buttonText={"REGISTER"}
                    />
                </View>
            </View>
        </View>
    )
}
export default ChallengeLateScreen;