import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * HomeScreen Component
 * Purpose: User uploads or takes a photo of themselves
 * Next: Navigate to GarmentScreen with the selected photo
 *
 * TODO: Implement image picker functionality
 * TODO: Add camera and photo library options
 * TODO: Display selected image preview
 * TODO: Add navigation to Garment screen with image data
 */
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>Photo Upload - Coming Soon</Text>
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

export default HomeScreen;
