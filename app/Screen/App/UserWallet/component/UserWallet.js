import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import Button from '../../../../Components/Button';
import {
  FONT_FAMILY_SFU_REGULAR,
  CHANGE_PASSWORD_COLOUR_CODE,
  WHITE_COLOR_CODE,
  BLACK_COLOUR_CODE,
} from '../../../../Utils/constant';

import styles from './styles';
const dataaa = [
  {
    create_date: '2021-03-25T10:19:48.000Z',
    pay_to_user_id: 73,
    challenge_code: '',
    payment_amount: 0,
    challenge_title: 'Withdrawal Amount',
    amount_pay_by: 'Stripe',
  },
  {
    create_date: '2021-03-26T04:24:42.000Z',
    pay_to_user_id: 73,
    pay_from_id: 34,
    challenge_code: '1V8MS',
    payment_amount: 50,
    challenge_title: 'Hdgdgd',
    amount_pay_by: 'Manish patidar',
  },
  {
    create_date: '2021-03-26T04:30:05.000Z',
    pay_to_user_id: 73,
    pay_from_id: 34,
    challenge_code: 'OYJ7U',
    payment_amount: 50,
    challenge_title: 'Gerht',
    amount_pay_by: 'Manish patidar',
  },
  {
    create_date: '2021-03-26T04:36:24.000Z',
    pay_to_user_id: 73,
    pay_from_id: 34,
    challenge_code: 'PBY9O',
    payment_amount: 25,
    challenge_title: 'Grhfhf',
    amount_pay_by: 'Manish patidar',
  },
  {
    create_date: '2021-03-26T04:39:54.000Z',
    pay_to_user_id: 73,
    pay_from_id: 34,
    challenge_code: '6LXNK',
    payment_amount: 50,
    challenge_title: 'Fdfe',
    amount_pay_by: 'Manish patidar',
  },
  {
    create_date: '2021-03-26T04:42:46.000Z',
    pay_to_user_id: 73,
    pay_from_id: 34,
    challenge_code: 'PQ8AN',
    payment_amount: 50,
    challenge_title: 'Rgh',
    amount_pay_by: 'Manish patidar',
  },
  {
    create_date: '2021-03-31T07:31:58.000Z',
    pay_to_user_id: 73,
    pay_from_id: 80,
    challenge_code: 'DQG7X',
    payment_amount: 80,
    challenge_title: 'Thiya',
    amount_pay_by: 'Kana',
  },
  {
    create_date: '2021-03-31T07:45:15.000Z',
    pay_to_user_id: 73,
    pay_from_id: 51,
    challenge_code: 'WO7JM',
    payment_amount: 50,
    challenge_title: 'Scsa',
    amount_pay_by: 'Neww demo',
  },
  {
    create_date: '2021-03-31T09:37:20.000Z',
    pay_to_user_id: 73,
    pay_from_id: 85,
    challenge_code: '7OOIE',
    payment_amount: 50,
    challenge_title: 'Csvr',
    amount_pay_by: 'Avinash',
  },
  {
    create_date: '2021-04-01T06:16:57.000Z',
    pay_to_user_id: 73,
    pay_from_id: 39,
    challenge_code: 'M9LB2',
    payment_amount: 50,
    challenge_title: '5-+7',
    amount_pay_by: 'J',
  },
  {
    create_date: '2021-04-01T07:18:04.000Z',
    pay_to_user_id: 73,
    pay_from_id: 51,
    challenge_code: 'UNQQU',
    payment_amount: 100,
    challenge_title: 'This is my challenge',
    amount_pay_by: 'Neww demo',
  },
  {
    create_date: '2021-04-01T07:38:31.000Z',
    pay_to_user_id: 73,
    pay_from_id: 51,
    challenge_code: 'ZKSO7',
    payment_amount: 50,
    challenge_title: 'Thosssssssdd',
    amount_pay_by: 'Neww demo',
  },
  {
    create_date: '2021-04-01T07:47:00.000Z',
    pay_to_user_id: 73,
    pay_from_id: 51,
    challenge_code: '1XW7P',
    payment_amount: 50,
    challenge_title: 'Tgff',
    amount_pay_by: 'Neww demo',
  },
  {
    create_date: '2021-04-01T09:09:47.000Z',
    pay_to_user_id: 73,
    pay_from_id: 51,
    challenge_code: '2VY2P',
    payment_amount: 200,
    challenge_title: 'This is my challenge',
    amount_pay_by: 'Neww demo',
  },
];
const UserWallet = props => {
  const navigation = useNavigation();
  function onPressChallenge() {
    navigation.navigate('ChallangeScreen');
  }
  function onPressUser() {
    navigation.navigate('SettingScreen');
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />

        <View style={{flex: 1, paddingTop: 25}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: Platform.OS === 'ios' ? 20 : 5,
              flexDirection: 'row',
            }}>
            <View style={{width: '20%'}} />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{height: 70, resizeMode: 'contain'}}
                source={require('../../../../Assets/deadasss.png')}
              />
            </View>
            <View
              style={{
                width: '20%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => props.onPressCross()}
                style={{paddingRight: 25}}>
                <Text style={styles.ChallengeTxt}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                height: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  paddingLeft: 25,
                  fontFamily: FONT_FAMILY_SFU_REGULAR,
                }}>
                Account Balance and History
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  fontFamily: FONT_FAMILY_SFU_REGULAR,
                }}>
                {props.userWalletDetails
                  ? props.userWalletDetails.first_name
                  : null}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 20,
                padding: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../../Assets/wallet.png')}
                  style={{height: 40, width: 40}}
                />
                <View style={{paddingLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontFamily: FONT_FAMILY_SFU_REGULAR,
                    }}>
                    Balance
                  </Text>
                </View>
              </View>
              <View style={{paddingRight: 20, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#fff',
                    fontFamily: FONT_FAMILY_SFU_REGULAR,
                  }}>
                  ${' '}
                  {props.userWalletDetails
                    ? props.userWalletDetails.user_wallet
                    : null}
                </Text>
              </View>
            </View>
            {props.userWalletDetails?.user_wallet == 0 ? (
              <View
                style={{
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => props.WithdrawalFun()}
                  style={{
                    backgroundColor: BLACK_COLOUR_CODE,
                    height: 50,
                    borderRadius: 5,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_FAMILY_SFU_REGULAR,
                      fontSize: 15,
                    }}>
                    Withdrawal
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => props.WithdrawalFun()}
                  style={{
                    backgroundColor: BLACK_COLOUR_CODE,
                    height: 50,
                    borderRadius: 5,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_FAMILY_SFU_REGULAR,
                      fontSize: 15,
                    }}>
                    Withdrawal
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{paddingLeft: 15}}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: FONT_FAMILY_SFU_REGULAR,
                  fontSize: 18,
                }}>
                Payment History
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: FONT_FAMILY_SFU_REGULAR,
                  fontSize: 15,
                }}>
                Your recent payment will show here
              </Text>
              <View style={{paddingTop: 10, paddingBottom: 70, height: '70%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={props.historyData}
                  style={{flex: 1}}
                  // data={dataaa}
                  renderItem={({item, index}) =>
                    !item.payment_amount == 0 ? (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          height: 60,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '80%',
                            alignItems: 'center',
                          }}>
                          <View style={{width: 60}}>
                            <Image
                              source={require('../../../../Assets/money-transfer.png')}
                              style={{height: 40, width: 40}}
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#fff',
                                fontFamily: FONT_FAMILY_SFU_REGULAR,
                                fontSize: 15,
                              }}>
                              {item.payment_status == 5
                                ? item.challenge_title
                                : item.amount_pay_by}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                color: '#fff',
                                fontFamily: FONT_FAMILY_SFU_REGULAR,
                              }}>
                              {moment(item.create_date).format('DD MMM YYYY')}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{paddingRight: 20, justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 'bold',
                              color:
                                item.payment_status == 5
                                  ? '#F23C23'
                                  : '#fff',
                              fontFamily: FONT_FAMILY_SFU_REGULAR,
                            }}>
                            {item.payment_status == 5 ? '-' : '+'} ${' '}
                            {item.transferamount}
                          </Text>
                        </View>
                      </View>
                    ) : null
                  }
                />
              </View>
            </View>
          </View>
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
    </View>
  );
};
export default UserWallet;
