import React, {useState, useCallback, useEffect} from 'react';
import UserWalletScreen from './component/UserWallet';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import styles from './component/styles';
import {
  FONT_FAMILY_REGULAR,
  GRAY_COLOR,
  RED_COLOUR_CODE,
} from '../../../Utils/constant';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';

const UserWallet = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [AboutUsDescription, setAboutUs] = useState('');
  const [openlink, setopenLink] = useState('');
  const [userWalletDetails, setUserWalletDetails] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const navigation = useNavigation();
  const [visible, setvisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      _UserWalletDetails();
      HistoryFun();
      return () => {
        _UserWalletDetails(), HistoryFun();
      };
    }, []),
  );

  async function _UserWalletDetails(params) {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.getwalletAmount);
      console.log(
        '🚀 ~ file: index.js ~ line 30 ~ _UserWalletDetails ~ data',
        data,
      );
      if (data.status === 200) {
        setIsLoading(false);
        setUserWalletDetails(data.data);
      } else if (data.status === 201) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
        setIsLoading(false);
      } else if (data.status === 401) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }
  async function HistoryFun(params) {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.getPaymentHistory);
      if (data.status === 200) {
        setIsLoading(false);
        setHistoryData(data.data);
      } else if (data.status === 201) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
        setIsLoading(false);
      } else if (data.status === 401) {
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
        setIsLoading(false);
      }
    } catch (error) {
      // setAlertMessage(error.toString());
      // AnimatedAlert.showAlert()
      setIsLoading(false);
    }
  }
  async function WithdrawalFun() {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.checkStripeAccountVerify);
      console.log('🚀 ~ WithdrawalFun ~ data:', data);

      if (data.status === 200) {
        // navigation.navigate('WithdrawScreen', userWalletDetails);
        navigation.navigate('WithdrawScreen', {
          WalletDetails: userWalletDetails,
          onPressCross: onPressCross,
          userWalletDetailsfun: _UserWalletDetails,
        });
        console.log('====================================');
        console.log(userWalletDetails);
        console.log('====================================');
        setIsLoading(false);
      } else if (data.status === 201) {
        // setvisible(true);

        setIsLoading(false);
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 202) {
        setIsLoading(false);
        setvisible(true);
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
      } else if (data.status === 203) {
        setIsLoading(false);
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 204) {
        setopenLink(data.data?.accountLink);
        setIsLoading(false);
        setvisible(true);
      } else if (data.status === 401) {
        setIsLoading(false);
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function createStripeAccount() {
    try {
      setIsLoading(true);
      const {data} = await apiCall('POST', ENDPOINTS.createStripeAccount);
      console.log('🚀 ~ createStripeAccount ~ data:', data);

      if (data.status === 200) {
        console.log('====================================');
        console.log(data.data.accountLink);
        console.log('====================================');
        setIsLoading(false);
        Linking.openURL(`${data.data.accountLink}`);
      } else if (data.status === 201) {
        setIsLoading(false);
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 202) {
        setIsLoading(false);
      } else if (data.status === 401) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function withdraw() {
    // if (userWalletDetails.stripe_account_verifie == '0') {
    //   props.navigation.navigate('CreateAccount');
    //   // try {
    //   //     setIsLoading(true)
    //   //     const { data } = await apiCall('POST', ENDPOINTS.createStripeAccount);
    //   //     if (data.status === 200) {
    //   //         setIsLoading(false)
    //   //         props.navigation.navigate("WebView", { url: data.data.accountLink })
    //   //     } else if (data.status === 201) {
    //   //         setAlertMessage(data.message);
    //   //         AnimatedAlert.showAlert()
    //   //         setIsLoading(false)
    //   //     } else if (data.status === 401) {
    //   //         // setAlertMessage(data.message);
    //   //         // AnimatedAlert.showAlert()
    //   //         setIsLoading(false)
    //   //     }
    //   // } catch (error) {
    //   //     setAlertMessage(error.toString());
    //   //     AnimatedAlert.showAlert()
    //   //     setIsLoading(false)
    //   // }
    // }
    // else {
    try {
      const params = {
        payment_amount: userWalletDetails.user_wallet,
      };
      setIsLoading(true);
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.withdrawWalletAmount,
        params,
      );
      if (data.status === 200) {
        setIsLoading(false);
        _UserWalletDetails();
      } else if (data.status === 201) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      } else if (data.status === 401) {
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage(error.toString());
      AnimatedAlert.showAlert();
      setIsLoading(false);
    }
  }
  //   }

  function onPressCross() {
    props.navigation.goBack(null);
  }
  return (
    <View style={{flex: 1}}>
      {isLoading && <Loader state={isLoading} />}

      <UserWalletScreen
        userWalletDetails={userWalletDetails}
        historyData={historyData}
        WithdrawalFun={() => WithdrawalFun()}
        onPressCross={onPressCross}
      />
      <AnimatedAlert
        alertMessage={alertMessage}
        alertBGColor={RED_COLOUR_CODE}
      />

      <Dialog
        visible={visible}
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              onPress={() => {
                setvisible(false);
              }}
            />
            <DialogButton
              text="OK"
              onPress={() => {
                setvisible(false),
                  openlink !== ''
                    ? Linking.openURL(`${openlink}`)
                    : createStripeAccount();
              }}
            />
          </DialogFooter>
        }>
        <DialogContent>
          <View style={styles.dailogBox}>
            <View style={styles.dailogView}>
              <Text style={styles.dailogText}>
                {openlink !== ''
                  ? 'Your stripe Account not Verify'
                  : 'your Stripe Account not created'}
              </Text>
            </View>
            <View style={styles.dailogView}>
              <Text style={styles.dailogText}>
                {openlink !== ''
                  ? 'Press Ok to Verify an Stripe Account'
                  : 'Press Ok to create an Stripe Account'}
              </Text>
            </View>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default UserWallet;
