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
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
        paddingTop: 20,
        position: 'absolute',
        width: '100%', bottom: 5,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    AboutUsTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        marginLeft:5,
        marginRight:5
    },
    InputBox: {
        width: '100%',
        height: 44,
        backgroundColor: WHITE_COLOR_CODE,
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    RegisterBtn: {
        marginTop: 20,
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    starImageStyle: {
        resizeMode: 'cover',
        width: 45,
        height: 45,
        margin:3
    },
})
export default Styles;