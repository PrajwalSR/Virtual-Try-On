import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

// Sample garment data - In production, this would come from an API or local assets
const SAMPLE_GARMENTS = [
  {
    id: 1,
    name: 'Red Summer Dress',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    category: 'dress'
  },
  {
    id: 2,
    name: 'Blue Denim Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'jacket'
  },
  {
    id: 3,
    name: 'White T-Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'top'
  },
  {
    id: 4,
    name: 'Black Leather Jacket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'jacket'
  },
  {
    id: 5,
    name: 'Floral Dress',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    category: 'dress'
  },
  {
    id: 6,
    name: 'Gray Hoodie',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    category: 'top'
  }
];

/**
 * GarmentCard Component
 * Displays a single garment item in the grid
 *
 * @param {Object} item - Garment data object
 * @param {boolean} isSelected - Whether this garment is currently selected
 * @param {Function} onSelect - Callback when garment is tapped
 */
const GarmentCard = ({ item, isSelected, onSelect }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity
      style={[
        styles.garmentCard,
        isSelected && styles.garmentCardSelected
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      {/* Garment Image */}
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.imageLoadingContainer}>
            <ActivityIndicator size="small" color="#6366f1" />
          </View>
        )}
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.garmentImage}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>

      {/* Garment Name Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.garmentName} numberOfLines={2}>
          {item.name}
        </Text>
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedBadgeText}>✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 * GarmentScreen Component
 * Purpose: User selects from sample garment images
 * Props: route.params.userImage (from HomeScreen)
 * Next: Navigate to ResultScreen with userImage + selectedGarment
 *
 * Features:
 * - Display garments in a 2-column grid
 * - Show user's photo as thumbnail reminder
 * - Track selected garment
 * - Navigate to result screen with both images
 */
const GarmentScreen = ({ navigation, route }) => {
  // Get user's photo from navigation params
  const { userImage } = route.params || {};

  // State to track which garment is selected
  const [selectedGarment, setSelectedGarment] = useState(null);

  // Calculate card dimensions based on screen width
  const screenWidth = Dimensions.get('window').width;
  const cardSpacing = 10;
  const cardWidth = (screenWidth - (cardSpacing * 3)) / 2; // 2 columns with spacing

  /**
   * Handles garment selection
   * @param {Object} garment - Selected garment object
   */
  const handleSelectGarment = (garment) => {
    setSelectedGarment(garment);
  };

  /**
   * Navigates to ResultScreen with user image and selected garment
   * Only enabled after a garment has been selected
   */
  const handleContinue = () => {
    if (selectedGarment && userImage) {
      navigation.navigate('Result', {
        userImage: userImage,
        selectedGarment: selectedGarment
      });
    }
  };

  /**
   * Navigates back to HomeScreen
   */
  const handleBack = () => {
    navigation.goBack();
  };

  /**
   * Renders a single garment card in the FlatList
   */
  const renderGarmentItem = ({ item }) => (
    <GarmentCard
      item={item}
      isSelected={selectedGarment?.id === item.id}
      onSelect={() => handleSelectGarment(item)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section with User Photo Thumbnail */}
        <View style={styles.headerSection}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Choose a Garment</Text>
            <Text style={styles.subtitle}>Select an item to try on</Text>
          </View>

          {/* User Photo Thumbnail - Reminder of uploaded photo */}
          {userImage && (
            <View style={styles.userThumbnailContainer}>
              <Text style={styles.thumbnailLabel}>Your Photo</Text>
              <Image
                source={{ uri: userImage }}
                style={styles.userThumbnail}
                resizeMode="cover"
              />
            </View>
          )}
        </View>

        {/* Garment Grid */}
        <FlatList
          data={SAMPLE_GARMENTS}
          renderItem={renderGarmentItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Action Buttons */}
        <View style={styles.bottomSection}>
          {/* Selection Indicator */}
          {selectedGarment && (
            <View style={styles.selectionIndicator}>
              <Text style={styles.selectionText}>
                Selected: <Text style={styles.selectionName}>{selectedGarment.name}</Text>
              </Text>
            </View>
          )}

          {/* Action Buttons Row */}
          <View style={styles.buttonRow}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            {/* Continue Button - Only enabled when garment is selected */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedGarment && styles.continueButtonDisabled
              ]}
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={!selectedGarment}
            >
              <Text style={[
                styles.continueButtonText,
                !selectedGarment && styles.continueButtonTextDisabled
              ]}>
                Continue →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },

  // User Thumbnail Styles
  userThumbnailContainer: {
    alignItems: 'center',
    marginLeft: 12,
  },
  thumbnailLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  userThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6366f1',
  },

  // Grid Styles
  gridContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  // Garment Card Styles
  garmentCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 10,
  },
  garmentCardSelected: {
    borderWidth: 4,
    borderColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1, // Square aspect ratio
    backgroundColor: '#f3f4f6',
  },
  imageLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    zIndex: 1,
  },
  garmentImage: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  garmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  selectedBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Bottom Section Styles
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  selectionIndicator: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  selectionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectionName: {
    fontWeight: '600',
    color: '#1f2937',
  },

  // Button Styles
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  backButtonText: {
    color: '#6366f1',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButton: {
    flex: 2,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#e5e7eb',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#9ca3af',
  },
});

export default GarmentScreen;
