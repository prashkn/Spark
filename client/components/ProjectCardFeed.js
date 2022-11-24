//Card View that contains information about a project that is shown in the home page/feed.
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

export default function ProjectCardFeed({
  title,
  bio,
  creator_name,
  creator_username,
  description,
  skillset,
  members_needed,
  timeline,
  image,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Image
            style={styles.profilepic}
            source={require("../assets/profile_pic_placeholder.png")}
          />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={{ fontSize: 14 }}>
              {creator_name}•
              <Text style={{ fontStyle: "italic" }}>{creator_username}</Text>
            </Text>
            <Text style={{ fontSize: 11 }}>Timeline: {timeline}</Text>
          </View>
        </View>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.skills}>
          <TouchableHighlight style={[styles.singleSkill, styles.members]}>
            <Text style={[styles.pill, styles.members]}>{members_needed}</Text>
          </TouchableHighlight>

          {skillset &&
            skillset.map((skill) => {
              return (
                <TouchableHighlight key={skill} style={styles.singleSkill}>
                  <Text style={styles.pill}>{skill}</Text>
                </TouchableHighlight>
              );
            })}
        </View>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.55,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 30,
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
    marginTop: 25,
    flex: 1,
    marginBottom: 25,
    width: "85%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profilepic: {
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
  },
  skills: {
    flexDirection: "row",
  },
  singleSkill: {
    padding: 5,
    backgroundColor: "#FFF3B5",
    marginRight: 15,
    marginTop: 15,
    marginBottom: 29,
    fontSize: 14,
    borderRadius: 7,
  },
  bio: {
    marginTop: 15,
    fontSize: 18,
  },
  members: {
    backgroundColor: "#4DA896",
    color: "white",
  },
  pill: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});
