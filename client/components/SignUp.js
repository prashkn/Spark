import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useMemo, useState } from 'react';
import { Text } from 'react-native';
import YourBackground from '../screens/YourBackground';
import YourBasicInformation from '../screens/YourBasicInformation';
import { MIDNIGHT_GREEN } from '../styles/palette';
import { NewUserInfoContext } from './NewUserInfoContext';

// let newUserInfo = {};


const Stack = createNativeStackNavigator();

export default function SignUp() {
  const [newUserInfo, setNewUserInfo] = useState({});

  const value = useMemo(
    () => ({
      newUserInfo,
      setNewUserInfo,
    }),
    [newUserInfo]
  );

  return (
    <NewUserInfoContext.Provider value={value}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: MIDNIGHT_GREEN,
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="YourBasicInformation"
          component={YourBasicInformation}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="YourBackground"
          component={YourBackground}
          options={{ title: 'Sign Up' }}
        />
      </Stack.Navigator>
    </NewUserInfoContext.Provider>
  );
}
