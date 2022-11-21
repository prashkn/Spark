//Card View that contains information about a project that is shown in the home page/feed.
import { View, Text, StyleSheet } from "react-native";

export default function ProjectCardFeed(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>ProjectCardFeed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    width: "80%",
    backgroundColor: "gray",
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
