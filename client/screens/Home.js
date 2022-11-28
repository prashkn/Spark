import { View, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';

export default function Home({ navigation }) {
  const [projectInfo, setProjectInfo] = useState({}); //returns a single project
  const [creator, setCreator] = useState({});
  const [counter, setCounter] = useState(0); //determines where in the array of projects we should

  const getAllInfo = async (user_id) => {
    try {
      const res = await getProjectInfo(user_id);
      await getCreatorInfo(res.data[counter].creator);
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
      setProjectInfo(
        result.data[counter] || result.data[result.data.length() - 1]
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const getCreatorInfo = async (creator_id) => {
    try {
      const info = await fetch(`http://localhost:4000/api/users/${creator_id}`);
      const result = await info.json();
      console.log(result);
      setCreator(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllInfo('6385431e23ef81b2d1b8ad14');
  }, [counter]);

  return (
    <View style={styles.container}>
      {console.log(projectInfo)}
      {console.log(counter)}
      <Image style={styles.img} source={require('../assets/spark_logo.png')} />
      <ProjectCardFeed
        description={projectInfo.description}
        skillset={projectInfo.skillset}
        bio={projectInfo.bio || 'Project bio here'}
        creator_name={creator.name}
        creator_username={`@${creator.username}`}
        image={creator.image}
        title={projectInfo.title}
        timeline={`${projectInfo.timeline} months`}
        members_needed={`${projectInfo.members_needed || 5} members`}
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
