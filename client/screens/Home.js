import { View, Image, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';

export default function Home({ navigation, user_id }) {
  const [projectInfo, setProjectInfo] = useState([]); //holds all projects
  const [creator, setCreator] = useState({}); //holds the creator of the project
  const [counter, setCounter] = useState(0); //determines where in the array of projects we should
  const [loading, setLoading] = useState(true);

  //initialize home screen with information
  const getAllInfo = async (user_id) => {
    try {
      //grab the project
      const res = await getProjectInfo(user_id);

      //...and then grab the creator of the project
      await getCreatorInfo(res[counter].creator);
    } catch (err) {
      console.log(err);
    }
  };

  //loads in all the home page projects
  const getProjectInfo = async (user_id) => {
    try {
      const info = await fetch(
        `http://localhost:4000/api/projects/homepage?userId=${user_id}`
      );
      const result = await info.json();
      console.log(result.data);
      setProjectInfo(result.data);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  //gets the creator info on the curr project shown
  const getCreatorInfo = async (user_id) => {
    try {
      const info = await fetch(`http://localhost:4000/api/users/${user_id}`);
      const result = await info.json();
      console.log(result.data);
      setCreator(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  //call endpoint on rejection
  const swipeLeft = async (project_id, user_id) => {
    /*
    try {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({ projectId: project_id, userId: user_id }),
      };
      const res = await fetch(
        `http://localhost:4000/api/projects/swipeleft`,
        requestOptions
      );
      console.log('WORKED');
      console.log(res);
    } catch (err) {
      console.log(err);
    }*/
  };

  //call endpoint on accept
  const swipeRight = async (project_id, user_id) => {
    /*
    try {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({ projectId: project_id, userId: user_id }),
      };
      const res = await fetch(
        `http://localhost:4000/api/projects/swiperight`,
        requestOptions
      );
      console.log('WORKED');
      console.log(res);
    } catch (err) {
      console.log(err);
    }*/
  };

  //on first render
  useEffect(async () => {
    await getAllInfo(user_id);
    setLoading(false);
  }, []);

  //on counter changing
  useEffect(() => {
    if (projectInfo[counter]) getCreatorInfo(projectInfo[counter].creator);
  }, [counter]);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/spark_logo.png')} />
      {loading && (
        <>
          <ProjectCardFeed />
          <View style={styles.actions}>
            <DeclineProject />
            <AcceptProject />
          </View>
        </>
      )}
      {!loading && projectInfo[counter] && (
        <>
          <ProjectCardFeed
            description={projectInfo[counter].description}
            skillset={projectInfo[counter].skillset}
            bio={projectInfo[counter].bio || 'Project bio here'}
            creator_name={creator.name}
            creator_username={`@${creator.username}`}
            image={creator.image}
            title={projectInfo[counter].title}
            timeline={`${projectInfo[counter].timeline} months`}
            members_needed={`${
              projectInfo[counter].members_needed || 5
            } members`}
          />
          <View style={styles.actions}>
            <DeclineProject
              counter={counter}
              setCounter={setCounter}
              swipeLeft={swipeLeft}
              project_id={projectInfo._id}
              user_id={user_id}
            />
            <AcceptProject
              counter={counter}
              setCounter={setCounter}
              swipeRight={swipeRight}
              project_id={projectInfo._id}
              user_id={user_id}
            />
          </View>
        </>
      )}
      {!loading && counter >= projectInfo.length && (
        <View>
          <Text>all projects done</Text>
        </View>
      )}
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
