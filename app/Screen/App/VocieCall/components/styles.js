import { StyleSheet } from 'react-native';
import { FONT_FAMILY_REGULAR, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE, COMMON_BLUE_COLOUR } from '../../../../Utils/constant';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 4.5,
        backgroundColor: "#232f3f"
    },
    HeaderContain: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1.5,
        borderBottomWidth: 0.5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: COMMON_BLUE_COLOUR
    },
    HeaderImgView: {
        flexDirection: 'row',
        flex: 4.5,
        alignItems: 'center'
    },
    MainHdrInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    MainUserImg: {
        width: 45,
        height: 45,
        borderRadius: 40
    },
    UserInfoView: {
        paddingLeft: 10,
        width: '75%'
    },
    UserNameTxt: {
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 23,
        color: WHITE_COLOR_CODE
    },
    RingingTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 15,
        color: WHITE_COLOR_CODE
    },
    USerTimeTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 11,
        color: WHITE_COLOR_CODE
    },
    UserNameView: {
        alignItems: 'center',
        paddingBottom: 10
    },
    MainUserDpView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disscontedImgView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default styles;