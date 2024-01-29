import React, { useState, useContext, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, ActivityIndicator, StatusBar, KeyboardAvoidingView } from 'react-native';
import {
    BLACK_COLOUR_CODE, CHANGE_PASSWORD_COLOUR_CODE,
    FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE, MAP_KEY, BLACK_COLOR_CODE,
} from '../../../../Utils/constant';
import styles from './styles';
import { UserContext } from '../../../../Utils/UserContext';
import Input from '../../../../Components/Input';
import Button from '../../../../Components/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const CreateAccount = (props) => {
    const [userData, setUserData] = useContext(UserContext);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.body}>
                <StatusBar backgroundColor={CHANGE_PASSWORD_COLOUR_CODE} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 2, paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                           
                            <Text style={styles.LoginTextSTyle}>Create New Account</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <TouchableOpacity>
                                {/* {renderFileUri()} */}
                                <Image style={{ position: 'absolute', right: 0, bottom: 0, height: 45, width: 45 }} 
                                source={require('../../../../Assets/edit.png')} />
                            </TouchableOpacity>
                        </View>
                        <Input
                            value={props.loginData.Routingno}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Routingno: val
                            })}
                            secureTextEntry={false}
                            placeholder="Routing Number"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.AccHolderName}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                AccHolderName: val
                            })}
                            secureTextEntry={false}
                            placeholder="Accountholder Name"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.AccHolderType}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                AccHolderType: val
                            })}
                            secureTextEntry={false}
                            placeholder="Accountholder Type"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.AccNumber}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                AccNumber: val
                            })}
                            secureTextEntry={false}
                            placeholder="Account Number"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.EmailId}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                EmailId: val
                            })}
                            secureTextEntry={false}
                            placeholder="EmailID"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <View>
                            <TouchableOpacity onPress={() => props.onPressAccHoldrTYPE()}
                                style={styles.genderContainer}>
                                <Text style={styles.genderText}>Business Type</Text>
                            </TouchableOpacity>
                            {
                                props.AccountType ?
                                    <View style={styles.ModalContainer}>
                                        <TouchableOpacity onPress={() => props.onPressSelectType()}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.BusinessType = 'individual'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType(2)}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.BusinessType = 'company'} </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType(3)}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.BusinessType = 'non profit'} </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType(4)}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.BusinessType = 'government entity'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <Input
                            value={props.loginData.BusinessProfile}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                BusinessProfile: val
                            })}
                            secureTextEntry={false}
                            placeholder="Business Profile MCC"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.BusinessUrl}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                BusinessUrl: val
                            })}
                            secureTextEntry={false}
                            placeholder="Business Profile URL"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.CompanyIEC}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                CompanyIEC: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company IEC "
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.Company}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Company: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.CompanyPhnNmbr}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                CompanyPhnNmbr: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company PhoneNumber"
                            keyboardType="phone-pad"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.CompanyTaxiId}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                CompanyTaxiId: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company Taxi Id"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.CompanyAddres1}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                CompanyAddres1: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company Address Line1"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <Input
                            value={props.loginData.CompanyAddres2}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                CompanyAddres2: val
                            })}
                            secureTextEntry={false}
                            placeholder="Company Address Line2"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Company City'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}

                        />
                        <GooglePlacesAutocomplete
                            placeholder='Company Postal Code'
                            onPress={(data, details = null) => {
                                console.log(data, details)
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Company State'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
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
                            value={props.loginData.Email}
                            onChangeText={(val) => props.setLoginData({
                                ...props.loginData,
                                Email: val
                            })}
                            secureTextEntry={false}
                            placeholder="EmailId"
                            textInputStyle={{ paddingLeft: 20, height: 60, width: '100%' }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Address'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Address 2'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='City'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Address Postal Code'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Address State'
                            onPress={(data, details = null) => {

                                console.log(data, details);
                            }}
                            query={{ key: MAP_KEY, language: 'en' }}
                            styles={{
                                textInputContainer: {
                                    marginTop: 0, borderRadius: 4, backgroundColor: WHITE_COLOR_CODE, marginBottom: 12, margin: 15,
                                    flexDirection: 'row', height: 60, width: '92%', justifyContent: 'center'
                                },
                                textInput: { fontSize: 16, fontFamily: FONT_FAMILY_TYPE_WRITER, color: BLACK_COLOR_CODE, paddingLeft: 20, marginTop: 9 },
                                listView: { width: '92%', marginLeft: 15 },
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => props.onPressCalender()}
                            style={styles.genderContainer}>
                            <Text style={styles.genderText}>
                                {props.loginData.Birthday ? BirthDay : 'Date Of Birth'}
                            </Text>
                        </TouchableOpacity>
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
                        <View>
                            <TouchableOpacity onPress={() => props.onPressAccHoldrTYPE()}
                                style={styles.genderContainer}>
                                <Text style={styles.genderText}>Relationship Title</Text>
                            </TouchableOpacity>
                            {
                                props.AccountType ?
                                    <View style={styles.ModalContainer}>
                                        <TouchableOpacity onPress={() => props.onPressSelectType()}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.AccHolderName = 'CEO'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType()}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.AccHolderName = 'Support Engineer'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType()}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.AccHolderName = 'Executive Director'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => props.onPressSelectType()}>
                                            <Text style={{ fontFamily: FONT_FAMILY_TYPE_WRITER, fontSize: 18, }}>{props.loginData.AccHolderName = 'Manager'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                        </View>
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
                        <View style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Button
                                buttonText={"Register"}
                                style={styles.RegistratnBtn}
                                buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

        </KeyboardAvoidingView>

    )
}
export default CreateAccount;