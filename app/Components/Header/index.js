import React, { Fragment } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import {
    FONT_FAMILY_BOLD, GREY_COLOR_CODE, WHITE_COLOR_CODE
} from '../../Utils/constant';
// import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
const Header = (props) => {
    const navigation = useNavigation();
    const {
        HeaderView, HeaderMiddleView, activeDotStyle, DotStyle, container, MainHeadTxt
    } = styles;
    const {
        HeaderText, Img, leftImg, mncontainer, MainHeadStyle, HeaderMiddleTxt, onPress, type
    } = props;
    const OnpressBack = () => {
        navigation.goBack(null);
    }
    return (
        <View style={[container, mncontainer]}>
            <StatusBar
                translucent={true}
                backgroundColor='transparent'
                barStyle='dark-content'
            />
            <TouchableOpacity onPress={() => OnpressBack()} style={HeaderView}>
                <Image
                    style={{ width: 35, height: 25, top: 3 }}
                    source={leftImg}
                />
            </TouchableOpacity>
            <View style={[HeaderMiddleView, HeaderMiddleTxt]}>
                {HeaderText != '' ?
                    <Text numberOfLines={1} style={[MainHeadTxt, MainHeadStyle]}>
                        {HeaderText}
                    </Text>
                    :
                    <View style={styles.MainDotView}>
                        {/* <Octicons style={activeDotStyle} name="primitive-dot" />
                        <Octicons style={DotStyle} name="primitive-dot" />
                        <Octicons style={DotStyle} name="primitive-dot" /> */}
                    </View>
                }
            </View>
            {type ?
                <TouchableOpacity
                    onPress={() => onPress()}
                    style={HeaderView}>
                    <Image
                        source={Img}
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={HeaderView}>
                    <Image
                        source={Img}
                    />
                </TouchableOpacity>
            }
        </View>
    );
}
Header.defaultProps = {
    HeaderText: "CommonName",
    Img: require('../../Assets/header_icon_more.png'),
    leftImg: require('../../Assets/back_btn_lg.png')
};
const styles = StyleSheet.create({
    container:
    {
        flex: 0.7,
        flexDirection: 'row',
        backgroundColor: WHITE_COLOR_CODE
    },
    HeaderView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderMiddleView: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    MainDotView: {
        flexDirection: 'row'
    },
    DotStyle: {
        fontSize: 23,
        width: 19,
        color: "#d8d8d8",
        height: 19
    },
    activeDotStyle: {
        color: "#ff9901",
        fontSize: 23,
        width: 19,
        height: 19
    },
    MainHeadTxt: {
        fontFamily: FONT_FAMILY_BOLD,
        fontSize: 20,
        color: GREY_COLOR_CODE
    }
})
export default Header;