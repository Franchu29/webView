import withCleartextTraffic from './withCleartextTraffic';

export default {
  expo: {
    name: 'webview-app',
    slug: 'webview-app',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    icon: './assets/icon.png',
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      edgeToEdgeEnabled: true,
      package: 'com.marcosruz.webviewapp'
    },
    web: {
      favicon: './assets/icon.png',
    },
    extra: {
      eas: {
        projectId: '2b042e94-343f-4e42-ae43-397265bec1f8'
      }
    },
    owner: 'marcosruz',
    plugins: ['./withCleartextTraffic']
  }
};
