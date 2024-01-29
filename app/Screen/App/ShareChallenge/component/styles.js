import { Platform, StyleSheet } from 'react-native';
import {
      WHITE_COLOR_CODE
    , FONT_FAMILY_TYPE_WRITER, FONT_FAMILY_CURSUE, FONT_FAMILY_REGULAR
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8b532"
    },
    body: {
        flex: 6
    },
    CrossViewTxt: {
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: Platform.OS === "ios" ?30: 15,
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        paddingTop:10
    },
    PaymentDetailTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 32,
        textAlign: 'center',
        color:WHITE_COLOR_CODE
    },
    YourChallengetitle:{
        fontFamily: FONT_FAMILY_CURSUE, 
        color: WHITE_COLOR_CODE, 
        fontSize: 34 ,
        textAlign:'center',
        width:'100%'
    },
    ShareIconViewContain:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingLeft:12,
        paddingRight:12,
        paddingTop:30
    },
    ShareTxtStyle:{
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign:'center',
        fontSize: 10
    }
})
export default Styles;