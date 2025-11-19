import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';

/**
 * LoadingSpinner Component
 * Reusable animated loading indicator for API calls and processing states
 *
 * Features:
 * - Smooth fade-in animation
 * - Customizable message and size
 * - Pulsing text effect
 * - Conditional visibility
 *
 * @param {string} message - Message to display below spinner
 * @param {string} size - Spinner size: 'small' or 'large' (default: 'large')
 * @param {boolean} visible - Controls visibility (default: true)
 * @param {string} color - Spinner color (default: '#6366f1')
 */
const LoadingSpinner = ({
  message = 'Processing...',
  size = 'large',
  visible = true,
  color = '#6366f1',
}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Pulsing text animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim, pulseAnim]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={size} color={color} />
      </View>

      {message && (
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}

      {/* Loading dots animation */}
      <View style={styles.dotsContainer}>
        <LoadingDots />
      </View>
    </Animated.View>
  );
};

/**
 * LoadingDots Component
 * Animated dots that pulse in sequence
 */
const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDotAnimation = (dotValue, delay) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dotValue, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(dotValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.parallel([
        createDotAnimation(dot1, 0),
        createDotAnimation(dot2, 200),
        createDotAnimation(dot3, 400),
      ])
    ).start();
  }, [dot1, dot2, dot3]);

  const DotStyle = (animValue) => ({
    opacity: animValue,
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
  });

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, DotStyle(dot1)]} />
      <Animated.View style={[styles.dot, DotStyle(dot2)]} />
      <Animated.View style={[styles.dot, DotStyle(dot3)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  spinnerContainer: {
    marginBottom: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  dotsContainer: {
    marginTop: 12,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
    marginHorizontal: 4,
  },
});

export default LoadingSpinner;
