import { StyleSheet } from 'react-native';
import {
    COMMON_BLUE_COLOUR, CHANGE_PASSWORD_COLOUR_CODE, WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    CrossViewTxt: {
        alignItems: 'flex-end',
        marginRight:20,
        marginTop:35
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30
    },
    PaymentDetailTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 27,
        textAlign: 'center'
    },
    MinutesView: {
        color: WHITE_COLOR_CODE,
        textAlign: 'center',
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 65
    },
    ShareCancelView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    ShareCancelTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: WHITE_COLOR_CODE,
        fontSize: 25
    },
    DescrptnView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15
    },
    FooterView: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
    },
    MainModalView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    ModalContainer: {
        backgroundColor: '#58c9ff',
        // backgroundColor: '#fff',
        // opacity: 0.9,
        borderRadius: 30,
        width: 310,
        height: 180,
        padding: 8,
        alignItems: 'center',
        paddingTop: 30
    },
    ConifrmText: {
        fontFamily: FONT_FAMILY_TYPE_WRITER, textAlign: 'center', fontSize: 18,color:'#fff'
    },
    YesNoView: {
        flexDirection: 'row', width: '60%', justifyContent: 'space-evenly'
    },
    YesNoTextStyle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER, textAlign: 'center', fontSize: 22,color:'#fff'
    }
})
export default Styles;