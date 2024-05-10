import React, {useState, useCallback, useEffect} from 'react';
import UserWalletScreen from './component/UserWallet';
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import Loader from '../../../Utils/Loader';
import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
// import styles from './component/styles';
// import Styles from '../ChallangeScreen/component/styles';
import {
  FONT_FAMILY_REGULAR,
  GRAY_COLOR,
  RED_COLOUR_CODE,
  YOU_ALL_COLOUR_CODE,
} from '../../../Utils/constant';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import Styles from '../ChallangeScreen/component/styles';

const UserWallet = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [AboutUsDescription, setAboutUs] = useState('');
  const [openlink, setopenLink] = useState('');
  const [userWalletDetails, setUserWalletDetails] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const navigation = useNavigation();
  const [PopupMsg, setPopupMsg] = useState('');
  // const [visible, setvisible] = useState(false);

  const AppExitModal = ({visible, onClose}) => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => onClose()}>
        <View style={Styles.modalMainView}>
          <View style={Styles.modalContainView}>
            <Image
              resizeMode="contain"
              style={Styles.imgStyle}
              source={require('../../../Assets/deadasss.png')}
            />

            <Text style={Styles.modalTextHoldStyle}>Info!</Text>
            <Text style={[Styles.modalTextStyle, {marginTop: 15}]}>
              {/* {openlink !== ''
                ? 'Your Stripe Account not Verify Press Ok to Verify an Stripe Account'
                : 'Your Stripe Account not created Press Ok to Create an Stripe Account'} */}
              {openlink !== ''
                ? PopupMsg
                : 'Your Stripe Account not created Continue to Create an Stripe Account'}
            </Text>

            <View style={Styles.buttnView}>
              <TouchableOpacity onPress={() => onClose()}>
                <Text style={[Styles.buttnText, {color: YOU_ALL_COLOUR_CODE}]}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onClose(),
                    openlink !== ''
                      ? Linking.openURL(`${openlink}`)
                      : createStripeAccount();
                }}>
                <Text style={Styles.buttnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
        openModal();
        // setAlertMessage(data.message);
        // AnimatedAlert.showAlert()
      } else if (data.status === 203) {
        setIsLoading(false);
        setAlertMessage(data.message);
        AnimatedAlert.showAlert();
      } else if (data.status === 204) {
        setopenLink(data.data?.accountLink);
        console.log('🚀 ~ WithdrawalFun ~ data.data?.message:', data.message);
        setPopupMsg(data.message);
        setIsLoading(false);
        openModal();
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
      <AppExitModal
        visible={modalVisible}
        onClose={closeModal}
        // onExitApp={onExitApp}
      />
      {/* <Dialog
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
      </Dialog> */}
    </View>
  );
};

export default UserWallet;
