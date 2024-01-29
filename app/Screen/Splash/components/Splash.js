import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import styles from '../components/styles';
function Splash(props) {
  return (
    <View style={styles.ViewContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../Assets/deadasss.png')} />
      </View>
    </View>
  )
};
export default Splash;
