import React, {Component} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import KeepAwake from 'react-native-keep-awake';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineConfig,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';

import {apiCall} from '../../../Utils/httpClient';
import ENDPOINTS from '../../../Utils/apiEndPoints';
import AsyncStorage from '@react-native-community/async-storage';

// interface State {
//   channelId: string;
//   isJoined: boolean;
//   remoteUid: number[];
//   switchCamera: boolean;
//   switchRender: boolean;
// }

export default class JoinChannelAudio extends Component {
  // <{}, State, any>
  // _engine: RtcEngine | undefined;

  constructor(props) {
    super(props);

    this.state = {
      channelId: this.props.route.params.data.room_id,
      roomID: this.props.route.params
        ? this.props.route.params.data.room_id
        : 'guest',
      payToId: this.props.route.params
        ? this.props.route.params.data.pay_to_id
        : 'guest',
      challengeId: this.props.route.params
        ? this.props.route.params.data.challenge_id
        : 'guest',
      remaningTime: props.route.params
        ? props.route.params.data.call_remaining_duration
        : '900',
      isJoined: false,
      audMute: false,
      remoteUid: [],
      switchCamera: true,
      switchRender: true,
      ImageShow: false,
      // CameraShow: true,
      CameraShow: 'big',
    };
  }

 

