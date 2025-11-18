import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

/**
 * HomeScreen Component
 * Purpose: User uploads or takes a photo of themselves
 * Next: Navigate to GarmentScreen with the selected photo
 *
 * Features:
 * - Take photo with camera
 * - Choose photo from gallery
 * - Preview selected image
 * - Navigate to garment selection with image data
 */
const HomeScreen = ({ navigation }) => {
  // State to store the selected image URI
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Requests camera permissions and launches camera
   * Handles permission denial and errors gracefully
   */
  const handleTakePhoto = async () => {
    try {
      // Request camera permissions
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to take photos. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch camera with optimized settings
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.7,
        // Compress image to max 1024x1024 for better performance
        maxWidth: 1024,
        maxHeight: 1024,
      });

      // Check if user cancelled the camera
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      // Handle camera errors (e.g., camera not available on simulator)
      console.error('Camera Error:', error);
      Alert.alert(
        'Camera Error',
        Platform.OS === 'ios' && Platform.isPad
          ? 'Camera is not available on iOS Simulator. Please use a physical device or choose from gallery.'
          : 'Unable to access camera. Please try again or choose from gallery.',
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Requests gallery permissions and launches image picker
   * Handles permission denial and errors gracefully
   */
  const handleChooseFromGallery = async () => {
    try {
      // Request media library permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Denied',
          'Photo library permission is required to select photos. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image picker with optimized settings
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.7,
        // Compress image to max 1024x1024 for better performance
        maxWidth: 1024,
        maxHeight: 1024,
      });

      // Check if user cancelled the picker
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      // Handle gallery errors
      console.error('Gallery Error:', error);
      Alert.alert(
        'Gallery Error',
        'Unable to access photo library. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  /**
   * Navigates to GarmentScreen with the selected image
   * Only available after an image has been selected
   */
  const handleNext = () => {
    if (selectedImage) {
      navigation.navigate('Garment', { userImage: selectedImage });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Virtual Try-On</Text>
            <Text style={styles.subtitle}>Upload your photo to get started</Text>
          </View>

          {/* Image Preview Section */}
          {selectedImage ? (
            <View style={styles.previewSection}>
              <Text style={styles.previewLabel}>Your Photo:</Text>
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={() => setSelectedImage(null)}
                activeOpacity={0.7}
              >
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Action Buttons Section - Only shown when no image selected */
            <View style={styles.buttonSection}>
              {/* Take Photo Button */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleTakePhoto}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonIcon}>📷</Text>
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>

              {/* Choose from Gallery Button */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleChooseFromGallery}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonIcon}>🖼️</Text>
                <Text style={styles.buttonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Next Button - Only visible after image selection */}
          {selectedImage && (
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Next: Select Garment</Text>
                <Text style={styles.nextButtonIcon}>→</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Helper Text */}
          {!selectedImage && (
            <View style={styles.helperSection}>
              <Text style={styles.helperText}>
                💡 Tip: Use a full-body photo with good lighting for best results
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },

  // Header Styles
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Button Section Styles
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Image Preview Styles
  previewSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  changePhotoButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  changePhotoText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },

  // Next Button Styles
  nextButtonContainer: {
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#10b981',
    height: 60,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  nextButtonIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Helper Text Styles
  helperSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  helperText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
