import { StyleSheet } from 'react-native';
import {
    COMMON_BLUE_COLOUR, PAYMENT_DETAIL_SCREEN_COLOUR_CODE, WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PAYMENT_DETAIL_SCREEN_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    RegistratnBtn: {
        margin: 10,
        marginTop: 40,
        backgroundColor: COMMON_BLUE_COLOUR
    },
    FirstContainer: {
        flex: 1
    },
    CrossViewTxt: {
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: 10,
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 25
    },
    PaymentDetailTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 27,
        textAlign: 'center'
    },
    UpdateAccountView: {
        flex: 1, alignItems: 'center',
        width: '100%'
    },
    UpdateAccountTxt: {
        fontSize: 34, width: '100%',
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        color: WHITE_COLOR_CODE,
    },
    AccountNumberView: {
        backgroundColor: WHITE_COLOR_CODE,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        marginTop: 40
    },
    AccountNumberTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 19,
        paddingTop: 10
    },
    StripeIDView: {
        backgroundColor: WHITE_COLOR_CODE,
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
        marginTop: 20
    }
})
export default Styles;