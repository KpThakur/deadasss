import { Platform, StyleSheet } from 'react-native';
import { CHANGE_PASSWORD_COLOUR_CODE, RED_COLOUR_CODE, FONT_FAMILY_CURSUE, FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    FirstContainer: {
        // flex: 1,
        height: 90,
        justifyContent: 'center',
        paddingTop:Platform.OS === 'ios' ?40 :5
    },
    SettingMainTxt: {
        fontFamily: FONT_FAMILY_CURSUE,
        color: WHITE_COLOR_CODE,
        fontSize: 35,
        textAlign: 'center'
    },
    MiddleContain: {
        flex: 4.5,
        paddingBottom: 80
    },
    OptionView: {
        flexDirection: 'row',
        paddingLeft: 25,
        paddingTop: 5,
    },
    OptionTxtMain: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 20,
        color: WHITE_COLOR_CODE
    },
    ImageContainer: {
        flex: 0.4,
        alignItems: 'center',
    },
    ImgeTextContain: {
        flex: 5.6,
        paddingLeft: 15
    }
})
export default Styles;