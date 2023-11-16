# Panthor App

## Developer Setup

1. Setup `google-services.json`

   In order for working push-notifications powered by Firebase Cloud Messaging you need to place your `googe-services.json` at `/android/app/google-services.json`.

2. Start your application

   ```bash
   npm start
   # or start with cleared cache
   npm start -- --reset-cache
   ```

## Build bauen

### Unsignierten Release-Build bauen (TESTED)

```bash
npx react-native run-android --mode=release
```

> Der Build kann anschließend unter `/MyReactNativeApp/android/app/build/outputs/apk/release/` gefunden werden

### Signierten Release-Build bauen

#### `keystore` generieren

1. You will need a Java generated signing key which is a keystore file used to generate a React Native executable binary for Android. You can create one using the keytool in the terminal with the following command

   Once you run the keytool utility, you’ll be prompted to type in a password. \*Make sure you remember the password

   You can change your_key_name with any name you want, as well as your_key_alias. This key uses key-size 2048, instead of default 1024 for security reason.

   ```bash
   keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Firstly, you need to copy the file `your_key_name.keystore` and paste it under the `android/app` directory in your React Native project folder.

   ```bash
   mv my-release-key.keystore /android/app
   ```

   You need to open your `android\app\build.gradle` file and add the keystore configuration. There are two ways of configuring the project with keystore. First, the common and unsecured way:

   ```txt
   android {
   ....
   signingConfigs {
      release {
         storeFile file('your_key_name.keystore')
         storePassword 'your_key_store_password'
         keyAlias 'your_key_alias'
         keyPassword 'your_key_file_alias_password'
      }
   }
   buildTypes {
         release {
            ....
            signingConfig signingConfigs.release
         }
      }
   }
   ```

   This is not a good security practice since you store the password in plain text. Instead of storing your keystore password in .gradle file, you can stipulate the build process to prompt you for these passwords if you are building from the command line.

   To prompt for password with the Gradle build file, change the above config as:

   ```txt
   signingConfigs {
      release {
         storeFile file('your_key_name.keystore')
         storePassword System.console().readLine("\nKeystore password:")
         keyAlias System.console().readLine("\nAlias: ")
         keyPassword System.console().readLine("\nAlias password: ")
      }
   }
   ```

   ```bash
   react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
   ```

3. Place your terminal directory to android using:

   ```bash
   cd android
   ```

   **For Windows**

   ```bash
   gradlew assembleRelease
   ```

   **For Linux and Mac OSX**

   ```bash
   ./gradlew assembleRelease
   ```

   As a result, the APK creation process is done. You can find the generated APK at `android/app/build/outputs/apk/app-release.apk`. This is the actual app, which you can send to your phone or upload to the Google Play Store. Congratulations, you’ve just generated a React Native Release Build APK for Android.
