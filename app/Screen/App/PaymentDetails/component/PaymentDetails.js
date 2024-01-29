import React from 'react';
import {
    View, Text, TextInput, TouchableOpacity,StatusBar
} from 'react-native';
import styles from './styles';
import Button from '../../../../Components/Button';
import { FONT_FAMILY_TYPE_WRITER, WHITE_COLOR_CODE,PAYMENT_DETAIL_SCREEN_COLOUR_CODE } from '../../../../Utils/constant';
const PaymentDetailsScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
             <StatusBar backgroundColor={PAYMENT_DETAIL_SCREEN_COLOUR_CODE} />

                <View style={styles.FirstContainer}>
                    <View style={styles.CrossViewTxt}>
                        {/* <TouchableOpacity onPress={() => props.onPressCross()} >
                            <Text style={styles.CrossTextSTyle}>X</Text>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.PaymentDetailTxt}>Payment details</Text>
                </View>
                <View style={styles.UpdateAccountView}>
                    <Text style={styles.UpdateAccountTxt}>Update your account</Text>
                    <Text style={styles.UpdateAccountTxt}>details for receiving</Text>
                    <Text style={styles.UpdateAccountTxt}>payment</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={styles.AccountNumberView}>
                        <Text style={styles.AccountNumberTxt}>Account Number:</Text>
                        <TextInput
                            style={{
                                fontFamily: FONT_FAMILY_TYPE_WRITER,
                                position: 'absolute',
                                right: 0,
                                paddingTop: 20,
                                width: '53%'
                            }}
                            selectionColor={"transparent"}
                            keyboardType={"number-pad"}
                            onChangeText={(AccountNumber)=> props.setAccountNumber(AccountNumber)}
                            value={props.AccountNumber}
                        />
                    </View>
                    <View style={styles.StripeIDView}>
                        <Text style={styles.AccountNumberTxt}>Stripe ID:</Text>
                        <TextInput
                            style={{
                                fontFamily: FONT_FAMILY_TYPE_WRITER,
                                position: 'absolute',
                                right: 0,
                                paddingTop: 20,
                                width: '73%'
                            }}
                            selectionColor={"transparent"}
                            keyboardType={"number-pad"}
                            onChangeText={(StripeID)=> props.setStripeID(StripeID)}
                            value={props.StripeID}
                        />
                    </View>
                    <Button
                        buttonText={"UPDATE"}
                        style={styles.RegistratnBtn}
                        buttonLabelStyle={{ color: WHITE_COLOR_CODE }}
                        onPress={() => props.onPressUpdate()}
                    />
                </View>
            </View>
        </View>
    )
}
export default PaymentDetailsScreen;