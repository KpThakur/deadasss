import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import {
  PAYMENT_DETAIL_SCREEN_COLOUR_CODE,
  WHITE_COLOR_CODE,
} from '../../../../Utils/constant';
import Button from '../../../../Components/Button';
import styles from '../../../App/CreateAccount/component/styles';
import {useNavigation} from '@react-navigation/native';

const SucessScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: PAYMENT_DETAIL_SCREEN_COLOUR_CODE}}>
      <StatusBar backgroundColor={PAYMENT_DETAIL_SCREEN_COLOUR_CODE} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10%',
        }}>
        <View>
          <Image
            style={{backgroundColor: 'black', width: 150, height: 150}}
            borderRadius={150}
            resizeMode="cover"
            source={require('../../../../Assets/right_img.png')}
          />
        </View>
        <View>
          <Text style={{fontSize: 20, color: '#0A6847'}}>
            Payment Successfull Transfer
          </Text>
        </View>
        <View style={{marginVertical: '2%'}}>
          <Text>
            This amount will be reflected 7 to 10 days in your account
          </Text>
        </View>
        <View style={{marginTop: '80%'}}>
          <Button
            onPress={() => navigation.navigate('ChallangeScreen')}
            buttonText={'Back to Dashboard'}
            style={[
              styles.RegistratnBtn,
              {padding: '2%', paddingHorizontal: '10%'},
            ]}
            buttonLabelStyle={{color: WHITE_COLOR_CODE, fontSize: 15}}
          />
        </View>
      </View>
    </View>
  );
};

export default SucessScreen;
