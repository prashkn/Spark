import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import { MyProjects } from '../screens/MyProjects';
import Projects from '../screens/Projects';
import { MIDNIGHT_GREEN } from '../styles/palette';
import HomeAndPost from './HomeAndPost';
import ProfileAndSettings from './ProfileAndSettings';
import { MyApplications } from '../screens/MyApplications';

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused }) => {
          let iconName;

          // Display icons based on which screen is focused
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'My Brainstorms') {
            iconName = focused ? 'documents' : 'documents-outline';
          } else if (route.name === 'My Applications') {
            iconName = focused ? 'albums' : 'albums-outline'
          }

          return <Icon name={iconName} size={30} color={MIDNIGHT_GREEN} />;
        },

        // Hide labels
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeAndPost} />
      <Tab.Screen name="My Brainstorms" component={MyProjects} />
      <Tab.Screen name="My Applications" component={MyApplications} />

      {/* Use nested navigator to display profile and settings sub-pages */}
      <Tab.Screen name="Profile" component={ProfileAndSettings} />
    </Tab.Navigator>
  );
}
