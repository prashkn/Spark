import { HeaderBackButton } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../screens/Profile/Profile';
import About from '../screens/Settings/About';
import AccountInformation from '../screens/Settings/AccountInformation';
import Help from '../screens/Settings/Help';
import Security from '../screens/Settings/Security';
import Settings from '../screens/Settings/Settings';
import { MIDNIGHT_GREEN } from '../styles/palette';

export default function ProfileAndSettings() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          color: MIDNIGHT_GREEN,
        },

        // Make header back button green
        headerLeft: () => (
          <HeaderBackButton
            tintColor={MIDNIGHT_GREEN}
            onPress={navigation.goBack}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Profile Page"
        component={Profile}
        options={{
          // Hide header on profile page
          headerShown: false,
        }}
        screenOptions={{ title: 'Profile' }}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Account Information" component={AccountInformation} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
