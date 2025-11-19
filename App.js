/**
 * Virtual Try-On MVP
 * Version: 1.0.0
 * Purpose: Validation prototype for user testing
 *
 * Main App Component
 * Sets up the navigation structure and error boundary
 * Flow: Home -> Garment Selection -> Try-On Result
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import components
import ErrorBoundary from './components/ErrorBoundary';

// Import screens
import HomeScreen from './screens/HomeScreen';
import GarmentScreen from './screens/GarmentScreen';
import ResultScreen from './screens/ResultScreen';

// Create the stack navigator
const Stack = createNativeStackNavigator();

/**
 * Navigation Stack
 * Defines the screen flow and configurations
 */
function NavigationStack() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // Smooth screen transitions
          animation: 'slide_from_right',
        }}
      >
        {/* Home Screen - User uploads/takes photo */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Virtual Try-On',
            headerBackVisible: false,
          }}
        />

        {/* Garment Screen - User selects garment to try on */}
        <Stack.Screen
          name="Garment"
          component={GarmentScreen}
          options={{
            title: 'Select Garment',
          }}
        />

        {/* Result Screen - Shows AI-generated try-on result */}
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: 'Your Try-On Result',
            // Prevent going back during processing
            headerBackVisible: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Main App Export
 * Wrapped in ErrorBoundary for crash protection
 */
export default function App() {
  return (
    <ErrorBoundary>
      <NavigationStack />
    </ErrorBoundary>
  );
}
