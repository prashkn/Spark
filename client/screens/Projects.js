import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Project from '../components/Project';
import { BLOND, MIDNIGHT_GREEN } from '../styles/palette';

export default function Projects() {
  const [projects, setProjects] = useState([])

  const getProjects = async (id) => {
    try {
      const info = await fetch(`../api/projects/createdprojects?userId=${id}`);
      const result = await info.json()
      console.log(result);
      // setProjects(info.json())
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //! change to variable
    getProjects("638409bfed11c73d0818e5a5")
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
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
        </View>
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
});
