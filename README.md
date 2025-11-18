# Virtual Try-On App

A React Native + Expo mobile app prototype for AI-powered virtual garment try-on.

## Project Structure

```
VirtualTryOnApp/
├── App.js                      # Main entry point with navigation setup
├── package.json                # Dependencies and scripts
├── app.json                    # Expo configuration with permissions
├── .gitignore                  # Git ignore rules
├── screens/
│   ├── HomeScreen.js           # User photo upload/capture (placeholder)
│   ├── GarmentScreen.js        # Garment selection screen (placeholder)
│   └── ResultScreen.js         # AI try-on result display (placeholder)
├── services/
│   └── api.js                  # Hugging Face API service (mock for now)
├── components/
│   └── LoadingSpinner.js       # Reusable loading indicator
└── assets/
    └── garments/               # Folder for garment images
```

## Tech Stack

- **React Native 0.74.5** - Mobile app framework
- **Expo ~51.0.0** - Development platform
- **React Navigation 6.x** - Screen navigation
- **expo-image-picker** - Camera and photo library access
- **axios** - HTTP client for API calls

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will open Expo Dev Tools. You can:
- Press `i` to open iOS Simulator (Mac only)
- Press `a` to open Android Emulator
- Scan QR code with Expo Go app on your physical device

### 3. Platform-Specific Commands

```bash
npm run ios       # Run on iOS
npm run android   # Run on Android
npm run web       # Run in web browser (for testing only)
```

## App Flow

1. **Home Screen** → User takes/uploads a photo of themselves
2. **Garment Screen** → User selects from 5-8 garment options
3. **Result Screen** → AI-generated try-on result with save/retry options

## Configuration

### Permissions

The app requests the following permissions (configured in `app.json`):

**iOS:**
- Camera access
- Photo library access
- Photo library write access

**Android:**
- CAMERA
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE
- READ_MEDIA_IMAGES

### Hugging Face API

To enable the AI try-on feature:

1. Get an API token from [Hugging Face](https://huggingface.co/settings/tokens)
2. Update `services/api.js`:
   ```javascript
   const API_TOKEN = 'YOUR_ACTUAL_TOKEN_HERE';
   ```

Model: `ovi054/virtual-tryon-kontext-lora`

## Next Steps

### Immediate Tasks:
1. Add garment images to `assets/garments/` folder
2. Implement HomeScreen photo picker functionality
3. Implement GarmentScreen grid layout and selection
4. Integrate Hugging Face API in ResultScreen
5. Add image save functionality

### Screen Implementation Priority:
1. HomeScreen (expo-image-picker integration)
2. GarmentScreen (display hardcoded garments)
3. ResultScreen (API integration + loading states)

## Development Notes

- All screens use functional components with React Hooks
- Navigation uses Native Stack Navigator
- API service includes mock implementation for testing
- LoadingSpinner component ready for use during API calls
- Code includes detailed TODO comments for next steps

## Timeline

Target: 24-hour working prototype

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Hugging Face API](https://huggingface.co/docs/api-inference/index)
