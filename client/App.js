import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import React, { useEffect, useMemo, useState } from 'react';
import Tabs from './components/Tabs';
import Login from './screens/Login';
import poppinsFontMapping from './styles/poppins-font-mapping';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Image, View } from 'react-native';
import SignUp from './components/SignUp';
import { getUserInfoFromDatabase, UserContext } from './components/UserContext';
import { Text } from 'react-native';
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
      Login: 'login',
      // YourBasicInformation: 'createaccount',
      // SignUp: 'signup-old',
      SignUpRoot: {
        path: 'signup',
        screens: {
          YourBasicInformation: '',
          YourBackground: 'your-background',
        },
      },
      Root: {
        path: '',
        screens: {
          Home: { path: '', screens: { 'Home Page': '' } },
          'My Brainstorms': {
            path: 'brainstorms',
            screens: { Projects: 'projects' },
          },
          'My Applications': {path: 'applications', screens: {Applications: ''}},
          Profile: {
            path: 'profile',
            screens: { "Profile Page": '', Settings: 'settings' },
          },
        },
      },
    },
  },
};

const Stack = createNativeStackNavigator();
import { ToastProvider } from 'react-native-toast-notifications';
import { POLISHED_PINE } from './styles/palette';

export default function App() {
  const [fontsLoaded] = useFonts(poppinsFontMapping);
  const [firebaseUser, setFirebaseUser] = useState(undefined);

  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  const userContextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      getUserInfoFromDatabase(user)
        .then((userFromDatabase) => {
          setUser(userFromDatabase);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  // Wait for fonts to load
  if (!fontsLoaded || firebaseUser === undefined) {
    // TODO: Make splash screen for when user is being restored
    return null;
  }

  return (
    <ToastProvider offsetTop={50} successColor={POLISHED_PINE}>
      <UserContext.Provider value={userContextValue}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Group screenOptions={{ headerShown: false }}> */}
            {firebaseUser === null ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    title: 'Login',
                    // When logging out, a pop animation feels intuitive
                    // You can remove this if you want the default 'push' animation
                    animationTypeForReplace:
                      firebaseUser === null ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="SignUpRoot"
                  component={SignUp}
                ></Stack.Screen>
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
      </UserContext.Provider>
    </ToastProvider>
  );
}
