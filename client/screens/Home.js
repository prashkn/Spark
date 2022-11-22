import { View, Text, StyleSheet } from "react-native";
import ProjectCardFeed from "../components/ProjectCardFeed";

export default function Home() {
  return (
    <View style={styles.container}>
      <ProjectCardFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
