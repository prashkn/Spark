import { View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';

export default function Home({ navigation }) {
  const [cardInfo, setCardInfo] = useState({});
  const [creator, setCreator] = useState({});
  const [counter, setCounter] = useState(0); //determines where in the array of projects we should

  const getAllInfo = async (user_id) => {
    try {
      getProjectInfo(user_id);
      getCreatorInfo(user_id);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectInfo = async (user_id) => {
    try {
      const info = await fetch(
        `http://localhost:4000/api/projects/homepage?userId=${user_id}`
      );
      const result = await info.json();
      setCardInfo(
        result.data[counter] || result.data[result.data.length() - 1]
      );
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
    getAllInfo('63823c924a0de95cddc54052');
  }, []);

  return (
    <View style={styles.container}>
      {console.log(cardInfo)}
      {console.log(counter)}
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
        <DeclineProject counter={counter} setCounter={setCounter} />
        <AcceptProject counter={counter} setCounter={setCounter} />
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
});
