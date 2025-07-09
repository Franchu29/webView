// withCleartextTraffic.js
const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withCleartextTraffic(config) {
  return withAndroidManifest(config, async (config) => {
    const app = config.modResults.manifest.application;
    if (Array.isArray(app)) {
      app[0]['$']['android:usesCleartextTraffic'] = 'true';
    } else {
      app['$']['android:usesCleartextTraffic'] = 'true';
    }
    return config;
  });
};
