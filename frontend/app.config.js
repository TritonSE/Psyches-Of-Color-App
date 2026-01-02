export default {
  expo: {
    name: "frontend",
    slug: "psyches-of-color-app",
    scheme: "frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./src/assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    fonts: [
      {
        asset: "./src/assets/fonts/socialGothic",
        family: "Social-Gothic",
      },
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "psychesofcolorapp",
      googleServicesFile: "./google-services.json",
      infoPlist: {
        NSPhotoLibraryUsageDescription: "This app accesses your photos to let you share them.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.psychesofcolor.mobileapp",
      googleServicesFile: "./google-services.json",
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.RECORD_AUDIO",
      ],
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
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
    ],
    owner: "ben332004",
  },
};
