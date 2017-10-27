证书信息keystore:CN=lewin, OU=微云时代, O=微云时代, L=上海, ST=上海, C=Unknown
密码:123456
ios打包:react-native bundle --entry-file index.ios.js --bundle-output ./ios/CardManager/bundle/main.jsbundle --platform ios --assets-dest ./ios/CardManager/bundle --dev false

安卓推荐方式:./gradlew assembleRelease

第二种也可以:react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/


