import { StyleSheet } from 'react-native';
import {
     TIME_UP_START_COLOUR_CODE, WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_CURSUE
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TIME_UP_START_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    CrossViewTxt: {
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30
    },
    PaymentDetailTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 20,
        textAlign: 'center'
    },
})
export default Styles;