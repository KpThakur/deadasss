import React, { useEffect, useContext } from 'react';
import {
  View
} from 'react-native';
import Splash from './components/Splash';
function SplashView({ navigation }) {
  useEffect(() => {
    handleAnimation()
  }, []);
  const handleAnimation = async () => {
    const wait = time => new Promise((resolve) => setTimeout(resolve, time));
    return wait(3000).then(() => navigation.navigate('WelcomeScreen'))
  };
  return (
    <View style={{ flex: 1 }}>
      <Splash
      />
    </View>
  );
}
export default SplashView;
