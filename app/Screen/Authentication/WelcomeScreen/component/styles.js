import { StyleSheet } from 'react-native';
import { WELCOME_BACKGROUND_COLOUR, COMMON_BLUE_COLOUR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE, FONT_FAMILY_GROY_BOLD } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WELCOME_BACKGROUND_COLOUR
    },
    body: {
        flex: 6
    },
    WelcomeToView: {
        flex: 1.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    SecondCOntain: {
        flex: 4.5,
        width:'100%',
        alignItems: 'center',
        paddingTop: 10
    },
    DescrpctnText: {
        alignItems: 'center',
        paddingTop: 25
    },
    DescrpctnTextStyle: {
        color: WHITE_COLOR_CODE,
        fontSize: 18,
        fontFamily: FONT_FAMILY_TYPE_WRITER
    },
    RegisterBtn: {
        marginTop: 20,
        backgroundColor: WHITE_COLOR_CODE
    },
    WelcomeToText: {
        fontFamily: FONT_FAMILY_GROY_BOLD,
        fontSize: 45,
        color: WHITE_COLOR_CODE,
        width: '100%',
        textAlign: 'center',
        lineHeight:65
        // textShadowColor: 'rgba(0, 0, 0, 0.75)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 10
    }

})
export default Styles;