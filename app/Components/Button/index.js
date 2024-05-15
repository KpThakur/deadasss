import React, {Fragment} from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  WHITE_COLOR_CODE,
  BLACK_COLOUR_CODE,
  FONT_FAMILY_REGULAR,
} from '../../Utils/constant';
const Button = props => {
  const {
    buttonText,
    style,
    buttonLabelStyle,
    onPress,
    LeftBtnImage,
    RightBtnImage,
  } = props;
  const {button, buttonLabel} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[button, style]}>
      <Image source={LeftBtnImage} />
      <Text style={[buttonLabel, buttonLabelStyle]}>{buttonText}</Text>
      <Image source={RightBtnImage} />
    </TouchableOpacity>
  );
};
Button.Button = {
  buttonText: 'Submit',
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: BLACK_COLOUR_CODE,
    height: 50,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    // width: '85%'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: WHITE_COLOR_CODE,
    fontFamily: FONT_FAMILY_REGULAR,
  },
});
export default Button;
