import React, { useEffect, useState, useContext } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Project from '../components/Project';
import { BLOND, MIDNIGHT_GREEN } from '../styles/palette';
import { Skeleton } from '@rneui/themed';
import { BASE_URL } from '../data/util';
import { UserContext } from '../components/UserContext';

export const Applications = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const NUM_OF_SKELETONS = 7;
  const { user } = useContext(UserContext);

  const getApplications = async (id) => {
    //! get applications
    try {
      const info = await fetch(`${BASE_URL}/users/applications?userId=${id}`);
      const result = await info.json();
      if (result.data.length === 0) {
        setApplications([]);
      } else {
        setApplications(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const skeletons = [];
  for (let i = 0; i < NUM_OF_SKELETONS; i++) {
    skeletons.push(
      <View style={styles.applications} key={i}>
        <View style={styles.card}>
          <Skeleton animation="wave" width={345} height={90} />
        </View>
      </View>
    );
  }

  useEffect(() => {
    getApplications(user._id);
  }, []);

  navigation.addListener('focus', () => {
    // reset marker state
    getApplications(user._id);
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: BLOND,
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>My Applications</Text>
        {applications.length === 0 ? (
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text
              style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular' }}
            >
              You have not applied to any projects.
            </Text>
          </View>
        ) : (
          <View style={styles.applications}>
            {!applications
              ? skeletons
              : applications.map((app, i) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Details', {
                        id: app.projectId,
                        fromApps: true,
                      })
                    }
                    key={i}
                  >
                    <Project
                      projectId={app.projectId}
                      status={applications[i].status}
                    />
                  </Pressable>
                ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLOND,
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: MIDNIGHT_GREEN,
  },
  applications: {
    alignItems: 'center',
    display: 'flex',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    shadowOffset: { width: 3, height: 4 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
