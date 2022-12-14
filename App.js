import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { LogBox, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [AppIsLoaded, setAppIsLoaded] = useState(false);
  useEffect(() => {
    //Load fonts
    const prepare = async () => {
      try {
        await Font.loadAsync({
          'Black': require('./assets/fonts/Roboto-Black.ttf'),
          'blackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
          'bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'boldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
          'italic': require('./assets/fonts/Roboto-Italic.ttf'),
          'light': require('./assets/fonts/Roboto-Light.ttf'),
          'lightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
          'medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'mediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
          'regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'thin': require('./assets/fonts/Roboto-Thin.ttf'),
          'thinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
          'seemzygram': require('./assets/fonts/FugazOne-Regular.ttf'),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);
  const onlayout = useCallback(async () => {
    if (AppIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [AppIsLoaded]);

  if (!AppIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container} onLayout={onlayout}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
