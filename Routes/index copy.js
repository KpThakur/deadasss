import React from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { FONT_FAMILY_REGULAR, RED_COLOUR_CODE } from '../app/Utils/constant';

class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 15
    }
    this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    this.onConferenceJoined = this.onConferenceJoined.bind(this);
    this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }
  async componentDidMount() {
    if (Platform.OS === "android") {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then((result) => {
        if (
          result["android.permission.CAMERA"] &&
          result["android.permission.READ_EXTERNAL_STORAGE"] &&
          result["android.permission.RECORD_AUDIO"] &&
          result["android.permission.WRITE_EXTERNAL_STORAGE"]
        ) {
        } else if (
          result["android.permission.CAMERA"] ||
          result["android.permission.READ_EXTERNAL_STORAGE"] ||
          result["android.permission.RECORD_AUDIO"] ||
          result["android.permission.WRITE_EXTERNAL_STORAGE"]
        ) {
        }
      });
    }
    const url = "https://meet.liikes.com/pravesh";//self.props.navigation.getParam('url');
    const userInfo = { displayName: 'Pravesh Devda', email: 'praveshdevda19@gmail.com', avatar: 'https:/gravatar.com/avatar/abc123' };
    JitsiMeet.call(url, userInfo);
    const timer = this.state.counter > 0 && setInterval(() => this.setState({
        counter: this.state.counter - 1
      }), 60000);
      return () => clearInterval(timer);
    // setTimeout(() => {
    //   // const url = "https://meet.liikes.com/pravesh";//self.props.navigation.getParam('url');
    //   // const userInfo = { displayName: 'Pravesh Devda', email: 'praveshdevda19@gmail.com', avatar: 'https:/gravatar.com/avatar/abc123' };
    //   // JitsiMeet.call(url, userInfo);

    // }, 1000);
  }

  // dissconnect() {
  //   console.log(":disconnect");
  //   JitsiMeet.endCall();
  // }

  onConferenceTerminated(nativeEvent) {
    console.log('onConferenceTerminated: ', nativeEvent);
    JitsiMeet.endCall();
    // this.onPressReject()
  }
  onConferenceJoined(nativeEvent) {
    console.log('onConferenceJoined: ', nativeEvent);
    /* Conference joined event */
  }

  onConferenceWillJoin(nativeEvent) {
    console.log('onConferenceWillJoin: ', nativeEvent);
    /* Conference will join event */
  }
  render() {
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <View style={{
          position: 'absolute',
          backgroundColor: '#d7cabe',
          padding: 6,
          paddingHorizontal: 12,
          right: 0,
          top: 10,
          zIndex: 1
        }}>
          <Text style={{
            color: RED_COLOUR_CODE,
            fontSize: 16,
            fontFamily: FONT_FAMILY_REGULAR
          }}>{this.state.counter} MIN REMAINING</Text>
        </View>
        <JitsiMeetView
          onConferenceTerminated={this.onConferenceTerminated}
          onConferenceJoined={this.onConferenceJoined}
          onConferenceWillJoin={this.onConferenceWillJoin}
          style={{
            height: '80%',
            marginTop: 60,
            width: '100%',
          }} />
      </View>


    );
  }
}
export default VideoCall;