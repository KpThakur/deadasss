import { StyleSheet } from 'react-native';
import {  BLACK_COLOUR_CODE, FONT_FAMILY_CURSUE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5fdce"
    },
    body: {
        flex: 6,
        justifyContent:'center',alignItems:'center'
    },
    LetChllngeTxt: {
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 45,
        color: BLACK_COLOUR_CODE,
        width:'100%',textAlign:'center'
    },
})
export default Styles;