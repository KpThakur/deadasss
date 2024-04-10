import { Platform, StyleSheet } from 'react-native';
import { REGISTRATION_BACKGROUND_COLOUR, FONT_FAMILY_REGULAR, BLACK_COLOR_CODE, WHITE_COLOR_CODE, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, COMMON_BLUE_COLOUR } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: REGISTRATION_BACKGROUND_COLOUR
    },
    body: {
        flex: 6
    },
    GenderDateContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between'
    },
    RegionContainer: {
        height: 58,
        width: '90%',
        marginTop: 0,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: WHITE_COLOR_CODE
    },
    GenderContainer: {
        height: 58,
        width: '48%',
        marginTop: 0,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: WHITE_COLOR_CODE
    },
    GenderImge: {
        marginTop: 5,
        marginLeft: 12
    },
    GenderText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: BLACK_COLOUR_CODE,
        paddingLeft: 10,
    },
    RegistratnBtn: {
        margin: 10,
        backgroundColor: RED_COLOUR_CODE
    },
    AlredyAccntTxt: {
        paddingBottom: 30,
        color: BLACK_COLOUR_CODE,
        fontFamily: FONT_FAMILY_REGULAR,
        textAlign: 'center'
    },

    MainModalView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    ModalContainer: {
        borderRadius: 10,
        width: 250,
        height: 160,
        padding: 8,
        alignItems: 'center',
        backgroundColor: WHITE_COLOR_CODE,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderStyle: 'solid',
        elevation: 20,
        paddingTop: 30,
        position: 'absolute',
        zIndex: 1
    },



    alertBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    alertBox: {
        borderRadius: 10,
        width: 280,
        height: 150,
        alignItems: 'center',
        backgroundColor: WHITE_COLOR_CODE,
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderStyle: 'solid',
        elevation: 20,
        paddingTop: 30,
        flexDirection: 'row',
    },
    profileModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalItem: {
        fontFamily: FONT_FAMILY_REGULAR,
        textAlign: "center",
        color: COMMON_BLUE_COLOUR
    },

    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalView: {
        backgroundColor: WHITE_COLOR_CODE,
        borderWidth: 0.5,
        borderColor: '#dadada',
        width: '100%',
        height: '100%',
        paddingTop:Platform.OS === "ios" ? 20:0
    },
    TouchableFlse: {
        position: 'absolute',
        flex: 1,
        right: 0,
        paddingRight: 15,
        top: 14,
        zIndex: 1
    },

    MainCntrySlctTouchble: {
        flex: 5,
        flexDirection: 'row',
        padding: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dadada'
    },
    CountryText: {
        fontSize: 18,
        margin: 5,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
    },
    TxtInptStyle: {
        fontSize: 16,
        paddingLeft: 20,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        width: '85%',
        height:60,
        paddingTop:20,
    },
})
export default Styles;