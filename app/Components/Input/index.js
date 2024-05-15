import React, {Fragment, useState} from 'react';
import {View, Image, TextInput, StyleSheet} from 'react-native';
import {
  BLACK_COLOR_CODE,
  WHITE_COLOR_CODE,
  FONT_FAMILY_TYPE_WRITER,
  BLACK_COLOUR_CODE,
  GRAY_COLOR,
} from '../../Utils/constant';
const Input = props => {
  const {
    autoCapitalize,
    autoFocus,
    keyboardType,
    multiline,
    placeholder,
    returnKeyType,
    secureTextEntry,
    value,
    maxLength,
    onChangeText,
    textInputStyle,
    leftImage,
    placeholderTextColor,
    containerStyle,
    InputType,
  } = props;
  const {container, textInput, logoStyle} = style;
  return (
    <View style={[container, containerStyle]}>
      <Image style={[logoStyle]} source={leftImage} />
      <TextInput
        onChangeText={text => onChangeText(text)}
        // keyboardType="default"
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={InputType == null ? placeholder : null}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        value={value}
        placeholderTextColor={placeholderTextColor}
        // selectionColor={'transparent'}
        selectionColor={GRAY_COLOR}
        style={[textInput, textInputStyle]}
        maxLength={maxLength}
        numberOfLines={props.numberOfLines}
      />
    </View>
  );
};
Input.defaultProps = {
  placeholder: 'name',
  secureTextEntry: true,
  placeholderTextColor: BLACK_COLOUR_CODE,
  keyboardType: 'default',
  value: '',
  InputHeading: 'Email',
  InputType: null,
};
const style = StyleSheet.create({
  container: {
    marginTop: 0,
    borderRadius: 4,
    backgroundColor: WHITE_COLOR_CODE,
    margin: 15,
    marginBottom: 12,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 14,
    fontFamily: FONT_FAMILY_TYPE_WRITER,
    color: BLACK_COLOR_CODE,
    width: '80%',
  },
  logoStyle: {
    marginTop: 10,
  },
});
export default Input;
