package com.deadasss;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.agora.rtc.react.RCTAgoraRtcPackage;
import io.agora.rtc.react.RCTAgoraRtcPackage;
// import com.loudspeaker.LoudSpeakerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
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
      new ReactNativeHost(this) {
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
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }




//  @Override
//   public void onCreate() {
//     super.onCreate();
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
//       SoLoader.init(this,false);
//       initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
//   }









  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.deadasss.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
