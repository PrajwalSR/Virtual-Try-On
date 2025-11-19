# Virtual Try-On MVP

A React Native mobile app prototype for AI-powered virtual garment try-on. Built as a validation MVP to test user interest and gather feedback.

## 🎯 Purpose

This is a **validation prototype** designed to:
- Test if users understand and want virtual try-on functionality
- Validate the user flow (photo → garment selection → result)
- Gather early feedback before investing in full AI integration
- Demonstrate the concept to potential investors/partners

**Current Status:** Functional MVP with mock API processing

## ✅ Features

### Implemented
- 📸 **Photo Upload**: Camera or gallery selection with image compression
- 👔 **Garment Catalog**: 6 sample garments in responsive 2-column grid
- 🤖 **Mock AI Processing**: Simulates realistic API processing (2-4 seconds)
- 🎨 **Result Display**: Animated result screen with error handling
- 💾 **Save Functionality**: Placeholder for saving results to photo library
- 🔄 **Navigation**: Complete flow with retry and back options
- ⚠️ **Error Handling**: Error boundary and graceful error recovery
- 📱 **Cross-Platform**: Works on both iOS and Android

### Architecture Highlights
- **Flexible API Layer**: Easy switching between MOCK, HuggingFace, and Gemini APIs
- **Component-Based**: Reusable components (LoadingSpinner, ErrorBoundary)
- **Animated UX**: Smooth transitions and loading states
- **Permission Handling**: Proper camera and photo library permissions
- **Clean Code**: Well-documented with JSDoc comments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios      # iOS Simulator (Mac only)
npm run android  # Android Emulator
npm run web      # Web browser (limited functionality)
```

### First Run
1. Start the app with `npm start`
2. Press `i` for iOS, `a` for Android, or scan QR code with Expo Go
3. Grant camera and photo library permissions when prompted
4. Upload a photo and select a garment to test the flow

## 📱 App Flow

```
┌─────────────────────────────────────────┐
│  1. HomeScreen                           │
│  • Take photo or choose from gallery    │
│  • Show 300x300 preview                 │
│  • Navigate to garment selection        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. GarmentScreen                        │
│  • Display 6 sample garments (2x3 grid) │
│  • Select garment (visual highlight)    │
│  • Navigate to result screen            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. ResultScreen                         │
│  • Auto-trigger API processing          │
│  • Show loading with elapsed time       │
│  • Display result with animations       │
│  • Options: Retry, Try Another, Save    │
└─────────────────────────────────────────┘
```

## 🔄 Switching to Real AI APIs

The app currently uses a **MOCK API** that simulates processing. Here's how to enable real AI:

### Option 1: Hugging Face (Recommended for MVP)

1. **Get API Token**
   - Go to https://huggingface.co/settings/tokens
   - Create a new token with read permissions
   - Copy the token (starts with `hf_...`)

2. **Update Configuration**
   ```javascript
   // services/api.js
   const API_MODE = 'HUGGINGFACE';  // Line 22

   const CONFIG = {
     HUGGINGFACE: {
       apiKey: 'hf_your_actual_token_here',  // Line 30
       modelId: 'ovi054/virtual-tryon-kontext-lora',
       endpoint: 'https://api-inference.huggingface.co/models/'
     }
   };
   ```

3. **Implement API Function**
   - Follow the detailed TODO comments in `huggingFaceGenerateVTO()` (lines 143-179)
   - Implement image-to-base64 conversion in `imageToBase64()` (lines 254-283)
   - Test with a single image first

4. **Expected Response Time**: 10-30 seconds per generation

### Option 2: Google Gemini/Vertex AI

1. **Set up Google Cloud**
   - Create GCP project and enable Vertex AI
   - Create service account and download JSON key
   - Install Google Cloud SDK or client library

2. **Update Configuration**
   ```javascript
   // services/api.js
   const API_MODE = 'GEMINI';

   const CONFIG = {
     GEMINI: {
       projectId: 'your-gcp-project-id',
       location: 'us-central1',
       apiEndpoint: 'https://us-central1-aiplatform.googleapis.com/v1/'
     }
   };
   ```

3. **Implement API Function**
   - Follow the implementation guide in `geminiGenerateVTO()` (lines 216-236)
   - Add authentication with service account
   - Handle image uploads and response processing

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React Native 0.74+ |
| Platform | Expo SDK 51+ |
| Navigation | React Navigation 6 |
| Image Picker | expo-image-picker |
| HTTP Client | Axios |
| Animations | React Native Animated API |
| State | React Hooks (useState, useEffect, useRef) |

## 📊 Testing Checklist

### Functionality
- [ ] Photo upload works from camera (physical device only)
- [ ] Photo upload works from gallery
- [ ] Image preview displays correctly
- [ ] Garment selection highlights the chosen item
- [ ] "Continue" button only enables after selection
- [ ] Loading state shows during processing
- [ ] Processing timer counts up correctly
- [ ] Result displays after mock processing
- [ ] Retry button works after errors
- [ ] "Try Another Garment" keeps same photo
- [ ] "Start Over" returns to home screen
- [ ] Back navigation works from all screens

### Permissions
- [ ] iOS camera permission requested
- [ ] iOS photo library permission requested
- [ ] Android camera permission requested
- [ ] Android storage permission requested
- [ ] Graceful handling of denied permissions

### Edge Cases
- [ ] App doesn't crash on iOS Simulator (camera unavailable)
- [ ] Error messages display for simulated failures
- [ ] Navigation works after errors
- [ ] App recovers from crashes (Error Boundary)

### Performance
- [ ] Images load smoothly
- [ ] Animations are smooth (60 FPS)
- [ ] No memory leaks during navigation
- [ ] App size is reasonable (<50MB)

## 📁 Project Structure

```
VirtualTryOnApp/
├── App.js                      # Main entry with ErrorBoundary
├── app.json                    # Expo configuration
├── package.json                # Dependencies
│
├── screens/                    # Screen components
│   ├── HomeScreen.js          # Photo upload (353 lines)
│   ├── GarmentScreen.js       # Garment selection (452 lines)
│   └── ResultScreen.js        # Result display (580+ lines)
│
├── services/                   # Business logic
│   └── api.js                 # Multi-backend API service (373 lines)
│
├── components/                 # Reusable components
│   ├── LoadingSpinner.js      # Animated loading indicator
│   └── ErrorBoundary.js       # Crash recovery component
│
├── assets/                     # Static assets
│   └── garments/              # Garment images (empty for now)
│
└── docs/                       # Documentation
    ├── README.md              # This file
    └── VALIDATION_GUIDE.md    # User testing guide
