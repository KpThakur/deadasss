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
                    <Text style={styles.LetChllngeTxt}>Lets Challenge</Text>
                    <Text style={styles.LetChllngeTxt}>Them !!</Text>
                    <Button
                        style={{ marginTop: 15 }}
                        buttonText={"Create A Challenge"}
                        onPress={() => props.onPressCreate()}
                    />
                    <Button
                        style={{ marginTop: 15, backgroundColor: '#fff' }}
                        buttonLabelStyle={{ color: '#000' }}
                        buttonText={"Place A Bid"}
                        onPress={() => props.onPressReceiver()}
                    />
                </View>
                <View style={styles.SecondCOntain}>
                    <TouchableOpacity onPress={() => props.onPressProfile()}>
                        <Image source={require('../../../../Assets/deadasssDOT.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ChallangeScreen;