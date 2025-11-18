import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * LoadingSpinner Component
 * Reusable loading indicator to show during API calls
 *
 * @param {string} message - Optional message to display below spinner
 * @param {string} size - Size of spinner: 'small' or 'large' (default: 'large')
 */
const LoadingSpinner = ({ message = 'Processing...', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#6200ee" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
