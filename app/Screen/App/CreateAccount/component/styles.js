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
  BLACK_COLOR_CODE,
} from '../../../../Utils/constant';
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHANGE_PASSWORD_COLOUR_CODE,
  },
  body: {
    flex: 6,
    justifyContent: 'flex-start',
  },
  RegistratnBtn: {
    margin: 10,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: UPDATE_BTN_COLOUR_CODE,
  },
  LoginTextSTyle: {
    fontFamily: FONT_FAMILY_CURSUE,
    textAlign: 'center',
    fontSize: 30,
    paddingLeft: 10,
    color: WHITE_COLOR_CODE,
  },
  genderContainer: {
    marginTop: 0,
    borderRadius: 4,
    backgroundColor: WHITE_COLOR_CODE,
    margin: 15,
    flexDirection: 'row',
    height: 65,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_TYPE_WRITER,
    color: BLACK_COLOUR_CODE,
    paddingLeft: 20,
    paddingTop: 5,
  },
  BusinessContainer: {
    marginTop: 0,
    paddingTop: 9,
    borderRadius: 4,
    backgroundColor: WHITE_COLOR_CODE,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  RoutingNo: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
  },
  MainModalView: {
    flex: 1,
  },
  ModalContainer: {
    width: '90%',
    paddingLeft: 20,
    backgroundColor: WHITE_COLOR_CODE,
    marginLeft: 18,
    borderBottomWidth: 0.5,
    paddingTop: 9,
  },
  modalText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY_TYPE_WRITER,
    color: BLACK_COLOUR_CODE,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem: {
    fontFamily: FONT_FAMILY_REGULAR,
    textAlign: 'center',
    color: COMMON_BLUE_COLOUR,
  },
  ChallengeTxt: {
    fontFamily: FONT_FAMILY_TYPE_WRITER,
    fontSize: 30,
    color: WHITE_COLOR_CODE,
  },
});
export default Styles;
