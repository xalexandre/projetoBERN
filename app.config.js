module.exports = {
  name: 'ProjetoBERN',
  slug: 'ProjetoBERN',
  // ... outras configs do app.json
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/auth"
  ],
  android: {
    package: "com.projetobern",
    googleServicesFile: "./google-services.json"
  },
  ios: {
    bundleIdentifier: "com.projetobern",
    googleServicesFile: "./GoogleService-Info.plist"
  }
}; 