```

## 📝 Validation Metrics to Track

When testing with real users, measure:

### Quantitative
- **Completion Rate**: % of users who finish the full flow
- **Time per Screen**: Average time spent on each screen
- **Drop-off Points**: Where users abandon the flow
- **Error Rate**: How often users encounter errors
- **Retry Rate**: How often users retry after errors

### Qualitative
- **Comprehension**: Do users understand what the app does?
- **Satisfaction**: Are users happy with the result?
- **Willingness to Pay**: Would users pay for this?
- **Feature Requests**: What do users want added?
- **Sharing Behavior**: Do users want to share results?

## 🎨 Next Phase Features (Not in MVP)

### User Experience
- [ ] Onboarding tutorial/walkthrough
- [ ] Result history and favorites
- [ ] Share to social media
- [ ] Compare multiple try-ons side-by-side
- [ ] AR live try-on mode

### Catalog
- [ ] Real garment catalog with backend
- [ ] Search and filter garments
- [ ] Categories (dresses, tops, pants, etc.)
- [ ] Garment details (price, size, brand)
- [ ] "Buy now" links to retailers

### Technical
- [ ] User authentication
- [ ] Cloud storage for user data
- [ ] Analytics tracking
- [ ] A/B testing framework
- [ ] Push notifications
- [ ] Offline mode
- [ ] Image optimization pipeline

### Business
- [ ] Payment integration
- [ ] Subscription model
- [ ] Affiliate partnerships
- [ ] Admin dashboard
- [ ] Usage analytics

## 🐛 Known Issues

### Current Limitations
1. **Mock API Only**: Returns user's original photo as "result"
2. **Save Image**: Placeholder - doesn't actually save yet
3. **Limited Catalog**: Only 6 hardcoded sample garments
4. **No Real AI**: Must implement API integration for production
5. **Camera on Simulator**: iOS Simulator has no camera (expected)

### TODO Before Production
- [ ] Implement real AI API (HuggingFace or Gemini)
- [ ] Complete `imageToBase64()` helper function
- [ ] Complete `saveImageToDevice()` implementation
- [ ] Add real garment catalog with CDN
- [ ] Implement user authentication
- [ ] Add analytics tracking
- [ ] Set up error logging service (Sentry)
- [ ] Create proper app icons and splash screens
- [ ] Optimize images (compress, lazy load)
- [ ] Add terms of service and privacy policy

## 🔒 Privacy & Security

- **Local Processing**: User photos are processed on-device before API calls
- **No Storage**: Photos are not stored on our servers (MVP)
- **Permission-Based**: All sensitive features require explicit user permission
- **Secure API**: API keys are not exposed in client code (production)

**Note:** This MVP does not implement production-grade security. Before public release:
- Add proper authentication
- Implement secure API key management
- Add rate limiting
- Set up HTTPS and SSL pinning
- Comply with GDPR, CCPA regulations

## 📞 Support & Feedback

### For Developers
- Check the code comments (JSDoc documentation)
- Review `services/api.js` for API implementation guides
- See `VALIDATION_GUIDE.md` for user testing instructions

### For Testers
- Report bugs via GitHub Issues
- Share feedback in user testing sessions
- Contact: [your-email@example.com]

## 📄 License

This is a prototype for validation purposes. License TBD.

---

**Built with ❤️ in 24 hours**

Version: 1.0.0 | Last Updated: 2024
