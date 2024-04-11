import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  COMMON_BLUE_COLOUR,
  RED_COLOUR_CODE,
  WELCOME_BACKGROUND_COLOUR,
  WHITE_COLOR_CODE,
  YOU_ALL_COLOUR_CODE,
} from './constant';
const Loader = props => {
  return (
    <View
      style={{
        // backgroundColor: "#000",
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        opacity: 1,
        height: '100%',
      }}>
      <LottieView
        visible={true}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignSelf: 'center',
          width: 150,
        }}
        source={require('../Assets/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
