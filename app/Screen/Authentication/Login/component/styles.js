import { StyleSheet } from 'react-native';
import { LOGIN_COLOUR_CODE, FONT_FAMILY_REGULAR, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LOGIN_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    RegistratnBtn: {
        margin: 10,
        backgroundColor: COMMON_BLUE_COLOUR
    },
    AlredyAccntTxt: {
        color: BLACK_COLOUR_CODE,
        fontFamily: FONT_FAMILY_REGULAR,
        textAlign: 'center',
        fontSize: 13
    },
    FirstCOntainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        paddingTop: 20
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign: 'center',
        fontSize: 30
    },
    RemberMeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    RemberViewMain: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ForgotPsswrdTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: COMMON_BLUE_COLOUR,
        fontSize: 16,
        paddingLeft: 10
    },
    DontHaveView: {
        paddingLeft: 10,
        paddingRight: 10
    },

    alertBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    alertBox: {
        borderRadius: 10,
        width: 280,
        height: 110,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: WHITE_COLOR_CODE,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderStyle: 'solid',
        elevation: 20,
        flexDirection: 'row',
    },
})
export default Styles;