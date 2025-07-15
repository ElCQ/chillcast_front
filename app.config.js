export default {
  expo: {
    backgroundColor: "#282828",
    splash: {
      backgroundColor: "#282828"
    },
    name: "chillcast",
    slug: "chillcast",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "chillcast",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#282828"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#282828"
        }
      ],
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ],
      "expo-font",
      "expo-audio",
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true
    },

    extra: {
      API_URL_DEV: process.env.API_URL,
      API_URL_PROD: "https://chillcast-backend.onrender.com"
    }
  }
};