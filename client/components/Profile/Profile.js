import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileInfoBox from './components/ProfileInfoBox';
import poppinsFontMapping from './poppins-font-mapping';
import styles from './components/Profile/profile-styles';
import { BLOND, MIDNIGHT_GREEN } from './styles/palette';

export default function Profile() {
  const [fontsLoaded] = useFonts(poppinsFontMapping);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Top bar area */}
      <View style={styles.topBar}>
        <Button
          color={MIDNIGHT_GREEN}
          radius={10}
          icon={<Icon name="gear" size={30} color={BLOND} />}
          // TODO: Link to settings page with navigation
        />
      </View>

      <ScrollView style={styles.safeContainer}>
        {/* User info container with pic, name, username, and location */}
        <View style={styles.userInfoContainer}>
          {/* Profile pic */}
          <Image
            source={require('./assets/george-washington.jpg')}
            style={styles.profilePic}
          />

          {/* Sub-container with name, username, and location */}
          <View style={styles.userInfoTextArea}>
            <Text style={styles.name}>George Washington</Text>
            <Text style={styles.poppinsSmall}>@george</Text>

            {/* Container for location pin and location name */}
            <View style={styles.locationContainer}>
              <Icon
                name="map-marker"
                size={30}
                color={MIDNIGHT_GREEN}
                style={styles.locationPin}
              ></Icon>
              <Text style={styles.poppinsSmall}>Mount Vernon, Virginia</Text>
            </View>
          </View>
        </View>
        {[
          {
            header: 'About me',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in est ex. Nulla lacinia tortor sed ultrices vulputate. Mauris at mi nisi. Integer lobortis, diam et accumsan feugiat, lacus orci tempus felis, id iaculis nunc nulla ut nisi. Nunc eget enim sem. ',
          },
          {
            header: 'Skills',
            content:
              'Nulla vehicula ex ut ipsum ornare lobortis. Cras ac consectetur neque, sed malesuada felis. Sed eget quam pretium, viverra sem in, facilisis tellus. Curabitur molestie est bibendum pellentesque imperdiet.',
          },
          {
            header: 'Experience',
            content:
              'Donec in ligula eros. Quisque pulvinar lorem quam, sagittis sollicitudin felis mollis quis. Donec auctor urna quis eleifend varius. In hac habitasse platea dictumst. Vivamus aliquet augue libero, in luctus justo volutpat sed. Nam tristique sapien quis congue vestibulum. Ut id aliquet nisl. Duis congue turpis eget mauris condimentum, sed varius augue faucibus. Vivamus molestie magna in eros blandit, in lobortis libero varius. Nam ut gravida ex. Aenean vulputate, lorem in bibendum mollis, sem erat vestibulum metus, eget condimentum tortor lectus non orci. Vestibulum quis molestie mi, sed porttitor erat. Sed pulvinar mollis magna id laoreet. Donec quis felis dui. Nam aliquet egestas commodo. Phasellus rutrum arcu non massa lobortis, quis fermentum quam dignissim. Maecenas commodo viverra mauris et gravida. Donec nisi orci, egestas sed auctor in, consectetur vel dui. Nulla facilisi.',
          },
        ].map((profileInfoBox, i) => (
          <ProfileInfoBox
            key={i}
            header={profileInfoBox.header}
            style={styles.profileInfoBox}
          >
            {profileInfoBox.content}
          </ProfileInfoBox>
        ))}
        <StatusBar style="dark" />
      </ScrollView>
    </SafeAreaView>
  );
}
