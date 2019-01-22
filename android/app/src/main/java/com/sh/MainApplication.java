package com.sh;

import android.app.Application;

import com.facebook.react.ReactApplication;

import com.polidea.reactnativeble.BlePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BlePackage(),
            new VectorIconsPackage(),
            new RNGoogleSigninPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
