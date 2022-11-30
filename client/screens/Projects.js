import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Project from '../components/Project';
import { BLOND, MIDNIGHT_GREEN } from '../styles/palette';
import { Skeleton, LinearGradient } from '@rneui/themed';


export default function Projects({ navigation }) {
  const [projects, setProjects] = useState([])
  const NUM_OF_SKELETONS = 7;

  const getProjects = async (id) => {
    try {
      const info = await fetch(`http://localhost:4000/api/projects/createdprojects?userId=${id}`);
      const result = await info.json()
      const projects = []
      for (let i = 0; i < result.data.length; i++) {
        projects.push(result.data[i])
      }
      setProjects(projects)
    } catch (err) {
      console.log(err);
    }
  };

  const skeletons = []
  for (let i = 0; i < NUM_OF_SKELETONS; i++) {
    skeletons.push(
      <View style={styles.projects} key={i}>
        <View style={styles.card}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={345}
            height={90}
          />
        </View>
      </View>
    )
  }

  useEffect(() => {
    //! change to variable
    getProjects("63824360149a7a6b1f4eea69")
  }, [])

  return (
    <SafeAreaView
      style={{
        backgroundColor: BLOND,
        flex: 1,
      }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.header}>My Projects</Text>
        <View style={styles.projects}>
          {projects.map((proj, i) => (
            <Pressable onPress={() => navigation.navigate("Details")} key={i}>
              <Project project={proj} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {projects.length === 0 &&
        <View style={styles.projects}>
          {skeletons}
        </View>
      }
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
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  }
});
