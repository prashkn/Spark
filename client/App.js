import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';
import poppinsFontMapping from './styles/poppins-font-mapping';
import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications';
import { POLISHED_PINE } from './styles/palette';

export default function App() {
  const [fontsLoaded] = useFonts(poppinsFontMapping);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider offsetTop={50} successColor={POLISHED_PINE}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ToastProvider>
  );
}
