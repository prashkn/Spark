import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CreatePost from '../screens/CreatePost';
import { MIDNIGHT_GREEN, MUSTARD } from '../styles/palette';
import { HeaderBackButton } from '@react-navigation/elements';

export default function HomeAndPost() {
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
        name="Home Page"
        component={Home}
        options={{
          // Hide header on profile page
          headerShown: false,
        }}
      />
      <Stack.Screen name="Create a Brainstorm" component={CreatePost} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: MUSTARD,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 30,
  },
});
