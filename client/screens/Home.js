import { View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';
import { Button } from '@rneui/base';

export default function Home({ navigation }) {
  const [cardInfo, setCardInfo] = useState({});
  const [creator, setCreator] = useState({});
  const [counter, setCounter] = useState(0); //determines where in the array of projects we should

  const MOCK_DATA = {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    skillset: ['Skill 1', 'Skill 2'],
    bio: 'Project bio here',
    creator_name: 'Project Creator',
    creator_username: '@username',
    image: '',
    title: 'Project Title/Idea',
    timeline: '6 months',
    members_needed: 5,
  };

  const getHomeInfo = async (user_id) => {
    try {
      getCardInfo(user_id);
      getCreatorInfo(user_id);
    } catch (err) {
      console.log(err);
    }
  };

  const getCardInfo = async (user_id) => {
    try {
      const info = await fetch(
        `http://localhost:4000/api/projects/homepage?userId=${user_id}`
      );
      const result = await info.json();
      setCardInfo(result.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getCreatorInfo = async (creator_id) => {
    try {
      const info = await fetch(`http://localhost:4000/api/users/${creator_id}`);
      const result = await info.json();
      setCreator(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHomeInfo('63823c924a0de95cddc54052');
  }, []);

  return (
    <View style={styles.container}>
      {console.log(cardInfo)}
      <Image style={styles.img} source={require('../assets/spark_logo.png')} />
      <ProjectCardFeed
        description={cardInfo.description}
        skillset={cardInfo.skillset}
        bio={cardInfo.bio || 'Project bio here'}
        creator_name={creator.name}
        creator_username={`@${creator.username}`}
        image={creator.image}
        title={cardInfo.title}
        timeline={`${cardInfo.timeline} months`}
        members_needed={`${cardInfo.members_needed || 5} members`}
      />
      <View style={styles.actions}>
        <DeclineProject />
        <AcceptProject />
      </View>
      <CreatePostButton style={styles.createPost} navigation={navigation} />
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
  createPost: {
    position: 'absolute',
    marginTop: '3%',
  },
});
