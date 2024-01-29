import { StyleSheet } from 'react-native';
import { REGISTRATION_BACKGROUND_COLOUR, COMMON_BLUE_COLOUR,
     FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE, WHITE_COLOR_CODE,FONT_FAMILY_TYPE_WRITER } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: REGISTRATION_BACKGROUND_COLOUR
    },
    body: {
        flex: 6,
    },
    FirstContainer: {
        flex: 4,
        width: '100%',
        justifyContent: 'flex-end',
        paddingTop: 20
    },
    LetChllngeTxt: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 40,
        color: WHITE_COLOR_CODE
    },
    SecondCOntain: {
        paddingBottom: 15,
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-end',
    },
    PayTitle: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 20,
        paddingTop: 10
    },
    TimingText: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 70
    },
    TimingPriceTxt: {
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 24,
        margin:5
    },
    PayNowStyle: {
        marginTop: 15,
        backgroundColor: COMMON_BLUE_COLOUR,
        marginBottom: 15
    },
    SecondContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    ActNoewTxt: {
        color: WHITE_COLOR_CODE,
        fontSize: 17
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    starImageStyle: {
        resizeMode: 'cover',
        width: 20,
        height: 20,
        marginLeft: 5
    },
    CrossViewTxt: {
        marginRight:20,
        marginTop:20
    },
    CrossTextSTyle: {
        color: WHITE_COLOR_CODE,
        fontFamily: FONT_FAMILY_TYPE_WRITER,
        fontSize:30
    },
})
export default Styles;