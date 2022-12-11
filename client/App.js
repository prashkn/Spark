import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';
import poppinsFontMapping from './styles/poppins-font-mapping';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import YourBasicInformation from './screens/YourBasicInformation';
import YourBackground from './screens/YourBackground';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignUp from './components/SignUp';
import { MIDNIGHT_GREEN } from './styles/palette';
import { Text, View } from 'react-native';
import ProgressBar from './components/ProgressBar';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAGt1fZpD6-mds5S_pEOfkutEQfbp2a8ZE',
  authDomain: 'cs409-spark.firebaseapp.com',
  projectId: 'cs409-spark',
  storageBucket: 'cs409-spark.appspot.com',
  messagingSenderId: '289070585655',
  appId: '1:289070585655:web:36a0d613f0fd0eeeafacb2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: '',
      // YourBasicInformation: 'createaccount',
      // SignUp: 'signup-old',
      SignUpRoot: {
        path: 'signup',
        screens: {
          YourBasicInformation: 'basic-info',
          YourBackground: 'background',
        },
      },
      // YourBackground: 'your-background',
      Root: 'root',
    },
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(poppinsFontMapping);
  const [user, setUser] = useState(null);

  if (!fontsLoaded) {
    return null;
  }

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    console.log('user state changed');
    console.log(user);
    setUser(user);
  });

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Group screenOptions={{ headerShown: false }}> */}
        {user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: 'Login',
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: user === null ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="SignUpRoot" component={SignUp}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Root" component={Tabs} />
          </>
        )}
        {/* <Tabs /> */}
        {/* </Stack.Group> */}
      </Stack.Navigator>
      {/* <Stack.Group></Stack.Group> */}
    </NavigationContainer>
  );
}
