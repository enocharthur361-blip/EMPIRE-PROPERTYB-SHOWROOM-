# EMPIRE Mobile App - React Native with Expo

## Installation

### Prerequisites
- Node.js >= 14
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Setup

```bash
# Create new Expo project
expo init empire-mobile --template
cd empire-mobile

# Install dependencies
npm install

# Install required packages
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install redux react-redux @reduxjs/toolkit
npm install axios
npm install @react-native-async-storage/async-storage
npm install react-native-image-picker
npm install firebase
npm install react-native-geolocation
```

## Running the App

### Development Server
```bash
npm start
```

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Project Structure

```
empire-mobile/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── SplashScreen.js
│   │   ├── listings/
│   │   │   ├── ListingsScreen.js
│   │   │   ├── CreateListingScreen.js
│   │   │   └── ListingDetailsScreen.js
│   │   ├── search/
│   │   │   ├── SearchScreen.js
│   │   │   └── FilterModal.js
│   │   └── profile/
│   │       └── ProfileScreen.js
│   ├── components/
│   │   ├── PropertyCard.js
│   │   ├── Button.js
│   │   └── Input.js
│   ├── navigation/
│   │   ├── RootNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── AppNavigator.js
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── listingSlice.js
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── listingService.js
│   ├── styles/
│   │   ├── colors.js
│   │   └── spacing.js
│   └── App.js
├── app.json
└── package.json
```

## Core Features

### Authentication
- Email/Password login
- User registration
- Token management
- Biometric support (coming soon)

### Property Listings
- Browse listings
- Create new listing
- Upload photos/videos
- View listing details
- Search & filter

### Subscription
- View subscription status
- Upgrade/downgrade plans
- PayPal payment integration

### User Profile
- View profile
- Edit profile
- Manage preferences
- View transaction history

## Configuration

### API Configuration
Create `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://api.empireproperty.ae';
export const PAYPAL_CLIENT_ID = 'your-paypal-client-id';
export const FIREBASE_CONFIG = {
  apiKey: 'your-firebase-api-key',
  projectId: 'your-project-id'
};
```

## Building for Production

### iOS Build
```bash
eas build --platform ios --auto-submit
```

### Android Build
```bash
eas build --platform android
```

## Deployment

### App Store (iOS)
1. Build the app using EAS
2. Submit to App Store Connect
3. Complete review process

### Google Play (Android)
1. Build the app using EAS
2. Submit to Google Play Console
3. Complete review process

## Testing

```bash
npm test
```

## Support

For issues or questions: mobile-dev@empireproperty.ae
