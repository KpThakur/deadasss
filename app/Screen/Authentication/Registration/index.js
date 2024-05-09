import React, { useState, useContext } from 'react';
import RegistrationScreen from './component/Registration';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Image } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { UserContext } from '../../../Utils/UserContext';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import { apiCall, setDefaultHeader } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Loader from '../../../Utils/Loader';
const RegistrationView = () => {
    const navigation = useNavigation();
    const [CameraImage, setCameraImage] = useState('');
    const [filepath, setfilepath] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [ProfileModal, setProfileModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useContext(UserContext);
    const renderFileUri = () => {
        if (CameraImage !== '') {
            return (
                <View>
                    <Image
                        source={{ uri: CameraImage }}
                        style={{ width: 110, height: 110, borderRadius: 55 }}
                    />
                    <Image
                        style={{ position: 'absolute', bottom: -9, left: -10 }}
                        source={require('../../../Assets/border.png')}
                    />
                </View>
            )
        } else {
            return (
                <Image
                    source={require('../../../Assets/profile_select.png')}
                />
            )
        }
    };
    const openAlbum = () => {
        ImagePicker.openPicker({
            height: 50,
            width: 50
        }).then(image => {
            console.log(image)
        setProfileModal(false)
            setCameraImage(image.path)
            setfilepath(image)

        });
    };
    const openMainCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
        }).then(image => {
        setProfileModal(false)
            setCameraImage(image.path)
            setfilepath(image)
        });
    };
    function validationFrom(parameters) {
        if (parameters.FirstName === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your first name');
            return false;
        } if (parameters.LastName === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your last name');
            return false;
        }
        let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (parameters.Email === "" || parameters.Email.trim() === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your email address');
            return false;
        } if (reg.test(parameters.Email) === false) {
            AnimatedAlert.showAlert()
            setAlertMessage("please enter correct email address");
            return false;
        } if (parameters.Password === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter your password');
            return false;
        } if (parameters.Password.length <= 5) {
            AnimatedAlert.showAlert()
            setAlertMessage("password should be min 6 characters");
            return false;
        } if (parameters.ConfirmPassword === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please enter confirm password');
            return false;
        } if (parameters.ConfirmPassword !== parameters.Password) {
            AnimatedAlert.showAlert()
            setAlertMessage("Confirm password and password doesn't match ")
            return false;
        }if (!parameters.CountryCode && parameters.Countryname === '') {
            AnimatedAlert.showAlert()
            setAlertMessage("Please select your country")
            return false;
        } 
        //  if (parameters.CountryCode == '') {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please select your country');
        //     return false;
        // } if (parameters.ConfirmPassword.length <= 5) {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage("confirm password should be min 6 characters");
        //     return false;
        // } if (parameters.Gender == '') {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please select your gender');
        //     return false;
        // } if (parameters.BirthDay == '') {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please select your date of birth');
        //     return false;
        // }
        return true;
    };
    const _handleRegistration = async (parameters) => {
        const deviceToken = await AsyncStorage.getItem("fcmToken")
        const valid = await validationFrom(parameters)
        if (valid) {
            try {
                setIsLoading(true)
                let deviceId = DeviceInfo.getDeviceId();
                let deviceType = DeviceInfo.getDeviceType();
                let formdata = new FormData();
                formdata.append("first_name", parameters.FirstName)
                formdata.append("last_name", parameters.LastName)
                formdata.append("username", parameters.Username)
                formdata.append("email", parameters.Email)
                formdata.append("mobileno", parameters.ContactNumber)
                formdata.append("password", parameters.Password)
                formdata.append("confirm_password", parameters.ConfirmPassword)
                formdata.append("dob", parameters.BirthDay)
                formdata.append("gender", parameters.Gender)
                formdata.append("device_id", deviceId)
                formdata.append("device_token", deviceToken)
                formdata.append("device_type", deviceType)
                formdata.append("country_code", parameters.CountryCode)
                formdata.append("country_name", parameters.Countryname)
                filepath.path && formdata.append('profile_pic', {
                    uri: filepath.path,
                    type: filepath.mime,
                    name: filepath.path.substring(filepath.path.lastIndexOf('/') + 1)
                });
                console.log("form data ...???...", formdata)
                const { data } = await apiCall('POST', ENDPOINTS.USER_SIGN_UP, formdata);
                if (data.status === 200) {
                    setUserData(data.data)
                    setDefaultHeader('authorization', data.token);
                    setIsLoading(false)
                    navigation.navigate("UserVerification", { Email: parameters.Email, token: data.token })
                    // await auth().signInWithPhoneNumber(data.data.country_code + data.data.mobileno)
                    //     .then(confirmResult => {
                    //         setUserData(data.data)
                    //         setDefaultHeader('authorization', data.token);
                    //         setIsLoading(false)
                    //         navigation.navigate("UserVerification", { confirmResult: confirmResult, data: data, token: data.token })
                    //     })
                } else if (data.status === 201) {
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setAlertMessage(data.message);
                    AnimatedAlert.showAlert()
                    setIsLoading(false)
                }
            } catch (error) {
                setAlertMessage(error.toString());
                AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        }
    };
    function onPressLoginHere() {
        navigation.navigate("Login");
    };
    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader state={isLoading} />}
            <RegistrationScreen
                renderFileUri={renderFileUri}
                openAlbum={openAlbum}
                openMainCamera={openMainCamera}
                ProfileModal={ProfileModal}
                setProfileModal={setProfileModal}
                _handleRegistration={_handleRegistration}
                onPressLoginHere={onPressLoginHere}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </View>
    )
}
export default RegistrationView;