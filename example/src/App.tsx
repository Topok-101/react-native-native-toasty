import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import NativeToasty from '../../src';

const ToastExample = () => {
  // 1. Normal case - Show all toast types (info, success, warn, error, normal)
  const showNormalToast = () => {
    NativeToasty.Normal({
      title: 'Normal toast - This is a standard notification',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  const showInfoToast = () => {
    NativeToasty.Info({
      title: 'Info toast - Here is some information for you',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  const showSuccessToast = () => {
    NativeToasty.Success({
      title: 'Success toast - Operation completed successfully!',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  const showWarnToast = () => {
    NativeToasty.Warn({
      title: 'Warning toast - Please pay attention to this',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  const showErrorToast = () => {
    NativeToasty.Error({
      title: 'Error toast - Something went wrong!',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  // 2. Position examples
  const showTopPosition = () => {
    NativeToasty.Info({
      title: 'Top position toast',
      position: 'top',
      duration: 3000,
      withIcon: true,
    });
  };

  const showCenterPosition = () => {
    NativeToasty.Success({
      title: 'Center position toast',
      position: 'center',
      duration: 3000,
      withIcon: true,
    });
  };

  const showBottomPosition = () => {
    NativeToasty.Warn({
      title: 'Bottom position toast',
      position: 'bottom',
      duration: 3000,
      withIcon: true,
    });
  };

  // 3. Long text examples
  const showLongText = () => {
    NativeToasty.Error({
      title:
        'This is a very long toast message that should wrap to multiple lines and demonstrate how the toast handles longer content gracefully with proper text wrapping',
      position: 'center',
      duration: 5000,
      withIcon: true,
    });
  };

  const showVeryLongText = () => {
    NativeToasty.Show({
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      position: 'bottom',
      duration: 6000,
      withIcon: false,
    });
  };

  // Custom color examples
  const showCustomColors = () => {
    NativeToasty.Show({
      title: 'Custom purple background toast',
      position: 'top',
      duration: 3000,
      withIcon: true,
      tintColor: '#8e44ad',
      textColor: '#ffffff',
    });

    NativeToasty.Show({
      title: 'Custom dark theme toast',
      position: 'center',
      duration: 3000,
      withIcon: true,
      tintColor: '#2c3e50',
      textColor: '#ecf0f1',
    });

    NativeToasty.Show({
      title: 'Custom bright theme toast',
      position: 'bottom',
      duration: 3000,
      withIcon: true,
      tintColor: '#e74c3c',
      textColor: '#ffffff',
    });
  };

  // Custom font family examples
  const showCustomFonts = () => {
    NativeToasty.Show({
      title: `Custom font: ${Platform.OS === 'ios' ? 'Helvetica Neue Bold' : 'monospace'}`,
      position: 'top',
      duration: 3000,
      withIcon: true,
      fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'monospace',
    });

    NativeToasty.Show({
      title: `Custom font: ${Platform.OS === 'ios' ? ' Georgia Italic' : 'sans-serif-thin'}`,
      position: 'center',
      duration: Platform.OS === 'ios' ? 3000 : 5000,
      withIcon: true,
      fontFamily: Platform.OS === 'ios' ? 'Georgia-Italic' : 'sans-serif-thin',
    });

    NativeToasty.Show({
      title: `Custom font: ${Platform.OS === 'ios' ? ' CourierNewPSMT' : 'sans-serif-smallcaps'}`,
      position: 'bottom',
      duration: Platform.OS === 'ios' ? 3000 : 8000,
      withIcon: true,
      fontFamily:
        Platform.OS === 'ios' ? 'CourierNewPSMT' : 'sans-serif-smallcaps',
    });
  };

  // Combined custom styling
  const showCustomStyling = () => {
    NativeToasty.Show({
      title: 'Fully customized toast with custom color, font and styling',
      position: 'center',
      duration: 4000,
      withIcon: true,
      tintColor: '#34495e',
      textColor: '#f39c12',
      fontFamily: 'HelveticaNeue-Light',
    });
  };

  // Duration examples
  const showDifferentDurations = () => {
    NativeToasty.Info({
      title: 'Quick toast (1 second)',
      position: 'top',
      duration: 1000,
      withIcon: true,
    });

    NativeToasty.Success({
      title: 'Medium toast (5 seconds)',
      position: 'center',
      duration: 5000,
      withIcon: true,
    });

    NativeToasty.Warn({
      title: 'Long toast (8 seconds)',
      position: 'bottom',
      duration: 8000,
      withIcon: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🍞 Native Toasty Examples</Text>

        {/* 1. Individual toast types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Toast Types</Text>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={showNormalToast}
          >
            <Text style={styles.buttonText}>📱 Normal Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfoToast}
          >
            <Text style={styles.buttonText}>ℹ️ Info Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccessToast}
          >
            <Text style={styles.buttonText}>✅ Success Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.warnButton]}
            onPress={showWarnToast}
          >
            <Text style={styles.buttonText}>⚠️ Warning Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showErrorToast}
          >
            <Text style={styles.buttonText}>❌ Error Toast</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Position examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Different Positions</Text>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showTopPosition}
          >
            <Text style={styles.buttonText}>⬆️ Top Position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showCenterPosition}
          >
            <Text style={styles.buttonText}>🎯 Center Position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.warnButton]}
            onPress={showBottomPosition}
          >
            <Text style={styles.buttonText}>⬇️ Bottom Position</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Long text examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Long Text Examples</Text>
          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showLongText}
          >
            <Text style={styles.buttonText}>📝 Long Text Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showVeryLongText}
          >
            <Text style={styles.buttonText}>📄 Very Long Text Toast</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Custom Colors</Text>
          <TouchableOpacity
            style={[styles.button, styles.purpleButton]}
            onPress={showCustomColors}
          >
            <Text style={styles.buttonText}>🌈 Custom Color Themes</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Fonts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔤 Custom Fonts</Text>
          <TouchableOpacity
            style={[styles.button, styles.fontButton]}
            onPress={showCustomFonts}
          >
            <Text style={styles.buttonText}>✍️ Different Font Families</Text>
          </TouchableOpacity>
        </View>

        {/* Combined Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Combined Custom Styling</Text>
          <TouchableOpacity
            style={[styles.button, styles.combinedButton]}
            onPress={showCustomStyling}
          >
            <Text style={styles.buttonText}>✨ Fully Customized Toast</Text>
          </TouchableOpacity>
        </View>

        {/* Duration examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Different Durations</Text>
          <TouchableOpacity
            style={[styles.button, styles.durationButton]}
            onPress={showDifferentDurations}
          >
            <Text style={styles.buttonText}>⏰ Various Timeout Examples</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2c3e50',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  infoButton: {
    backgroundColor: '#5dade2',
  },
  successButton: {
    backgroundColor: '#58d68d',
  },
  warnButton: {
    backgroundColor: '#f7dc6f',
  },
  errorButton: {
    backgroundColor: '#ec7063',
  },
  customButton: {
    backgroundColor: '#af7ac5',
  },
  purpleButton: {
    backgroundColor: '#8e44ad',
  },
  fontButton: {
    backgroundColor: '#16a085',
  },
  combinedButton: {
    backgroundColor: '#e67e22',
  },
  durationButton: {
    backgroundColor: '#f39c12',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '600',
  },
});

export default ToastExample;
