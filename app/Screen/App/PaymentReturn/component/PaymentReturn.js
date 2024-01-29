import React from 'react';
import {
    View, Text, Image, TouchableOpacity, StatusBar
} from 'react-native';
import styles from './styles';
import Button from '../../../../Components/Button';
import { CHALLANGE_SCREEN_COLOUR_CODE, FONT_FAMILY_CURSUE, WHITE_COLOR_CODE } from '../../../../Utils/constant';

const ChallangeScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHALLANGE_SCREEN_COLOUR_CODE} />
                <View style={styles.FirstContainer}>
                    <Text style={styles.LetChllngeTxt}>You have already try three times</Text>
                    <Text style={styles.LetChllngeTxt1}>NoW your can request for your maney</Text>
                    <Button
                        style={{ marginTop: 15 }}
                        buttonText={"Request"}
                        onPress={() => props.onPressCreate()}
                    />
                </View>

                <View style={styles.SecondCOntain}>
                    {/* <TouchableOpacity onPress={() => props.onPressReceiver()}>
                        <Image source={require('../../../../Assets/deadasssDOT.png')} />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => props.onPressProfile()}>
                        <Image source={require('../../../../Assets/profile.png')} />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}
export default ChallangeScreen;