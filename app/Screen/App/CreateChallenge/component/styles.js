import { StyleSheet } from 'react-native';
import { RED_COLOUR_CODE, FONT_FAMILY_CURSUE, FONT_FAMILY_GROY_BOLD, FONT_FAMILY_REGULAR, FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: RED_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    HeaderCOntainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ChallengeView: {
        // flex: 4,
        // alignItems: 'flex-end',
        paddingTop: 10,
    },
    ChallengeTxt: {
        fontFamily: FONT_FAMILY_GROY_BOLD,
        fontSize: 32,
        color: WHITE_COLOR_CODE
    },
    ChallengeTxt1: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        color: WHITE_COLOR_CODE
    },
    CrossView: {
        flex: 2.8,
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    TitleViewMain: {
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        paddingTop: 10
    },
    TitleTextMain: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 17
    },
    RememberTxt: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 17,
        textAlign: 'center',

        paddingTop: 10
    },
    VideoHandleText: {
        fontFamily: FONT_FAMILY_GROY_BOLD,
        fontSize: 15,
        textAlign: 'center',
        color: WHITE_COLOR_CODE,
        lineHeight: 28,
    },
    BoxesCOntainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 60,
        paddingRight: 60,
        marginTop: 20
    },
    BoxesView: {
        height: 55,
        width: 55,
        backgroundColor: WHITE_COLOR_CODE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    BoxesText: {
        fontSize: 25,
        fontFamily: FONT_FAMILY_REGULAR
    },
    RequestDescprtnTxt: {
        fontFamily: FONT_FAMILY_GROY_BOLD,
        paddingTop: 15,
        fontSize: 18,
        textAlign: 'center',
        color: WHITE_COLOR_CODE,
        lineHeight: 28,
        marginLeft: 4,
        marginRight: 4
    },
    RequestDescprtnTxt1: {
        fontFamily: FONT_FAMILY_REGULAR,
        paddingTop: 15,
        fontSize: 13,
        textAlign: 'center',
        color: '#000',
        lineHeight: 20,
        marginLeft: 4,
        marginRight: 4
    },
    DollarCOntainer: {
        backgroundColor: WHITE_COLOR_CODE,
        height: 50,
        justifyContent: 'center',
        marginLeft: 110,
        marginRight: 110,
        marginTop: 15
    },
    DollarText: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: RED_COLOUR_CODE,
        paddingLeft: 10,
        fontSize: 35,
    },
    RemeberSetupTxt: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 17
    },
    SettingStyleTxt: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 17,
        bottom: 15
    },
    challegeTitle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: RED_COLOUR_CODE,
        fontSize: 14,
        height: 54,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: WHITE_COLOR_CODE,
        paddingLeft: 15,
        // paddingTop: Platform.OS === "ios" ?5: 18,
        justifyContent: 'center',
        width: "60%"
    },
    amoutSty: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: RED_COLOUR_CODE,
        fontSize: 35,
        position: 'absolute',
        right: 0,
        left: 50
    },
    amotshowCon: {
        backgroundColor: WHITE_COLOR_CODE,
        height: 50,
        justifyContent: 'center',
        marginLeft: 110, marginRight: 110, marginTop: 30
    },
    amotshowTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: RED_COLOUR_CODE, paddingLeft: 10, paddingTop: 10, fontSize: 20
    },
    createBtnCon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom:15
    },
    videoChatTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }
})
export default Styles;