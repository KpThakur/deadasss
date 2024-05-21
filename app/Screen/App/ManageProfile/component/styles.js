import { StyleSheet } from 'react-native';
import { CHANGE_PASSWORD_COLOUR_CODE, UPDATE_BTN_COLOUR_CODE, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE, WHITE_COLOR_CODE, FONT_FAMILY_CURSUE, FONT_FAMILY_REGULAR } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHANGE_PASSWORD_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    RegistratnBtn: {
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: UPDATE_BTN_COLOUR_CODE
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_CURSUE,
        textAlign: 'center',
        fontSize: 30,
        paddingLeft: 10,
        color: WHITE_COLOR_CODE
    },
    FooterContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    genderContainer:{
        marginTop: 0,
        borderRadius: 4,
        backgroundColor: WHITE_COLOR_CODE,
        margin: 15,
        marginBottom: 12,
        flexDirection: 'row',
        height: 65,
        alignItems: 'center'
    },
    genderText:{
        fontSize: 16,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        color: BLACK_COLOUR_CODE,
        paddingLeft: 25
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
        backgroundColor:"rgba(0,0,0,0.6)"
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
    ChallengeTxt: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize: 30,
        color: WHITE_COLOR_CODE
    },


})
export default Styles;