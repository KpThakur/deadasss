import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar, BackHandler, Modal} from 'react-native';
import styles from './styles';
import Button from '../../../../Components/Button';
import {
  CHALLANGE_SCREEN_COLOUR_CODE,
  COMMON_BLUE_COLOUR,
  FONT_FAMILY_CURSUE,
  WHITE_COLOR_CODE,
  YOU_ALL_COLOUR_CODE,
} from '../../../../Utils/constant';
import Alert from '../../../../Components/AnimatedAlert';
import { useFocusEffect } from '@react-navigation/native';

const ChallangeScreen = props => {

    const AppExitModal = ({ visible, onClose, onExitApp }) => {
        useFocusEffect(
          useCallback(() => {
            const onBackPress = () => {
              openModal();
              return true;
            };
    
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
            return () => {
              BackHandler.removeEventListener("hardwareBackPress", onBackPress);
            };
          }, [openModal])
        );
        return (
          <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => onClose()}
          >
            <View style={styles.modalMainView}>
              <View style={styles.modalContainView}>
                
              <Image resizeMode='contain' style={styles.imgStyle} source={require('../../../../Assets/deadasss.png')}/>
             
                <Text style={styles.modalTextHoldStyle}>Hold on!</Text>
                <Text style={styles.modalTextStyle}>
                  Are you sure you want to close this app ?
                </Text>
    
                <View style={styles.buttnView}>
                  <TouchableOpacity onPress={() => onClose()}>
                    <Text style={[styles.buttnText, { color: YOU_ALL_COLOUR_CODE }]}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onExitApp()}>
                    <Text style={styles.buttnText}>YES</Text>
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
    
      const onExitApp = () => {
        BackHandler.exitApp();
      };
  
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor={CHALLANGE_SCREEN_COLOUR_CODE} />
        <View style={styles.FirstContainer}>
          <Text style={styles.LetChllngeTxt}>Lets Challenge</Text>
          <Text style={styles.LetChllngeTxt}>Them !!</Text>
          <Button
            style={{marginTop: 15}}
            buttonText={'Create A Challenge'}
            onPress={() => props.onPressCreate()}
          />
          <Button
            style={{marginTop: 15, backgroundColor: '#fff'}}
            buttonLabelStyle={{color: '#000'}}
            buttonText={'Place A Bid'}
            onPress={() => props.onPressReceiver()}
          />
        </View>
        <View style={styles.SecondCOntain}>
          <TouchableOpacity onPress={() => props.onPressProfile()}>
            <Image source={require('../../../../Assets/deadasssDOT.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <AppExitModal
        visible={modalVisible}
        onClose={closeModal}
        onExitApp={onExitApp}
      />
    </View>
  );
};
export default ChallangeScreen;
