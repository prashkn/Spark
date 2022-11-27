import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';
import poppinsFontMapping from './styles/poppins-font-mapping';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts(poppinsFontMapping);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
