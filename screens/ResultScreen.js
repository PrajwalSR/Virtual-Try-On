import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { generateVirtualTryOn, saveImageToDevice } from '../services/api';

/**
 * ResultScreen Component
 * Purpose: Display AI-generated virtual try-on result
 * Props: route.params.userImage, route.params.selectedGarment
 *
 * Features:
 * - Automatically trigger API call on mount
 * - Show loading state during processing
 * - Display result image when complete
 * - Handle errors with retry option
 * - Save image to device
 * - Navigate back to try another garment or start over
 */
const ResultScreen = ({ navigation, route }) => {
  // Get images from navigation params
  const { userImage, selectedGarment } = route.params || {};

  // Component state
  const [loading, setLoading] = useState(true);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  /**
   * Generate virtual try-on result
   * Called automatically on mount and when user retries
   */
  const generateResult = async () => {
    try {
      console.log('[ResultScreen] Starting generation...');
      setLoading(true);
      setError(null);

      // Validate that we have the required data
      if (!userImage || !selectedGarment) {
        throw new Error('Missing required images. Please start over.');
      }

      // Call API service to generate virtual try-on
      const result = await generateVirtualTryOn(userImage, selectedGarment);

      console.log('[ResultScreen] Generation complete!');
      setResultImage(result);
      setLoading(false);

    } catch (err) {
      console.error('[ResultScreen] Error:', err);
      setError(err.message || 'Failed to generate try-on result');
      setLoading(false);
    }
  };

  /**
   * Trigger generation on component mount
   */
  useEffect(() => {
    generateResult();

    // Cleanup function
    return () => {
      // Clean up any pending operations if component unmounts
      console.log('[ResultScreen] Component unmounting');
    };
  }, []); // Empty dependency array = run once on mount

  /**
   * Retry generation after an error
   */
  const handleRetry = () => {
    generateResult();
  };

  /**
   * Navigate back to GarmentScreen to try another garment
   * Keeps the same user image
   */
  const handleTryAnotherGarment = () => {
    navigation.navigate('Garment', { userImage });
  };

  /**
   * Navigate back to HomeScreen to start over with a new photo
   */
  const handleStartOver = () => {
    navigation.navigate('Home');
  };

  /**
   * Save the result image to device photo library
   */
  const handleSaveImage = async () => {
    if (!resultImage) {
      Alert.alert('No Image', 'There is no result image to save.');
      return;
    }

    try {
      setSaving(true);

      // Call save function from API service
      await saveImageToDevice(resultImage);

      setSaving(false);

      // Show success message
      Alert.alert(
        'Success!',
        'Image saved to your photo library.',
        [{ text: 'OK' }]
      );

    } catch (err) {
      setSaving(false);
      console.error('[ResultScreen] Save error:', err);

      Alert.alert(
        'Save Failed',
        'Could not save image. This feature will be available soon.',
        [{ text: 'OK' }]
      );
    }
  };

  // ============== RENDER METHODS ==============

  /**
   * Render loading state while API is processing
   */
  const renderLoading = () => (
    <View style={styles.centerContent}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text style={styles.loadingTitle}>Generating your look...</Text>
      <Text style={styles.loadingSubtitle}>
        Our AI is creating your virtual try-on
      </Text>
      <Text style={styles.loadingNote}>This may take a few seconds</Text>

      {/* Show garment being processed */}
      {selectedGarment && (
        <View style={styles.processingInfo}>
          <Image
            source={{ uri: selectedGarment.imageUrl }}
            style={styles.processingGarmentImage}
            resizeMode="cover"
          />
          <Text style={styles.processingText}>
            Trying on: {selectedGarment.name}
          </Text>
        </View>
      )}
    </View>
  );

  /**
   * Render error state with retry option
   */
  const renderError = () => (
    <View style={styles.centerContent}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{error}</Text>

      <TouchableOpacity
        style={styles.retryButton}
        onPress={handleRetry}
        activeOpacity={0.8}
      >
        <Text style={styles.retryButtonText}>🔄 Retry</Text>
      </TouchableOpacity>

      <Text style={styles.errorHint}>
        If the problem persists, try starting over with a different photo
      </Text>
    </View>
  );

  /**
   * Render success state with result image
   */
  const renderSuccess = () => (
    <ScrollView
      contentContainerStyle={styles.successContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Result Image */}
      <View style={styles.resultImageContainer}>
        <Image
          source={{ uri: resultImage }}
          style={styles.resultImage}
          resizeMode="contain"
        />
      </View>

      {/* Garment Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Text style={styles.infoLabel}>Garment:</Text>
          <Text style={styles.infoValue}>{selectedGarment?.name}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoSecondary}>
            Category: {selectedGarment?.category}
          </Text>
        </View>
      </View>

      {/* Success Message */}
      <View style={styles.successBanner}>
        <Text style={styles.successIcon}>✨</Text>
        <Text style={styles.successText}>Your virtual try-on is ready!</Text>
      </View>
    </ScrollView>
  );

  // ============== MAIN RENDER ==============

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Virtual Try-On</Text>
          {!loading && !error && (
            <Text style={styles.headerSubtitle}>See how you look!</Text>
          )}
        </View>

        {/* Main Content Area - Changes based on state */}
        <View style={styles.mainContent}>
          {loading && renderLoading()}
          {error && renderError()}
          {!loading && !error && resultImage && renderSuccess()}
        </View>

        {/* Bottom Action Buttons - Only show when not loading */}
        {!loading && (
          <View style={styles.bottomSection}>
            {/* Primary Actions */}
            <View style={styles.primaryActions}>
              {/* Try Another Garment Button */}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleTryAnotherGarment}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>
                  👔 Try Another Garment
                </Text>
              </TouchableOpacity>

              {/* Start Over Button */}
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleStartOver}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>🏠 Start Over</Text>
              </TouchableOpacity>
            </View>

            {/* Save Button - Only show when we have a result */}
            {!error && resultImage && (
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSaveImage}
                activeOpacity={0.8}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text style={styles.saveButtonText}> Saving...</Text>
                  </>
                ) : (
                  <Text style={styles.saveButtonText}>💾 Save to Photos</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },

  // Main Content Area
  mainContent: {
    flex: 1,
  },

  // Center Content (for loading and error states)
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Loading State Styles
  loadingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 20,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingNote: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 16,
    fontStyle: 'italic',
  },
  processingInfo: {
    marginTop: 40,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },
  processingGarmentImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  processingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },

  // Error State Styles
  errorIcon: {
    fontSize: 64,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#dc2626',
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorHint: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
    fontStyle: 'italic',
  },

  // Success State Styles
  successContent: {
    padding: 20,
  },
  resultImageContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  resultImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5, // 50% of screen height
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoSecondary: {
    fontSize: 14,
    color: '#6b7280',
  },

  // Success Banner
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  successText: {
    fontSize: 16,
    color: '#065f46',
    fontWeight: '600',
  },

  // Bottom Section Styles
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  primaryActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  secondaryButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    height: 60,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ResultScreen;
