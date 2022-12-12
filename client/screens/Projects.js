import React, { useContext, useEffect, useState } from 'react';
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

export default function Projects({ navigation }) {
  const [projectIds, setProjectIds] = useState([]);
  const {user} = useContext(UserContext)
  const NUM_OF_SKELETONS = 7;

  const getProjects = async (id) => {
    try {
      const info = await fetch(
        `${BASE_URL}/projects/createdprojects?userId=${id}`
      );
      const result = await info.json();
      const ids = [];
      if (result.data.length === 0) {
        setProjectIds([]);
      } else {
        for (let i = 0; i < result.data.length; i++) {
          ids.push(result.data[i]._id);
        }
        setProjectIds(ids);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const skeletons = [];
  for (let i = 0; i < NUM_OF_SKELETONS; i++) {
    skeletons.push(
      <View style={styles.projects} key={i}>
        <View style={styles.card}>
          <Skeleton animation="wave" width={345} height={90} />
        </View>
      </View>
    );
  }

  useEffect(() => {
    getProjects(user._id);
  }, []);
  
  navigation.addListener('focus', () => {
    // reset marker state
    getProjects(user._id);
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: BLOND,
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>My Projects</Text>
        {projectIds.length === 0 ? (
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular' }}>You currently have no projects.</Text>
          </View>
        ) :
          <View style={styles.projects}>
            {!projectIds ? (
              skeletons
            ) : (
              projectIds.map((id, i) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('Details', { id: id, fromApps: false })
                  }
                  key={i}
                >
                  <Project projectId={id} />
                </Pressable>
              ))
            )}
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  projects: {
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: MIDNIGHT_GREEN,
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
