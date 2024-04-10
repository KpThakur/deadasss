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
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_CURSUE,
        textAlign: 'center',
        fontSize: 30,
        paddingLeft: 10,
        color: WHITE_COLOR_CODE
    },
    FooterContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        width: "100%",
        bottom: 0,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    AboutUsTitle: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 27,
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER
    },
    ChallengeTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        color: WHITE_COLOR_CODE
    },


})
export default Styles;