import { View, Text, StyleSheet, Button } from "react-native";
import ProjectCardFeed from "../components/ProjectCardFeed";

export default function Home() {
  const getCardInfo = async (u_id) => {
    try {
      const info = await fetch(`/api/projects/homepage`);
      console.log(info.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ProjectCardFeed
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
        skillset={["skill1", "skill2"]}
        bio={"Project bio here"}
        creator_name={"Project Creator"}
        creator_username={"@username"}
        image={""}
        title={"Project Title/Idea"}
        members_needed={"5 Members"}
      />
      <Button onPress={() => getCardInfo()} title="click" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3B5",
    alignItems: "center",
    justifyContent: "center",
  },
});
