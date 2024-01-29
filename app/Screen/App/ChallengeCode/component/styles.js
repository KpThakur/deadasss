import { StyleSheet } from 'react-native';
import { OTP_VERIFY_COLOUR_CODE,YELLOW_COLOUR_CODE, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, COMMON_BLUE_COLOUR } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: YELLOW_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    ChallengeTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        color: '#fff',
        fontWeight:'bold'
        // tintColor:'#fff'÷
    },
    RegistratnBtn: {
        margin: 10,
        backgroundColor: WHITE_COLOR_CODE
    },
    FirstCOntainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign: 'center',
        fontSize: 30
    },
    DontHaveView: {
        paddingLeft: 10,
        paddingRight: 10
    },
    VerifyDescrptn: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 17
    },
    AlredyAccntTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign: 'center',
        color: BLACK_COLOUR_CODE,
        fontSize: 16
    },
    SendCodeTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: COMMON_BLUE_COLOUR,
        fontSize: 17,
        textAlign: 'center'
    },
 
})
export default Styles;