import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * GarmentScreen Component
 * Purpose: User selects from 5-8 hardcoded garment images
 * Props: route.params.userImage (from HomeScreen)
 * Next: Navigate to ResultScreen with userImage + selectedGarment
 *
 * TODO: Add garment images to assets/garments/
 * TODO: Display garments in a grid layout
 * TODO: Handle garment selection
 * TODO: Navigate to Result screen with both images
 */
const GarmentScreen = ({ navigation, route }) => {
  // User's photo will be passed via route.params.userImage
  // const { userImage } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garment Screen</Text>
      <Text style={styles.subtitle}>Garment Selection - Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default GarmentScreen;
