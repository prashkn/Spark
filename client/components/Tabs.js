import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import YourBasicInformation from '../screens/YourBasicInformation';
import Login from '../screens/Login';
import Projects from '../screens/Projects';
import { MIDNIGHT_GREEN } from '../styles/palette';
import HomeAndPost from './HomeAndPost';
import ProfileAndSettings from './ProfileAndSettings';
import YourBackground from '../screens/YourBackground';
import { UserContext } from './UserContext';

const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let iconName;

          // Display icons based on which screen is focused
          if (route.name === 'Home/Create') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile/Settings') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'documents' : 'documents-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'enter' : 'enter-outline';
          }

          return <Icon name={iconName} size={30} color={MIDNIGHT_GREEN} />;
        },

        // Hide labels
        tabBarShowLabel: false,
      })}
    >
      {/* <Tab.Screen name="Login" component={YourBasicInformation} /> */}
      <Tab.Screen
        name="Home/Create"
        component={HomeAndPost}
        screenOptions={{ title: 'Home' }}
      />
      <Tab.Screen name="Projects" component={Projects} />

      {/* Use nested navigator to display profile and settings sub-pages */}
      <Tab.Screen
        name="Profile/Settings"
        component={ProfileAndSettings}

      />
    </Tab.Navigator>
  );
}
