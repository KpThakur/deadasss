import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {
  WHITE_COLOR_CODE,
  CHANGE_PASSWORD_COLOUR_CODE,
} from '../../../../Utils/constant';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import {useNavigation} from '@react-navigation/native';
const SettingChangePassword = props => {
  const [OldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  function onPressChallenge() {
    navigation.navigate('ChallangeScreen');
  }
  function onPressUser() {
    navigation.navigate('SettingScreen');
  }



  function onPressUpdate() {
    const parameters = {
      OldPassword: OldPassword,
      NewPassword: NewPassword,
      ConfirmPassword: ConfirmPassword,
    };
    const valid = props.validationform(parameters);
    if (valid) {
      props._handleUpdatePassword(parameters);
    } else {
      console.log('validation failed');
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: Platform.OS === 'ios' ? 30 : 2,
              paddingBottom: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View />
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: 5, paddingRight: 5}}>
                <Image source={require('../../../../Assets/big_change.png')} />
              </View>
              <Text style={styles.LoginTextSTyle}>Change Password</Text>
            </View>
            <TouchableOpacity
              onPress={() => props.onPressCross()}
              style={{paddingRight: 25, paddingTop: 20}}>
              <Text style={styles.ChallengeTxt}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 3, justifyContent: 'flex-start'}}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                            <Image source={require('../../../../Assets/big_change.png')} />
                            <Text style={styles.LoginTextSTyle}>Change Password</Text>
                        </View> */}
            <Input
              onChangeText={OldPassword => setOldPassword(OldPassword)}
              value={OldPassword}
              placeholder="Old Password:"
              secureTextEntry={true}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
            <Input
              onChangeText={NewPassword => setNewPassword(NewPassword)}
              value={NewPassword}
              placeholder="New Password:"
              secureTextEntry={true}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
            <Input
              onChangeText={ConfirmPassword =>
                setConfirmPassword(ConfirmPassword)
              }
              value={ConfirmPassword}
              placeholder="Confirm Password:"
              secureTextEntry={true}
              textInputStyle={{paddingLeft: 20, height: 60, width: '100%'}}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              buttonText={'UPDATE'}
              style={styles.RegistratnBtn}
              buttonLabelStyle={{color: WHITE_COLOR_CODE}}
              onPress={() => onPressUpdate()}
            />
          </View>
          <View style={styles.FooterContainer}>
            <TouchableOpacity onPress={() => onPressChallenge()}>
              <Image source={require('../../../../Assets/deadasssDOT.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressUser()}>
              <Image source={require('../../../../Assets/profile.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SettingChangePassword;
