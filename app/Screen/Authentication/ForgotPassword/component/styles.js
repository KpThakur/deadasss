import { StyleSheet } from 'react-native';
import { LOGIN_COLOUR_CODE, FONT_FAMILY_REGULAR, COMMON_BLUE_COLOUR, BLACK_COLOUR_CODE, FONT_FAMILY_TYPE_WRITER, RED_COLOUR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LOGIN_COLOUR_CODE
    },
    body: {
        flex: 6
    },
    RegistratnBtn: {
        margin: 10,
        backgroundColor: COMMON_BLUE_COLOUR
    },
    FirstCOntainer: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginTextSTyle: {
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        textAlign: 'center',
        fontSize: 30
    },
})
export default Styles;