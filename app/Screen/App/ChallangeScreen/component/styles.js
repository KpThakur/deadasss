import { StyleSheet } from 'react-native';
import { BLACK_COLOUR_CODE, CHALLANGE_SCREEN_COLOUR_CODE, CHALLENGE_LATE_COLOUR_CODE, COMMON_BLUE_COLOUR, FONT_FAMILY_CURSUE, FONT_FAMILY_GROY_BOLD, FONT_FAMILY_REGULAR, GRAY_COLOR, WELCOME_BACKGROUND_COLOUR, WHITE_COLOR_CODE, YOU_ALL_COLOUR_CODE } from '../../../../Utils/constant';
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CHALLANGE_SCREEN_COLOUR_CODE
    },
    body: {
        flex: 6,
    },
    FirstContainer: {
        flex: 4, width: '100%',
        justifyContent: 'flex-end'
    },
    LetChllngeTxt: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY_CURSUE,
        fontSize: 45,
        color: WHITE_COLOR_CODE
    },
    SecondCOntain: {
        flex: 2,
        paddingBottom: 15,
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent:'space-between',
        alignItems: 'flex-end',
    },
    modalMainView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgba(0,0,0,0.6)"
      },
      modalContainView:{
        backgroundColor: WHITE_COLOR_CODE,
        paddingHorizontal: 22,
        paddingVertical: 20,
        borderRadius: 12,
       // width: '100%'
      },
      modalTextHoldStyle:{
        color: YOU_ALL_COLOUR_CODE,
        fontFamily: FONT_FAMILY_GROY_BOLD,
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 3,
       // textAlign:'center'
      },
      modalTextStyle:{
        color: GRAY_COLOR,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 16,
        paddingLeft: 5,
        paddingBottom: 5
      },
      buttnView:{
       // backgroundColor:'red',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop: 20,
        paddingBottom: 3
      },
      buttnText:{
        color: GRAY_COLOR,
        marginRight: 30,
        fontFamily: FONT_FAMILY_REGULAR,
        fontSize: 14
      },
      imgStyle:{
        width: 90,
        height: 40,
        alignSelf:'center'
        
      }
})
export default Styles;