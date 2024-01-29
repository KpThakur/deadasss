import { StyleSheet } from 'react-native';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    RegistratnBtn: {
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 30,
        color: WHITE_COLOR_CODE,
    },
    FooterContainer: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom:15,
        alignItems:'flex-end',
    },
    ChallengeTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        color: WHITE_COLOR_CODE
    },

})
export default Styles;