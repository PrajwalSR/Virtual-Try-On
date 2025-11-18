import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * ResultScreen Component
 * Purpose: Display AI-generated try-on result
 * Props: route.params.userImage, route.params.garmentImage
 * Features: Show result, option to retry, option to save
 *
 * TODO: Call Hugging Face API with user + garment images
 * TODO: Show loading spinner while processing
 * TODO: Display generated try-on result
 * TODO: Add "Try Another Garment" button (navigate back to Garment)
 * TODO: Add "Start Over" button (navigate to Home)
 * TODO: Add "Save Image" functionality
 */
const ResultScreen = ({ navigation, route }) => {
  // Images will be passed via route.params
  // const { userImage, garmentImage } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result Screen</Text>
      <Text style={styles.subtitle}>AI Try-On Result - Coming Soon</Text>
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

export default ResultScreen;
