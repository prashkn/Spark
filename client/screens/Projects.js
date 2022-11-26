import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Project from "../components/Project";

export default function Projects() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#FFF3B5",
  },
  projects: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    display: 'flex',
    position: 'absolute',
    top: '100px',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: '50px',
    left: '20px',
  }
})