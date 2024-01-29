import React, { useState, useContext, useEffect } from 'react';
import ChallengeLateScreen from './component/ChallengeLateScreen';
import {
    View
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const ChallengeLateScreenView = () => {
    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                _handleNavigation()
            }, 10000);
            return () => { _handleNavigation() }
        }, [])
    );
    const navigation = useNavigation()
    function _handleNavigation() {
        navigation.navigate("YouAllScreen")
    }
    return (
        <View style={{ flex: 1 }}>
            <ChallengeLateScreen
            />
        </View>

    )
}
export default ChallengeLateScreenView;