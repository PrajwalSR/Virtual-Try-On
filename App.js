import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './screens/HomeScreen';
import GarmentScreen from './screens/GarmentScreen';
import ResultScreen from './screens/ResultScreen';

// Create the stack navigator
const Stack = createNativeStackNavigator();

/**
 * Main App Component
 * Sets up the navigation structure for the Virtual Try-On app
 * Flow: Home -> Garment Selection -> Try-On Result
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Home Screen - User uploads/takes photo */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Virtual Try-On' }}
        />

        {/* Garment Screen - User selects garment to try on */}
        <Stack.Screen
          name="Garment"
          component={GarmentScreen}
          options={{ title: 'Select Garment' }}
        />

        {/* Result Screen - Shows AI-generated try-on result */}
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Your Try-On Result' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
