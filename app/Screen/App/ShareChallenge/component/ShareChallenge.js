import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Linking,
  StatusBar,
  AppState,
} from 'react-native';
import {shareOnFacebook, shareOnTwitter} from 'react-native-social-share';
import ShareWhastap, {ShareSheet, Button} from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob';
import styles from './styles';
import Loader from '../../../../Utils/Loader';
// import Share from 'react-native-share';
const ShareChallenge = props => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [VideoUrl, setVideoUrl] = useState(false);

  function onPressBack() {
    navigation.goBack(null);
  }
  async function onPressShare() {
    try {
      const result = await Share.share({
        title: 'Verification Code',
        message: `Please Install Deadasss app, 1 on 1 videocall with me :  ${props?.challengeData?.deep_linking_url}\r\n\r\n Code is: ${props?.challengeData?.challenge_code}\r\n\r\n ${props?.challengeData?.challenge_video}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
          // shared
         // console.log('shared: ', shared);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
       // console.log('dismissed: ', dismissed);
      }
    } catch (error) {
      // alert(error.message);
    }
  }

  const postOnFacebook = () => {
    let facebookShareURL = props?.challengeData?.challenge_video;
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('u=' + encodeURI(facebookShareURL));
    if (props?.challengeData?.challenge_code)
      facebookParameters.push(
        'quote=' +
          encodeURI(
            `Please Install Deadasss app, 1 on 1 videocall with me : ${props?.challengeData?.deep_linking_url}\r\n\r\nCode is:  ${props?.challengeData?.challenge_code}\r\n\r\n`,
          ),
      );
    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');
    Linking.openURL(url)
      .then(data => {
        // alert('Facebook Opened');
      })
      .catch(() => {
        // alert('Something went wrong');
      });
  };

  // const WhatsappFun = () => {
  //     let url =
  //         "whatsapp://send?text=" +
  //         `Please Install Deadasss app, 1 on 1 videocall with me :  ${props.challengeData.deep_linking_url} \r\n\r\nCode is : ${props.challengeData.challenge_code}\r\n \r\n${props.challengeData.challenge_video}`;
  //     Linking.openURL(url)
  //         .then(data => {
  //             console.log("WhatsApp Opened successfully " + data);
  //         })
  //         .catch(() => {
  //             // alert("Make sure WhatsApp installed on your device");
  //         });

  // };

  const WhatsappFun = () => {
    let message =
      `Please Install Deadasss app, 1 on 1 videocall with me: ${props?.challengeData?.deep_linking_url}\n\n` +
      `Code is: ${props?.challengeData?.challenge_code}\n\n` +
      `${props?.challengeData?.challenge_video}`;

    let url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('WhatsApp is not installed on this device');
          props.setAlertMessage(
            'WhatsApp Not Found, Please install WhatsApp to share this content.',
          );
          props.AnimatedAlert.showAlert();
        }
      })
      .catch(error => console.log('An error occurred', error));
  };

  const shareViaSms = () => {
    let message =
      `Please Install Deadasss app, 1 on 1 videocall with me: ${props?.challengeData?.deep_linking_url}\n\n` +
      `Code is: ${props?.challengeData?.challenge_code}\n\n` +
      `${props?.challengeData?.challenge_video}`;

    let url = `sms:&body=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('Opening SMS app is not supported on this device');
          props.setAlertMessage(
            'SMS Not Supported, Sending SMS is not supported on this device.',
          );
          props.AnimatedAlert.showAlert();
        }
      })
      .catch(error => console.log('An error occurred', error));
  };


  const WhatsappFun_old = async () => {
    setLoader(true);
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4',
    })
      .fetch('GET', props?.challengeData?.challenge_video, {})
      .then((res) => {
        setLoader(false);
        let shareOptions = {
          title: 'Hello Deadass',
          message: 'Please install this app',
          // url:  res.path(),
          url: `file://${res.path()}`,
          type: 'video/mp4',
          subject: props?.challengeData?.deep_linking_url, //  for email
          social: ShareWhastap?.Social?.WHATSAPP,
        };
        ShareWhastap.shareSingle(shareOptions);
        // ShareWhastap.shareSingle(Object.assign(shareOptions, {
        //     "social": "whatsapp"
        // }));
      });
  };

  const EmailFun = async () => {
    console.log(
      'props.challengeData.deep_linking_url',
      props?.challengeData?.deep_linking_url,
    );
    const subject = 'Deadass';
    const message = `Please Install Deadasss app, 1 on 1 videocall with me :  ${props?.challengeData?.deep_linking_url} \r\n\r\nCode is : ${props?.challengeData?.challenge_code}\r\n \r\n${props?.challengeData?.challenge_video}`;
    // Linking.openURL(`mailto:?subject=${subject}&body=${message}`)

    Linking.openURL(
      `mailto:?subject=${subject}&body=${encodeURIComponent(message)}`,
    )
      .then(data => {
        // alert('Twitter Opened');
      })
      .catch(err => {
        // alert('Something went wrong');
      });
  };
  const instagramFun_old = async () => {
    setLoader(true);
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4',
    })
      .fetch('GET', props?.challengeData?.challenge_video, {})
      .then(async (res) => {
        setLoader(false);
        console.log('sachin', res);
        let shareOptions = {
          title: 'Hello Deadass',
          message:
            'Please Install Deadasss app, 1 on 1 videocall with me : ' +
            '  ' +
            props?.challengeData?.deep_linking_url +
            '  ' +
            'Code is:' +
            '  ' +
            props?.challengeData?.challenge_code,
          url: 'file://' + res.path(),
          type: 'video/mp4',
          // subject: props.challengeData.deep_linking_url,
          // method: ShareWhastap.InstagramStories.SHARE_BACKGROUND_IMAGE,
          //  backgroundImage:'file://' + res.path(),
          social: ShareWhastap?.Social?.INSTAGRAM_STORIES,
          failOnCancel: false,
          forceDialog: true,
        };

        // ShareWhastap.open(shareOptions)
        // .catch(error => console.log({ error }))

        ShareWhastap.shareSingle(
          Object.assign(shareOptions, {
            social: 'instagram',
          }),
        );
      });
  };

  const [twitterShareURL, setTwitterShareURL] = useState(
    props?.challengeData?.challenge_video,
  );
  const [tweetContent, setTweetContent] = useState(
    `Please Install Deadasss app, 1 on 1 videocall with me : ${props?.challengeData?.deep_linking_url}\r\n\r\n Code is: ${props?.challengeData?.challenge_code}\r\n\r\n`,
  );
  const [twitterViaAccount, setTwitterViaAccount] = useState('Deadasss');

  const tweetNow = async () => {
    let facebookShareURL = props?.challengeData?.challenge_video;
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('url=' + encodeURI(facebookShareURL));
    if (props?.challengeData?.challenge_code)
      facebookParameters.push(
        'text=' +
          encodeURI(
            `Please Install Deadasss app, 1 on 1 videocall with me : ${props?.challengeData?.deep_linking_url}\r\n\r\nCode is:  ${props?.challengeData?.challenge_code}\r\n\r\n`,
          ),
      );

    const url =
      'https://twitter.com/intent/tweet?' + facebookParameters.join('&');
    Linking.openURL(url)
      .then(data => {
        // alert('Twitter Opened');
      })
      .catch(() => {
        // alert('Something went wrong');
      });
  };

  const testShareInsta = async () => {
    setLoader(true);
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp4',
    })
      .fetch('GET', props?.challengeData?.challenge_video, {})
      .then((res) => {
        setLoader(false);
        let shareOptions = {
          title: 'Hello Deadass',
          message:
            'Please Install Deadasss app, 1 on 1 videocall with me : ' +
            '  ' +
            props?.challengeData?.deep_linking_url +
            '  ' +
            'Code is:' +
            '  ' +
            props?.challengeData?.challenge_code,
          url: 'file://' + res.path(),
          type: 'video/mp4',
          subject: props?.challengeData?.deep_linking_url, //  for email
        };
        ShareWhastap.shareSingle(
          Object.assign(shareOptions, {
            social: 'twitter',
          }),
        );
      });

    // shareOnTwitter({
    //     'text': 'Please Install Deadasss app, 1on1 videocall with me : ' + '  ' + props.challengeData.deep_linking_url + '  ' + 'Code is:' + '  ' + props.challengeData.challenge_code,
    //     'link': props.challengeData.deep_linking_url,
    //     'imagelink': props.challengeData.challenge_video,
    //     //or use image
    //     'image': props.challengeData.challenge_video,
    // },
    //     (results) => {
    //         console.log(results);
    //     }
    // );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <StatusBar backgroundColor="#f8b532" />

        {loader && <Loader state={loader} />}
        <TouchableOpacity
          onPress={() => onPressBack()}
          style={styles.CrossViewTxt}>
          <Text style={styles.CrossTextSTyle}>X</Text>
        </TouchableOpacity>
        <Text style={styles.PaymentDetailTxt}>Share</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.YourChallengetitle}>Your challenge was</Text>
          <Text style={styles.YourChallengetitle}>created successfully !</Text>
        </View>
        <View style={{alignItems: 'center', paddingTop: 30}}>
          <Text style={styles.YourChallengetitle}>Now it is time to</Text>
          <Text style={styles.YourChallengetitle}>
            share it . let's see who's
          </Text>
          <Image source={require('../../../../Assets/deadasss.png')} />
        </View>
        <View style={styles.ShareIconViewContain}>
          <TouchableOpacity onPress={() => WhatsappFun()}>
            <Image source={require('../../../../Assets/whatsaapp.png')} />
            <Text style={styles.ShareTxtStyle}>Whatsapp</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => instagramFun()}>
                        <Image source={require('../../../../Assets/insta.png')} />
                        <Text style={styles.ShareTxtStyle}>Instagram</Text>
                    </TouchableOpacity> */}
          <TouchableOpacity onPress={() => tweetNow()}>
            <Image
              source={require('../../../../Assets/twitter.png')}
              style={{width: 42, height: 42}}
            />
            <Text style={styles.ShareTxtStyle}>Tiwtter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressShare()}>
            <Image source={require('../../../../Assets/sms.png')} />
            <Text style={styles.ShareTxtStyle}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => EmailFun()}>
            <Image
              source={require('../../../../Assets/gmail.png')}
              style={{width: 42, height: 42}}
            />
            <Text style={styles.ShareTxtStyle}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => postOnFacebook()}>
            <Image
              source={require('../../../../Assets/facebook.png')}
              style={{width: 42, height: 42}}
            />
            <Text style={styles.ShareTxtStyle}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShareChallenge;
