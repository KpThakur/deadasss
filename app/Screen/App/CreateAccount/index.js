import React, { useState, useContext } from 'react';
import CreateAccount from './component/CreateAccount';
import { useNavigation } from '@react-navigation/native';
import AnimatedAlert from '../../../Components/AnimatedAlert';
import { UserContext } from '../../../Utils/UserContext';
import Loader from '../../../Utils/Loader';
import { apiCall } from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import { RED_COLOUR_CODE } from '../../../Utils/constant';
import ImagePicker from 'react-native-image-crop-picker';

const CreateAccountView = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const [AccountType, setAccountType] = useState(false)
    const [RelationsTitle, setRelationsTitle] = useState(false)
    const [userData, setUserData] = useContext(UserContext);
    const [alertMessage, setAlertMessage] = useState('');
    const [selectType, setSelectType] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [profileLoader, setProfileLoader] = useState('');
    const [CameraImage, setCameraImage] = useState('');
    const [ProfileModal, setProfileModal] = useState(false);
    const [filepath, setfilepath] = useState('');

    const [loginData, setLoginData] = useState({
        Routingno: '',
        AccHolderName: '',
        AccHolderType: 'individual',
        AccNumber: '',
        EmailId: '',
        BusinessType: 'Company',
        BusinessProfile: '7623',
        BusinessUrl: 'itinformatix.com',
        CompanyIEC: '000000000',
        Company: 'itinformatix',
        CompanyPhnNmbr: '',
        CompanyTaxiId: '00000000',
        CompanyAddres1: '',
        CompanyAddres2: '',
        CompanyCityAddr: '',
        CompanyPstlCode: '',
        CompanyStateAddr: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Address1: '',
        Address2: '',
        cityAddress: '',
        AddressPostalCd: '',
        stateAddr: '',
        AddressState: '',
        Date: '',
        Month: '',
        Year: '',
        Birthday: '',
        IDnumber: '',
        PhnNumber: '',
        RelationTitle: 'Support',
        SSN_Last4: ''
    })


    // const [loginData, setLoginData] = useState({
    //     Routingno: '110000000',//'110000000',
    //     AccHolderName: 'sachin patidar',
    //     AccHolderType: 'individual',
    //     AccNumber: '000111111116',
    //     EmailId: 'sachin@gmail.com',
    //     BusinessType: '',
    //     BusinessProfile: '7623',
    //     BusinessUrl: 'itinformatix.com',
    //     CompanyIEC: '000000000',
    //     Company: 'patidar',
    //     CompanyPhnNmbr: '9630959372',
    //     CompanyTaxiId: '00000000',
    //     CompanyAddres1: '47 W 13th St',
    //     CompanyAddres2: '47 W',
    //     CompanyCityAddr: 'New York',
    //     CompanyPstlCode: '10011',
    //     CompanyStateAddr: 'New York',
    //     FirstName: 'Jane',
    //     LastName: 'Diaz',
    //     Email: 'sachin@gmail.com',
    //     Address1: '47 W 13th St',
    //     Address2: '47 W',
    //     cityAddress: 'New York',
    //     AddressPostalCd: '10011',
    //     stateAddr: 'New York',
    //     AddressState: 'New York',
    //     Date: '12',
    //     Month: '12',
    //     Year: '1999',
    //     Birthday: '',
    //     IDnumber: '123456789',
    //     PhnNumber: '9630959372',
    //     RelationTitle: '',
    //     SSN_Last4: '8144'
    // })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        let DateConfirm = moment(currentDate).format('DD/MM/YYYY')
        setDate(currentDate);
        setBirthDay(DateConfirm)
    };


    function validationFrom() {

        if (loginData.AccHolderName == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter AccountHolder Name');
            return false;
        }
        if (loginData.AccNumber == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Account Number');
            return false;
        }
        if (loginData.Routingno == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Rounting Number');
            return false;
        }
        if (loginData.AccHolderType == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Select AccountHolder Type');
            return false;
        }
        let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
        if (loginData.EmailId == "" || loginData.EmailId.trim() === '') {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Email');
            return false;
        }
        if (reg.test(loginData.EmailId) === false) {
            AnimatedAlert.showAlert()
            setAlertMessage("please enter correct email address");
            return false;
        } 
        // if (loginData.BusinessType == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Select Business Type');
        //     return false;
        // }
        // if (loginData.BusinessProfile == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Business Profile MCC');
        //     return false;
        // }
        // if (loginData.BusinessUrl == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Business Profile URL');
        //     return false;
        // }
        // if (loginData.CompanyIEC == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Company IEC');
        //     return false;
        // }
        // if (loginData.Company == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Company Name');
        //     return false;
        // }
        // if (loginData.CompanyPhnNmbr == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Company PhoneNumber');
        //     return false;
        // }
        // if (loginData.CompanyTaxiId == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Company Taxi ID');
        //     return false;
        // }
        // if (loginData.CompanyAddres1 == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Enter Company Address');
        //     return false;
        // }
        // if (loginData.CompanyCityAddr == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Select Company City');
        //     return false;
        // }
        // if (loginData.CompanyPstlCode == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Select Company Postal Code');
        //     return false;
        // }
        // if (loginData.CompanyStateAddr == "") {
        //     AnimatedAlert.showAlert()
        //     setAlertMessage('Please Select Company State');
        //     return false;
        // }
        if (loginData.FirstName == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your Name');
            return false;
        }
        if (loginData.LastName == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your Last Name');
            return false;
        }
        if (loginData.Address1 == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your Address');
            return false;
        }
        if (loginData.cityAddress == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your City ');
            return false;
        }
        if (loginData.AddressPostalCd == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your Postal Code');
            return false;
        }
        if (loginData.stateAddr == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your State ');
            return false;
        }
        if (loginData.Date == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Select Birthday Date');
            return false;
        }
        if (loginData.Month == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Select Birthday Month');
            return false;
        }
        if (loginData.Year == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Select Birthday Year');
            return false;
        }
        if (loginData.IDnumber == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Id Number');
            return false;
        }
        if (loginData.PhnNumber == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter Your PhoneNumber');
            return false;
        }
        if (loginData.RelationTitle == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Select Your Title');
            return false;
        }
        if (loginData.SSN_Last4 == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Enter SSN ');
            return false;
        }
        if (filepath == "") {
            AnimatedAlert.showAlert()
            setAlertMessage('Please Upload Document');
            return false;
        }
        return true;
    };


    async function _CreateAccount() {
        const valid = await validationFrom()
        if (valid) {
            try {
                setIsLoading(true)
                let formdata = new FormData();
                formdata.append("account_holder_name_token", loginData.AccHolderName);
                formdata.append("account_holder_type_token", loginData.AccHolderType);
                formdata.append("routing_number_token", loginData.Routingno);
                formdata.append("account_number_token", loginData.AccNumber);
                formdata.append("email_account", loginData.EmailId);
                formdata.append("business_type_account", loginData.BusinessType);
                formdata.append("business_profile_mcc_account", loginData.BusinessProfile);
                formdata.append("business_profile_url_account", loginData.BusinessUrl);
                formdata.append("company_iec_number_account", loginData.CompanyIEC);
                formdata.append("company_name_account", loginData.Company);
                formdata.append("company_phone_account", loginData.PhnNumber);
                formdata.append("company_tax_id_account", loginData.CompanyTaxiId);
                formdata.append("company_address_line1", loginData.Address1);
                formdata.append("company_address_city_account", loginData.cityAddress);
                formdata.append("company_address_city_postal_code_account", loginData.AddressPostalCd);
                formdata.append("company_address_state_account", loginData.stateAddr);
                formdata.append("first_name_person", loginData.FirstName);
                formdata.append("last_name_person", loginData.LastName);
                formdata.append("address_line1_person", loginData.Address1);
                formdata.append("address_city_person", loginData.cityAddress);
                formdata.append("address_postal_code_person", loginData.AddressPostalCd);
                formdata.append("address_state_person", loginData.stateAddr);
                formdata.append("dob_day_person", loginData.Date);
                formdata.append("dob_month_person", loginData.Month);
                formdata.append("dob_year_person", loginData.Year);
                formdata.append("id_number_person", loginData.IDnumber);
                formdata.append("phone_person", loginData.PhnNumber);
                formdata.append("relationship_title_person", loginData.RelationTitle);
                formdata.append("ssn_last_4_person", loginData.SSN_Last4);
                formdata.append('stripe_pic', {
                    uri: filepath.path,
                    type: filepath.mime,
                    name: filepath.path.substring(filepath.path.lastIndexOf('/') + 1)
                });
                console.log("🚀 ~ file: index.js ~ line 304 ~ _CreateAccount ~ formdata", formdata)
                const { data } = await apiCall('POST', ENDPOINTS.createStripeAccount, formdata);
                console.log("🚀 ~ file: index.js ~ line 309 ~ _CreateAccount ~ data", data)
                if (data.status === 200) {
                    navigation.navigate("WebView", { url: data.mesage })
                } else if (data.status === 201) {
                    AnimatedAlert.showAlert()
                    setAlertMessage(data.message);
                    setIsLoading(false)
                } else if (data.status === 401) {
                    setIsLoading(false)
                    AnimatedAlert.showAlert()
                    setAlertMessage(data.message);
                }
            } catch (error) {
                setAlertMessage(error.toString());
                AnimatedAlert.showAlert()
                setIsLoading(false)
            }
        }
    };

    function onPressAccHoldrTYPE() {
        setAccountType(!AccountType)
    }
    function onPressSelectType(item) {
        setAccountType(!AccountType)
        setLoginData({
            ...loginData,
            BusinessType: item.Type,
        })
        setSelectType(selectType)
    }
    function onPressRelationTitle() {
        setRelationsTitle(!RelationsTitle)
    }
    function onPressSelectTitle(item) {
        setRelationsTitle(!RelationsTitle)
        setLoginData({
            ...loginData,
            RelationTitle: item.title,
        })
    }
    function onPressCalender() {
        showMode('date');
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const onLoadProfileStart = () => {
        setProfileLoader(true)
    }
    const onLoadProfileEnd = () => {
        setProfileLoader(false)
    }

    const openMainCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            // mediaType: 'photo',
        }).then(image => {
            setProfileModal(false)
            setCameraImage(image.path)
            setfilepath(image)
            console.log(image);
        });
    };
    const openAlbum = () => {
        setProfileModal(false)
        ImagePicker.openPicker({
            height: 50,
            width: 50,
            mediaType: 'photo',
        }).then(image => {
            // console.log('image: ', image);
            setCameraImage(image.path)
            setfilepath(image)

        });
    };

    function onPressCross() {
        navigation.goBack(null)
    };
    return (
        <>
            {isLoading && <Loader state={isLoading} />}
            <CreateAccount
                CameraImage={CameraImage}
                onPressAccHoldrTYPE={onPressAccHoldrTYPE}
                onPressCalender={onPressCalender}
                loginData={loginData}
                setLoginData={setLoginData}
                AccountType={AccountType}
                onPressSelectType={onPressSelectType}
                selectType={selectType}
                onPressRelationTitle={onPressRelationTitle}
                onPressSelectTitle={onPressSelectTitle}
                RelationsTitle={RelationsTitle}
                _CreateAccount={_CreateAccount}
                onLoadProfileStart={onLoadProfileStart}
                onLoadProfileEnd={onLoadProfileEnd}
                openMainCamera={openMainCamera}
                openAlbum={openAlbum}
                ProfileModal={ProfileModal}
                setProfileModal={setProfileModal}
                onPressCross={onPressCross}
                userData={userData}
            />
            <AnimatedAlert
                alertMessage={alertMessage}
                alertBGColor={RED_COLOUR_CODE}
            />
        </>
    )
}
export default CreateAccountView;