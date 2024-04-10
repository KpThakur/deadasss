import React, { useState, useContext, Fragment } from 'react';
import {
    View, Text, Image, TouchableOpacity, Modal, ScrollView,
    ActivityIndicator, StatusBar, KeyboardAvoidingView, FlatList, TextInput
} from 'react-native';
import {
    BLACK_COLOUR_CODE, CHANGE_PASSWORD_COLOUR_CODE,
    FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE, MAP_KEY, BLACK_COLOR_CODE, FONT_FAMILY_REGULAR, FONT_FAMILY_CURSUE
} from '../../../../Utils/constant';
import styles from './styles';
import { UserContext } from '../../../../Utils/UserContext';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
const CreateAccount = (props) => {
    const [userData, setUserData] = useContext(UserContext);
    const [filepath, setfilepath] = useState('');

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            Type: 'Individual',
            title: 'CEO'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            Type: 'Company',
            title: 'Support'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            Type: 'Non Profit',
            title: 'Executive Director'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            Type: 'Government Entity',
            title: 'Manager'
        },
    ];

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 2, paddingTop: 20 }}>
                        {/* <View style={{ flexDirection: 'row', paddingTop: 30, alignItems: 'center', justifyContent: 'center', paddingBottom: 9 }}>
                            <Text style={styles.LoginTextSTyle}>Add Account</Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View />
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingTop: 8 }}>
                                </View>
                                <Text style={styles.LoginTextSTyle}>Add Account</Text>
                            </View>
                            <TouchableOpacity onPress={() => props.onPressCross()} style={{ paddingRight: 25, paddingTop: 10 }}>
                                <Text style={styles.ChallengeTxt}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 9, marginRight: 9, marginBottom: 9 }}>
                            <Text style={{ color: WHITE_COLOR_CODE, fontFamily: FONT_FAMILY_REGULAR, fontSize: 18 }}>Your Gains will be automatically transfer to your banking account
                            between 24-48 hours. Please fill out this form:
                              </Text>
                        </View>
                        <View style={{ marginTop: 18 }}>
                            <Input
                                value={props.loginData.AccHolderName}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    AccHolderName: val
                                })}
                                secureTextEntry={false}
                                placeholder="Accountholder Name"
                                textInputStyle={{ paddingLeft: 20, height: 60, width: '100%', }}
                            />
                        </View>
                        {/* <Input
                            value={props.loginData.AccNumber}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                AccNumber: val
                            })}
                            secureTextEntry={false}
                            placeholder="Account Number"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%', }}
                            maxLength={25}
                        /> */}
                        <View style={styles.RoutingNo}>
                            <TextInput
                                value={props.loginData.AccNumber}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    AccNumber: val
                                })}
                                secureTextEntry={false}
                                placeholder="Account Number"
                                keyboardType="phone-pad"
                                placeholderTextColor='#000'
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                                maxLength={25}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} >The account number for the bank account .</Text>
                        </View>
                        <View style={[styles.RoutingNo, { marginTop: 10 }]}>
                            <TextInput
                                value={props.loginData.Routingno}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    Routingno: val
                                })}
                                secureTextEntry={false}
                                autoFocus={true}
                                placeholder="Routing Number"
                                placeholderTextColor='#000'
                                keyboardType="phone-pad"
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} >The routing transit number for the bank account.</Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Input
                                value={props.loginData.EmailId}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    EmailId: val
                                })}
                                secureTextEntry={false}
                                placeholder="Email ID"
                                textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                            />
                        </View>
                        <Input
                            value={props.loginData.FirstName}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                FirstName: val
                            })}
                            secureTextEntry={false}
                            placeholder="First Name"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.LastName}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                LastName: val
                            })}
                            secureTextEntry={false}
                            placeholder="Last Name"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.Address1}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Address1: val
                            })}
                            secureTextEntry={false}
                            placeholder="Address 1"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        {/* <Input
                            value={props.loginData.Address2}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Address2: val
                            })}
                            secureTextEntry={false}
                            placeholder="Address 2"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        /> */}
                        <View style={[styles.RoutingNo, { marginBottom: 10 }]}>
                            <TextInput
                                value={props.loginData.Address2}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    Address2: val
                                })}
                                secureTextEntry={false}
                                placeholder="Address 2"
                                placeholderTextColor='#000'
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} > Address 2 is a requirement.</Text>
                        </View>
                        <Input
                            value={props.loginData.cityAddress}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                cityAddress: val
                            })}
                            secureTextEntry={false}
                            placeholder="Your City "
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.stateAddr}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                stateAddr: val
                            })}
                            secureTextEntry={false}
                            placeholder="Your State"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.AddressPostalCd}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                AddressPostalCd: val
                            })}
                            secureTextEntry={false}
                            placeholder="Your Postal Code"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                            maxLength={6}

                        />
                        {/* <Input
                            value={props.loginData.Month}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Month: val < 13 ? val : ''
                            })}
                            secureTextEntry={false}
                            placeholder="Month"
                            keyboardType="numeric"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                            maxLength={2}
                        />
                        <Input
                            value={props.loginData.Date}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Date: val < 32 ? val : ''
                            })}
                            secureTextEntry={false}
                            placeholder="Date"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                            maxLength={2}
                        />

                        <Input
                            value={props.loginData.Year}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Year: val
                            })}
                            secureTextEntry={false}
                            placeholder="Year"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                            maxLength={4}
                        /> */}
                        <View style={[styles.RoutingNo, { marginBottom: 10 }]}>
                            <TextInput
                                value={props.loginData.Date}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    Date: val < 32 ? val : ''
                                })}
                                secureTextEntry={false}
                                placeholder="Date"
                                keyboardType="phone-pad"
                                placeholderTextColor='#000'
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} >Date of birth.</Text>
                        </View>

                        <View style={[styles.RoutingNo, { marginBottom: 10 }]}>
                            <TextInput
                                value={props.loginData.Month}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    Month: val < 13 ? val : ''
                                })}
                                secureTextEntry={false}
                                placeholder="Month"
                                keyboardType="numeric"
                                placeholderTextColor='#000'
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} >Month of birth.</Text>
                        </View>

                        <View style={[styles.RoutingNo, { marginBottom: 10 }]}>
                            <TextInput
                                value={props.loginData.Year}
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    Year: val
                                })}
                                secureTextEntry={false}
                                placeholder="Year"
                                keyboardType="phone-pad"
                                placeholderTextColor='#000'
                                style={{
                                    fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 16, marginLeft: 15, marginTop: 12,
                                }}
                            />
                            <Text style={{
                                fontSize: 12, fontFamily: FONT_FAMILY_TYPE_WRITER, height: 18,
                                color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 15, marginBottom: 5
                            }} >Year of birth.</Text>
                        </View>
                        <Input
                            value={props.loginData.PhnNumber}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                PhnNumber: val
                            })}
                            secureTextEntry={false}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.IDnumber}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                IDnumber: val
                            })}
                            secureTextEntry={false}
                            placeholder="ID Number"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.SSN_Last4}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                SSN_Last4: val
                            })}
                            secureTextEntry={false}
                            placeholder="SSN Last 4"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />

                        <TouchableOpacity onPress={() => props.setProfileModal(!props.ProfileModal)}
                            style={styles.BusinessContainer}>
                            <View>
                                <View style={{ flexDirection: 'column', }}>
                                    <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOUR_CODE, paddingLeft: 20, fontSize: 16 }}>
                                        Attach Document</Text>
                                    <Text style={{
                                        fontSize: 9, fontFamily: FONT_FAMILY_TYPE_WRITER, color: CHANGE_PASSWORD_COLOUR_CODE, paddingLeft: 9
                                    }}>Choose one of them..( AadharCard, PanCard, PassPort, DrivingLicence )</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {props.CameraImage ?
                            <View style={{ padding: 12 }}>
                                <Image
                                    onLoadStart={() => props.onLoadProfileStart()}
                                    onLoadEnd={() => props.onLoadProfileEnd()}
                                    source={{ uri: props.CameraImage }}
                                    style={{ width: 110, height: 110, borderRadius: 5 }}
                                />
                            </View>
                            : null}

                        <View style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Button
                                onPress={() => props._CreateAccount()}
                                buttonText={"Create"}
                                style={styles.RegistratnBtn}
                                buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                            />
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    hardwareAccelerated={true}
                    transparent={true}
                    visible={props.ProfileModal}
                    onRequestClose={() => {
                        props.setProfileModal(false)
                    }}  >
                    <View style={styles.alertBackground}>
                        <View style={styles.alertBox}>
                            <TouchableOpacity onPress={() => props.setProfileModal(false)} style={{
                                position: 'absolute', right: 20,
                                top: 10, width: 40, alignItems: 'flex-end'
                            }}>
                                <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 20 }}>X</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileModal}
                                onPress={() => props.openMainCamera()}
                                underlayColor={'#F5F5F5'}>
                                <Image
                                    style={{ height: 40, width: 40 }}
                                    source={require('../../../../Assets/cameraNew.png')}
                                />
                                <Text style={styles.modalItem}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.profileModal}
                                onPress={() => props.openAlbum()}
                                underlayColor={'#F5F5F5'}>
                                <Image
                                    style={{ height: 40, width: 40 }}
                                    source={require('../../../../Assets/gallery.png')}
                                />
                                <Text style={styles.modalItem}>Choose Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        </KeyboardAvoidingView>

    )
}
export default CreateAccount;