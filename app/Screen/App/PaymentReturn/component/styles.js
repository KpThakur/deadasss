import { StyleSheet } from 'react-native';
import { CHALLANGE_SCREEN_COLOUR_CODE, FONT_FAMILY_CURSUE, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHALLANGE_SCREEN_COLOUR_CODE
    },
    body: {
        flex: 6,
    },
    FirstContainer: {
        flex: 4, width: '99%',
        justifyContent: 'flex-end'
    },
    LetChllngeTxt: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize:30,
        color: WHITE_COLOR_CODE
    },
    LetChllngeTxt1: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 25,
        color: WHITE_COLOR_CODE
    },
    SecondCOntain: {
        flex: 2,
        paddingBottom: 15,
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent:'space-between',
        alignItems: 'flex-end',
    }
})
export default Styles;