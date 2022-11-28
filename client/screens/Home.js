import { View, Image, StyleSheet, Button } from 'react-native';
import AcceptProject from '../components/AcceptProject';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';

export default function Home() {
  const MOCK_DATA = {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    skillset: ['skill1', 'skill2'],
    bio: 'Project bio here',
    creator_name: 'Project Creator',
    creator_username: '@username',
    image: '',
    title: 'Project Title/Idea',
    timeline: '6 months',
    members_needed: 5,
  };

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
      <Image style={styles.img} source={require('../assets/spark_logo.png')} />
      <ProjectCardFeed
        description={MOCK_DATA.description}
        skillset={MOCK_DATA.skillset}
        bio={MOCK_DATA.bio}
        creator_name={MOCK_DATA.creator_name}
        creator_username={MOCK_DATA.creator_username}
        image={MOCK_DATA.image}
        title={MOCK_DATA.title}
        timeline={MOCK_DATA.timeline}
        members_needed={`${MOCK_DATA.members_needed} members`}
      />
      <View style={styles.actions}>
        <DeclineProject />
        <AcceptProject />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLOND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginBottom: '2%',
  },
  actions: {
    flexDirection: 'row',
  },
  leftbtn: {
    marginRight: 15,
  },
  rightbtn: {
    marginLeft: 15,
  },
});
