import { View, Image, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND } from '../styles/palette';
import FeedEmpty from '../assets/feed_empty.svg';
import Logo from '../assets/spark_logo.svg';

export default function Home({ navigation, user_id }) {
  const [projectInfo, setProjectInfo] = useState([]); //holds all projects
  const [creator, setCreator] = useState({}); //holds the creator of the project
  const [counter, setCounter] = useState(-1); //determines where in the array of projects we should
  const [loading, setLoading] = useState(true);

  //initialize home screen with information
  const getAllInfo = async (user_id) => {
    try {
      await getProjectInfo(user_id);
      setCounter(counter + 1);
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
      setProjectInfo(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  //gets the creator info on the curr project shown
  const getCreatorInfo = async (user_id) => {
    try {
      const info = await fetch(`http://localhost:4000/api/users/${user_id}`);
      const result = await info.json();
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
  useEffect(() => {
    getAllInfo(user_id).then(setLoading(false));
  }, []);

  //on counter changing
  useEffect(() => {
    if (projectInfo[counter]) getCreatorInfo(projectInfo[counter].creator);
  }, [counter]);

  return (
    <View style={styles.container}>
      <Logo width={'15%'} style={styles.img} />
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
            creator_name={creator.name || 'No User'}
            creator_username={creator.username ? `@${creator.username}` : ''}
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
              project_id={projectInfo[counter]._id}
              user_id={user_id}
            />
            <AcceptProject
              counter={counter}
              setCounter={setCounter}
              swipeRight={swipeRight}
              project_id={projectInfo[counter]._id}
              user_id={user_id}
            />
          </View>
        </>
      )}
      {!loading && counter >= projectInfo.length && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: '80%',
          }}
        >
          <FeedEmpty height={'50%'} />
          <Text
            style={{
              fontWeight: 'bold',
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            This is the end of everyone's brainstorms. Why not create your own?
          </Text>
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
    marginTop: '-5%',
  },
  actions: {
    flexDirection: 'row',
  },
});
