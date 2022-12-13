import { Button } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../components/UserContext';
import { BLOND, GAINSBORO, MIDNIGHT_GREEN } from '../../styles/palette';
import styles from './Profile-styles';
import ProfileInfoBox from './ProfileInfoBox';
import UserAvatar from 'react-native-user-avatar';

export default function Profile({ navigation }) {
  const { user } = useContext(UserContext);

  // Ensure user is loaded
  if (user === null) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top bar area */}
        <View style={styles.topBar}>
          <Button
            color={MIDNIGHT_GREEN}
            radius={10}
            icon={<Icon name="gear" size={30} color={BLOND} />}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        {/* <Text>{JSON.stringify(user)}</Text> */}
        {/* User info container with pic, name, username, and location */}
        <View style={styles.userInfoContainer}>
          {/* Profile pic */}
          {/*
          <Image
            source={require('../../assets/george-washington.jpg')}
            style={styles.profilePic}
  />*/}
          <UserAvatar
            style={{ width: 100, height: 100, borderRadius: 50 }}
            size={50}
            name={user.name || 'John Doe'}
          />

          {/* Sub-container with name, username, and location */}

          <View style={styles.userInfoTextArea}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.poppinsSmall}>@{user.username}</Text>

            {/* Container for location pin and location name */}
            {user.location !== undefined && (
              <View style={styles.locationContainer}>
                <Icon
                  name="map-marker"
                  size={30}
                  color={MIDNIGHT_GREEN}
                  style={styles.locationPin}
                ></Icon>
                <Text style={styles.poppinsSmall}>{user.location}</Text>
              </View>
            )}
          </View>
        </View>
        {[
          {
            header: 'About me',
            content: (
              <Text style={[styles.text, styles.boxContentText]}>
                {user.bio}
              </Text>
            ) /* 'OWEN Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in est ex. Nulla lacinia tortor sed ultrices vulputate. Mauris at mi nisi. Integer lobortis, diam et accumsan feugiat, lacus orci tempus felis, id iaculis nunc nulla ut nisi. Nunc eget enim sem. ', */,
          },
          {
            header: 'Skills',
            content: (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {user.skills === undefined || user.skills.length === 0 ? (
                  <Text style={[styles.text, styles.boxContentText]}>
                    I'm a beginner!
                  </Text>
                ) : (
                  user.skills.map((skill, i) => (
                    <View
                      key={i}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        backgroundColor: GAINSBORO,
                        borderRadius: 8,
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={[
                          styles.text,
                          styles.boxContentText,

                          { fontFamily: 'Poppins-Medium' },
                        ]}
                      >
                        {skill}
                      </Text>
                    </View>
                  ))
                )}
                {/* <Text>{JSON.stringify(user.skills)}</Text> */}
                {/* <View style={{backgroundColor: 'blue'}}>
                {user.skills === undefined || user.skills.length === 0 ? (
                  <Text>nothing yet</Text>
                ) : (
                  user.skills.map((skill) => {
                    <View style={{ backgroundColor: 'red' }}>
                      <Text>{skill}</Text>
                    </View>;
                  })
                )}
              </View> */}
              </View>
            ),
            // 'Nulla vehicula ex ut ipsum ornare lobortis. Cras ac consectetur neque, sed malesuada felis. Sed eget quam pretium, viverra sem in, facilisis tellus. Curabitur molestie est bibendum pellentesque imperdiet.',
          },
          {
            header: 'Experience',
            content: (
              <Text style={[styles.text, styles.boxContentText]}>
                {user.experience}
              </Text>
            ),

            //'Donec in ligula eros. Quisque pulvinar lorem quam, sagittis sollicitudin felis mollis quis. Donec auctor urna quis eleifend varius. In hac habitasse platea dictumst. Vivamus aliquet augue libero, in luctus justo volutpat sed. Nam tristique sapien quis congue vestibulum. Ut id aliquet nisl. Duis congue turpis eget mauris condimentum, sed varius augue faucibus. Vivamus molestie magna in eros blandit, in lobortis libero varius. Nam ut gravida ex. Aenean vulputate, lorem in bibendum mollis, sem erat vestibulum metus, eget condimentum tortor lectus non orci. Vestibulum quis molestie mi, sed porttitor erat. Sed pulvinar mollis magna id laoreet. Donec quis felis dui. Nam aliquet egestas commodo. Phasellus rutrum arcu non massa lobortis, quis fermentum quam dignissim. Maecenas commodo viverra mauris et gravida. Donec nisi orci, egestas sed auctor in, consectetur vel dui. Nulla facilisi.',
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
