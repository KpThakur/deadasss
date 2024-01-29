import { StyleSheet } from 'react-native';
import {  CHALLENGE_LATE_COLOUR_CODE, FONT_FAMILY_CURSUE, RED_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHALLENGE_LATE_COLOUR_CODE
    },
    body: {
        flex: 6,
    },
    LetChllngeTxt: {
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 45,
        color: WHITE_COLOR_CODE,
        width:'100%',textAlign:'center'
    },
})
export default Styles;