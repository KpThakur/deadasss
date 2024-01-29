import { StyleSheet } from 'react-native';
import {
    COMMON_BLUE_COLOUR, PAYMENT_DETAIL_SCREEN_COLOUR_CODE, WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE,FONT_FAMILY_SFU_REGULAR, FONT_FAMILY_GROY_BOLD
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PAYMENT_DETAIL_SCREEN_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    CrossViewTxt: {
        // alignItems: 'flex-end',
        paddingRight: 20,
        // paddingTop: 10,
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        paddingTop:10
    },
    PaymentDetailTxt: {
        fontFamily: FONT_FAMILY_GROY_BOLD,
        fontSize: 27,
        textAlign: 'center',
    },
    UpdateAccountView: {
        flex: 4.5, 
        alignItems: 'center',
        width: '100%'
    },
    UpdateAccountTxt: {
        fontSize: 34, width: '100%',
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        color: "#000",
    },
})
export default Styles;