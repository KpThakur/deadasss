import React from 'react';
import {
    View, Text,StatusBar
} from 'react-native';
import { BLACK_COLOUR_CODE,WHITE_COLOR_CODE ,RED_COLOUR_CODE} from '../../../../Utils/constant';
import styles from './styles';
import Button from '../../../../Components/Button';

const BeforeAcceptScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
             <StatusBar backgroundColor={RED_COLOUR_CODE} />

                <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Text style={styles.LetChllngeTxt}>Before you can</Text>
                    <Text style={styles.LetChllngeTxt}>accept the</Text>
                    <Text style={styles.LetChllngeTxt}>challenge</Text>
                </View>
                <View style={{ flex: 2}}>
                    <Button
                        buttonText={"LOGIN"}
                    />
                    <Button
                        style={{ backgroundColor: WHITE_COLOR_CODE,marginTop:15 }}
                        buttonLabelStyle={{ color: BLACK_COLOUR_CODE }}
                        buttonText={"REGISTER"}
                    />
                </View>
            </View>
        </View>
    )
}
export default BeforeAcceptScreen;