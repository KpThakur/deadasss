package com.deadasss;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
// import io.agora.rtc.react.RCTAgoraRtcPackage;
// import io.agora.rtc.react.RCTAgoraRtcPackage;
// import com.loudspeaker.LoudSpeakerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

import java.util.List;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import androidx.annotation.Nullable;

import android.net.Uri;
import android.content.ContentResolver;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import androidx.core.app.NotificationCompat;
import android.media.AudioAttributes;



public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }
        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }
        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
         @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }
        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
        @Override
        protected @Nullable String getBundleAssetName() {
          return "app.bundle";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    
//     NotificationChannel notificationChannel = new NotificationChannel("newnotificationarrived", "Deadass", NotificationManager.IMPORTANCE_HIGH);
//           notificationChannel.enableLights(true);
//           notificationChannel.setShowBadge(true);
//           notificationChannel.setDescription("");
//           AudioAttributes att = new AudioAttributes.Builder()
//                   .setUsage(AudioAttributes.USAGE_NOTIFICATION)
//                   .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
//                   .build();
//           notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/skype"), att);
//           notificationChannel.enableVibration(true);
//           notificationChannel.setVibrationPattern(new long[]{400, 400});
//           notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
//           NotificationManager manager = getSystemService(NotificationManager.class);
//           manager.createNotificationChannel(notificationChannel);
  
      if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    
  }
}
