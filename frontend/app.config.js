export default {
  expo: {
    name: "Psyches of Color",
    slug: "psyches-of-color-app",
    scheme: "psychesofcolor",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/app-icon.png",
    fonts: [
      {
        asset: "./src/assets/fonts/socialGothic",
        family: "Social-Gothic",
      },
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "org.psychesofcolor.mobileapp",
      infoPlist: {
        "NSCameraUsageDescription": "This app uses the camera to let you take photos for uploading.",
        "NSPhotoLibraryUsageDescription": "This app accesses your photos to let you share them.",
        ITSAppUsesNonExemptEncryption: false
      },
      googleServicesFile: "./GoogleServices-Info.plist",
      splash: {
        image: "./src/assets/images/app-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      "appDelegateLanguage": "objc"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/app-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.psychesofcolor.mobileapp",
      googleServicesFile: "./google-services.json",
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO",
      ],
      splash: {
        image: "./src/assets/images/app-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "2b27ff30-57bf-41ab-8556-e5ebc0e80d2e",
      },
      router: {
        origin: false,
      },
      EXPO_PUBLIC_BACKEND_URI: process.env.EXPO_PUBLIC_BACKEND_URI,
      EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    },
    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
          android: {
            targetSdkVersion: 35,
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share them.",
          "cameraPermission": "The app uses the camera to let you take photos for uploading."
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./src/assets/fonts/Social-Gothic-Regular.otf",
            "./src/assets/fonts/Social-Gothic-Bold.otf",
            "./src/assets/fonts/Social-Gothic-DemiBold.otf",
            "./src/assets/fonts/Social-Gothic-Medium.otf",
            "./src/assets/fonts/Social-Gothic-Rough.otf",
            "./src/assets/fonts/Social-Gothic-Soft.otf",
            "./src/assets/fonts/Social-Gothic-Stencil.otf",
          ],
        },
      ],
      "expo-router",
      [
        "@react-native-firebase/app",
        {
          disableOpenUrlFix: true, 
        }
      ],
      "@react-native-google-signin/google-signin",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FFFFFF",
          image: "./src/assets/images/app-icon.png",
          dark: {
            image: "./src/assets/images/app-icon.png",
            backgroundColor: "#000000",
          },
          imageWidth: 200,
        },
      ],
      "expo-asset"
    ],
    owner: "ben332004",
  },
};
