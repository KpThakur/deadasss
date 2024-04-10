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
        fontSize: 30,
        color: WHITE_COLOR_CODE,
    },
    FooterContainer: {
        flex: 2.5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        alignItems: 'flex-end'
    },
    ChallengeHeading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        paddingLeft:0,
        paddingRight:0,
    },
    MainChllngeTxt: {
        fontSize: 20,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: WHITE_COLOR_CODE
    },
    AccountNumberView: {
        backgroundColor: WHITE_COLOR_CODE,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        marginTop: 10,
        borderRadius:4
    },
    AccountNumberTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 19,
        color:BLACK_COLOUR_CODE,
        paddingTop: 10
    },
    RegisterBtn: {
        marginTop: 20, 
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    }

})
export default Styles;