import React, { useCallback, useState } from 'react';
import ShareChallengeScreen from './component/ShareChallenge';
import {
    View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const ShareChallenge = () => {
    const [challengeData, setChallengeData] = useState('')
    useFocusEffect(useCallback(() => {
        _handleChallengeData()
        return () => { _handleChallengeData() }
    }, [])
    );
    
    async function _handleChallengeData() {
        const challengeData = await AsyncStorage.getItem('challengeData');
        const challenge_data = JSON.parse(challengeData)
        setChallengeData(challenge_data)
    }
    return (
        <View style={{ flex: 1 }}>
            <ShareChallengeScreen
             challengeData={challengeData}
            />
        </View>

    )
}
export default ShareChallenge;