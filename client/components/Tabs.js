import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import { MyProjects } from '../screens/MyProjects';
import Projects from '../screens/Projects';
import { MIDNIGHT_GREEN } from '../styles/palette';
import HomeAndPost from './HomeAndPost';
import ProfileAndSettings from './ProfileAndSettings';

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let iconName;

          // Display icons based on which screen is focused
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile/Settings') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'My Brainstorms') {
            iconName = focused ? 'documents' : 'documents-outline';
          }

          return <Icon name={iconName} size={30} color={MIDNIGHT_GREEN} />;
        },

        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Feed" component={HomeAndPost} />
      <Tab.Screen name="My Brainstorms" component={MyProjects} />

      {/* Use nested navigator to display profile and settings sub-pages */}
      <Tab.Screen name="Profile/Settings" component={ProfileAndSettings} />
    </Tab.Navigator>
  );
}
