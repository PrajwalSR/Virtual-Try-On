import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in the component tree and displays
 * a friendly error screen instead of crashing the app with a white screen.
 *
 * This provides a better user experience and allows graceful error recovery.
 *
 * Usage:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Log error details for debugging
   */
  componentDidCatch(error, errorInfo) {
    // Log error to console for development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Store error details in state
    this.setState({
      error,
      errorInfo,
    });

    // TODO: In production, send error to logging service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  /**
   * Reset error state
   * Note: In production, you could reload the app using expo-updates
   */
  handleRestart = () => {
    // Reset state - this will re-render the app
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Render error screen
   */
  renderErrorScreen() {
    const { error, errorInfo } = this.state;
    const isDevelopment = __DEV__;

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Error Icon */}
          <Text style={styles.errorIcon}>⚠️</Text>

          {/* Error Title */}
          <Text style={styles.title}>Oops! Something went wrong</Text>

          {/* User-friendly message */}
          <Text style={styles.message}>
            The app encountered an unexpected error. Don't worry, your data is
            safe. Please restart the app to continue.
          </Text>

          {/* Restart Button */}
          <TouchableOpacity
            style={styles.restartButton}
            onPress={this.handleRestart}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>🔄 Restart App</Text>
          </TouchableOpacity>

          {/* Development-only error details */}
          {isDevelopment && error && (
            <View style={styles.debugSection}>
              <Text style={styles.debugTitle}>Debug Information</Text>
              <Text style={styles.debugSubtitle}>
                (Visible in development only)
              </Text>

              <View style={styles.errorDetails}>
                <Text style={styles.errorName}>Error:</Text>
                <Text style={styles.errorText}>{error.toString()}</Text>

                {errorInfo && errorInfo.componentStack && (
                  <>
                    <Text style={styles.errorName}>Component Stack:</Text>
                    <Text style={styles.errorStack}>
                      {errorInfo.componentStack}
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}

          {/* Help Text */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Need help?</Text>
            <Text style={styles.helpText}>
              • Try restarting the app{'\n'}
              • Make sure you have a stable internet connection{'\n'}
              • Update to the latest version{'\n'}
              • Contact support if the problem persists
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderErrorScreen();
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  debugSection: {
    marginTop: 40,
    width: '100%',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  debugSubtitle: {
    fontSize: 12,
    color: '#991b1b',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  errorDetails: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  errorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: '#dc2626',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  errorStack: {
    fontSize: 11,
    color: '#6b7280',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  helpSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    width: '100%',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
});

export default ErrorBoundary;
