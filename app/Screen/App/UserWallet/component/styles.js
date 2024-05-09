import {StyleSheet} from 'react-native';
import {
  CHANGE_PASSWORD_COLOUR_CODE,
  UPDATE_BTN_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  BLACK_COLOUR_CODE,
  FONT_FAMILY_TYPE_WRITER,
  RED_COLOUR_CODE,
  WHITE_COLOR_CODE,
  FONT_FAMILY_CURSUE,
  FONT_FAMILY_REGULAR,
  GRAY_COLOR,
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHANGE_PASSWORD_COLOUR_CODE,
  },
  body: {
    flex: 6,
  },
  LoginTextSTyle: {
    fontFamily: FONT_FAMILY_CURSUE,
    textAlign: 'center',
    fontSize: 30,
    paddingLeft: 10,
    color: WHITE_COLOR_CODE,
  },
  FooterContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    backgroundColor: CHANGE_PASSWORD_COLOUR_CODE,
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  AboutUsTitle: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 27,
    color: WHITE_COLOR_CODE,
    fontFamily: FONT_FAMILY_TYPE_WRITER,
  },
  ChallengeTxt: {
    fontFamily: FONT_FAMILY_TYPE_WRITER,
    fontSize: 30,
    color: WHITE_COLOR_CODE,
  },
  dailogText: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    // marginVertical: 5,
  },
  dailogBox: {marginVertical: 20, marginHorizontal: 20},
  dailogView: {
    marginVertical: 5,
    // padding: 5,
  },
});
export default Styles;