  UNSAFE_componentWillMount() {
    this._initEngine();
    this._joinChannel();
    // setTimeout(() => { this._joinChannel() }, 3000);
    this.storeDataLocal();
    const Callinterval = setInterval(() => {
      this.CallDisconnectAfterSecond(Callinterval);
    }, 30000);
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  storeDataLocal = async () => {
    await AsyncStorage.setItem('roomId', this.state.roomID);
    await AsyncStorage.setItem('payToId', JSON.stringify(this.state.payToId));
    await AsyncStorage.setItem(
      'challengeId',
      JSON.stringify(this.state.challengeId),
    );
  };

  CallDisconnectAfterSecond = async Callinterval => {
    try {
      const params = {
        room_id: this.state.roomID,
        pay_to_id: this.state.payToId,
      };
      const {data} = await apiCall('POST', ENDPOINTS.GET_CALL_STATUS, params);
      if (data.status === 200) {
        if (data.data.call_status === 1) {
          clearInterval(Callinterval);
          this.callNotRecievFun();
        } else {
          clearInterval(Callinterval);
        }
      } else if (data.status === 201) {
      } else if (data.status === 401) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  callNotRecievFun = async () => {
    try {
      const params = {
        room_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.room_id
            : this.props.route.params.remoteMessage.room_id,
        challenge_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.challenge_id
            : this.props.route.params.remoteMessage.challenge_id,
        call_status: 5,
      };
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.VIDEO_CALLING_STATUS,
        params,
      );
      if (data.status === 200) {
        this.props.navigation.navigate('YouAllScreen');
      } else if (data.status === 201) {
      } else if (data.status === 401) {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  _handleCallStatus = async interval => {
    try {
      const params = {
        room_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.room_id
            : this.props.route.params.remoteMessage.room_id,
        pay_to_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.pay_to_id
            : this.props.route.params.remoteMessage.pay_to_id,
      };
      const {data} = await apiCall('POST', ENDPOINTS.GET_CALL_STATUS, params);
      if (data.status === 200) {
        if (data.data.call_status === 3) {
          clearInterval(interval);
          this._leaveChannel();
        }
        if (data.data.call_status === 6) {
          clearInterval(interval);
          this._leaveChannel();
        } else if (data.data.call_status === 4) {
          clearInterval(interval);
          this.props.navigation.navigate('RatingUserScreen');
        } else if (data.data.call_status === 5) {
          clearInterval(interval);
          this.props.navigation.navigate('YouAllScreen');
        }
      } else if (data.status === 201) {
        clearInterval(interval);
        this.props.navigation.navigate('YouAllScreen');
      } else if (data.status === 401) {
        clearInterval(interval);
        this.props.navigation.navigate('YouAllScreen');
      }
    } catch (e) {
      console.log(e);
    }
  };

  cancelCall = async () => {
    try {
      const params = {
        room_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.room_id
            : this.props.route.params.remoteMessage.room_id,
        challenge_id:
          this.props.route.params.Status === 1
            ? this.props.route.params.remoteMessage.data.challenge_id
            : this.props.route.params.remoteMessage.challenge_id,
        call_status: 3,
      };
      const {data} = await apiCall(
        'POST',
        ENDPOINTS.VIDEO_CALLING_STATUS,
        params,
      );
      if (data.status === 200) {
        await this._engine?.leaveChannel();
        this.props.navigation.navigate('RatingUserScreen');
      } else if (data.status === 201) {
        alert(data.message);
      } else if (data.status === 401) {
        alert(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      //   new RtcEngineConfig('42bf93c76a794689a7fd31953c3f07f8')
      // );
      // new RtcEngineConfig('c810068159a94b1c9e8f66547db275e3')
      // );
      new RtcEngineContext('c810068159a94b1c9e8f66547db275e3'),
    );
    this._addListeners();

    await this._engine.enableVideo();
    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      this.setState({isJoined: true});
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      this.setState({remoteUid: [...this.state.remoteUid, uid]});
      this.setState({
        ImageShow: true,
      });
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      this._leaveChannel();
      this.setState({
        remoteUid: this.state.remoteUid.filter(value => value !== uid),
      });
    });
    this._engine?.addListener('LeaveChannel', stats => {
      this._leaveChannel();
      this.setState({isJoined: false, remoteUid: []});
    });
  };

  _joinChannel = async () => {
    await this._engine?.joinChannel(
      this.props.route.params.data.agora_token,
      this.state.channelId,
      null,
      0,
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
    this.props.navigation.navigate('RatingUserScreen');
  };

  toggleAudio = () => {
    let mute = this.state.audMute;
    this._engine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  };
  _switchCamera = () => {
    const {switchCamera} = this.state;
    this._engine
      ?.switchCamera()
      .then(() => {
        this.setState({switchCamera: !switchCamera});
      })
      .catch(err => {
        console.warn('switchCamera', err);
      });
  };

  _switchRender = () => {
    const {switchRender, remoteUid} = this.state;
    this.setState({
      switchRender: !switchRender,
      remoteUid: remoteUid.reverse(),
    });
  };

  render() {
    const {channelId, isJoined, switchCamera, ImageShow} = this.state;
    return (
      <View style={styles.container}>
        {this._renderVideo()}
        <View
          style={{
            position: 'absolute',
            top: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../Assets/deadasss.png')}
            resizeMode="contain"
            style={{width: 120, height: 80}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 100,
            width: '95%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          {ImageShow && (
            <CountDown
              until={ImageShow ? this.state.remaningTime : 60 * 10 + 30}
              // until={counter}
              size={18}
              onFinish={() => this.cancelCall()}
              digitStyle={{backgroundColor: '#FFF', margin: 5}}
              digitTxtStyle={{color: '#000'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'MM', s: 'SS'}}
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
            marginRight: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this._switchCamera()}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: '#a9a9a9',
                marginRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('./assets/dslr-camera.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cancelCall()}
              style={{
                height: 50,
                width: 50,
                marginRight: 15,
                borderRadius: 50,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../Assets/call_discontinue_icon.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.toggleAudio()}
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: this.state.audMute ? '#B0DAF2' : '#a9a9a9',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('./assets/mute-microphone.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <KeepAwake />
      </View>
    );
  }

  _renderVideo = () => {
    const {remoteUid} = this.state;
    return (
      <View style={styles.container}>
        {this.state.CameraShow == 'big' ? (
          <TouchableOpacity>
            <RtcLocalView.SurfaceView style={styles.remoteVideo} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.setState({CameraShow: 'big'})}
            style={{
              position: 'absolute',
              zIndex: 2,
              width: 110,
              height: 120,
              right: 10,
              bottom: 120,
            }}>
            <RtcLocalView.SurfaceView
              style={{
                position: 'absolute',
                // zIndex: 2,
                width: 110,
                height: 120,
                right: 10,
                bottom: 120,
              }}
            />
          </TouchableOpacity>
        )}
        {this.state.CameraShow == 'big' ? (
          <TouchableOpacity
            onPress={() => this.setState({CameraShow: 'small'})}
            style={{
              position: 'absolute',
              zIndex: 2,
              width: 110,
              height: 120,
              right: 10,
              bottom: 120,
            }}>
            {remoteUid !== undefined &&
              remoteUid.map((value, index) => (
                <RtcRemoteView.SurfaceView
                  style={{
                    position: 'absolute',
                    width: 110,
                    height: 120,

                    right: 10,
                  }}
                  uid={value}
                  zOrderMediaOverlay={true}
                />
              ))}
          </TouchableOpacity>
        ) : (
          <View>
            {remoteUid.map((value, index) => (
              <RtcRemoteView.SurfaceView
                style={styles.remoteVideo}
                uid={value}
                zOrderMediaOverlay={true}
              />
            ))}
          </View>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  local: {
    flex: 1,
  },
  remoteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  remote: {
    width: 200,
    height: 200,
  },
  remoteVideo: {
    // flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    // aspectRatio: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // overflow: 'hidden',
    alignItems: 'center',
  },
  remoteVideo1: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 0,
    padding: 0,
    aspectRatio: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 76,
    overflow: 'hidden',
    alignItems: 'center',
  },
});
