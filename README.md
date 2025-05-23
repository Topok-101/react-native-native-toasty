# react-native-native-toasty

🍞 Native toast notifications for React Native with better performance

![Platform - Android iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg)
[![npm version](https://badge.fury.io/js/react-native-native-toasty.svg)](https://badge.fury.io/js/react-native-native-toasty)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📱 Screenshots

| Android | Ios   |
|---------|-------|
| ![Alt Text](./screenshots/android.gif) | ![Alt Text](./screenshots/ios.gif) |

## ✨ Features

- 🚀 **Native Performance** - Built with native modules for optimal toast performance
- 🎨 **Customizable Design** - Modern toast notifications with flexible styling options
- 📱 **Cross Platform** - Works seamlessly on iOS and Android
- ⚡ **Lightweight** - Minimal footprint with no external dependencies
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🛠️ **Easy to Use** - Simple API with sensible defaults

## 📦 Installation

```bash
npm install react-native-native-toasty
```

or

```bash
yarn add react-native-native-toasty
```

### iOS Setup

```bash
cd ios && pod install
```

## 🚀 Usage

### Basic Usage

```typescript
import NativeToasty from 'react-native-native-toasty';

// Show a simple toast
NativeToasty.Show({
  title: 'Hello World!',
});
```

### Toast Types

```typescript
// Success toast
NativeToasty.Success({
  title: 'Task completed successfully!',
});

// Error toast
NativeToasty.Error({
  title: 'Something went wrong!',
});

// Warning toast
NativeToasty.Warn({
  title: 'Please check your input',
});

// Info toast
NativeToasty.Info({
  title: 'New update available',
});

// Normal toast
NativeToasty.Normal({
  title: 'Regular notification',
});
```

### Advanced Customization

```typescript
NativeToasty.Show({
  title: 'Custom Toast',
  position: 'top',                    // 'top' | 'center' | 'bottom'
  duration: 4000,                     // Duration in milliseconds
  withIcon: true,                     // Show/hide icon
  tintColor: '#FF6B6B',              // Custom background color
  textColor: '#FFFFFF',              // Custom text color
  fontFamily: 'System',              // Custom font family
});
```

## 📱 Platform Behavior

### Toast Queue Behavior

The toast notification system behaves differently on each platform due to their native implementations:

#### iOS Behavior
- **Multiple toasts**: iOS can display multiple toast notifications simultaneously
- **Stacking**: New toasts will stack on top of or below existing ones (depending on position)
- **Independent timing**: Each toast has its own timer and dismisses independently
- **Tap to dismiss**: Tapping on a toast will immediately dismiss it

```typescript
// On iOS, both toasts will be visible at the same time
NativeToasty.Success({ title: 'First toast' });
NativeToasty.Info({ title: 'Second toast' });
```

#### Android Behavior
- **Queue system**: Android displays toasts one at a time in a queue
- **Sequential display**: New toasts wait for the current one to finish before showing
- **Automatic queuing**: The system handles the queue internally
- **No tap to dismiss**: Android Toast API doesn't support touch events (system limitation)

```typescript
// On Android, the second toast will show after the first one disappears
NativeToasty.Success({ title: 'First toast' });
NativeToasty.Info({ title: 'Second toast' });
```

> **Note**: Android's native Toast API doesn't support onClick listeners or any touch interactions. Toasts are non-interactive system windows that never receive focus. This is a fundamental limitation of Android's Toast system, not this library.

### Best Practices

To ensure a consistent user experience across platforms:

1. **Avoid toast spam**: Don't trigger multiple toasts in rapid succession
2. **Use appropriate durations**: Keep messages brief with shorter durations
3. **Consider the context**: Use toast types (success, error, etc.) appropriately
4. **Test on both platforms**: Always verify the behavior on both iOS and Android
5. **Don't rely on tap-to-dismiss**: Since Android doesn't support it, ensure your toasts auto-dismiss with reasonable durations

## 📚 API Reference

### `ToastOptions`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | **Required** | The message to display |
| `position` | `'top' \| 'center' \| 'bottom'` | `'bottom'` | Position of the toast |
| `duration` | `number` | `3000` | Duration in milliseconds |
| `withIcon` | `boolean` | `true` | Whether to show an icon |
| `tintColor` | `string` | Auto | Custom background color (hex) |
| `textColor` | `string` | `'#FFFFFF'` | Custom text color (hex) |
| `fontFamily` | `string` | System | Custom font family |

### Methods

#### `NativeToasty.Show(options: ToastOptions)`
Shows a custom toast with your specified styling.

#### `NativeToasty.Success(options: ToastOptions)`
Shows a green success toast with checkmark icon.

#### `NativeToasty.Error(options: ToastOptions)`
Shows a red error toast with alert icon.

#### `NativeToasty.Warn(options: ToastOptions)`
Shows an orange warning toast with warning icon.

#### `NativeToasty.Info(options: ToastOptions)`
Shows a blue info toast with info icon.

#### `NativeToasty.Normal(options: ToastOptions)`
Shows a gray normal toast with default icon.

## 🎨 Styling

### Default Colors

- **Success**: `#4CAF50` (Green)
- **Error**: `#F44336` (Red)  
- **Warning**: `#FF9800` (Orange)
- **Info**: `#2196F3` (Blue)
- **Normal**: `#757575` (Gray)

### Custom Colors

You can override any color using the `tintColor` property:

```typescript
NativeToasty.Success({
  title: 'Custom green!',
  tintColor: '#00C851',
  textColor: '#FFFFFF',
});
```

## 🏃‍♂️ Example

Check out the [example app](./example) for a complete implementation:

```bash
git clone https://github.com/Topok-101/react-native-native-toasty.git
cd react-native-native-toasty/example
yarn install
cd ios && pod install && cd ..
yarn ios # or yarn android
```

## 🔧 Requirements

- React Native >= 0.68
- iOS >= 11.0
- Android >= API 21

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**topok101** - [GitHub](https://github.com/Topok-101)

## 🙏 Acknowledgments

- Built with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
- Inspired by [react-native-toasty](https://github.com/prscX/react-native-toasty)
- Thanks to the React Native community

---

Made with ❤️ by [topok101](https://github.com/Topok-101)