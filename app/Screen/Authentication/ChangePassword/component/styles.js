import { StyleSheet } from 'react-native';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
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
        marginTop: 20,
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign: 'center',
        fontSize: 30,
        paddingTop:15,
        color: WHITE_COLOR_CODE
    },
    FirstCOntainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 50
    }
})
export default Styles;