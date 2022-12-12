import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  Image,
} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import Modal from 'react-native-modal';
import AcceptProject from '../components/AcceptProject';
import CreatePostButton from '../components/CreatePostButton';
import DeclineProject from '../components/DeclineProject';
import ProjectCardFeed from '../components/ProjectCardFeed';
import { BLOND, GAINSBORO, POLISHED_PINE, MUSTARD } from '../styles/palette';
// import Logo from '../assets/spark_logo.svg';
import { Skeleton } from '@rneui/themed';
import EmptyFeed from '../components/EmptyFeed';
import { skillset_list } from '../data/skillsets';
import { BASE_URL } from '../data/util';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
  DropDownPicker.setMode('BADGE');
  DropDownPicker.setListMode('SCROLLVIEW');
  const [projectInfo, setProjectInfo] = useState([]); //holds all projects
  const [creator, setCreator] = useState({}); //holds the creator of the project
  const [counter, setCounter] = useState(0); //determines where in the array of projects we should
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [skillsets, setSkillsets] = useState([]);
  const [possibleSkills, setPossibleSkills] = useState(skillset_list);
  const { user } = useContext(UserContext);

  //initialize home screen with information
  const getAllInfo = async (user_id) => {
    try {
      const tmp_proj_info = await getProjectInfo(user_id);
      await getCreatorInfo(tmp_proj_info[counter].creator);
    } catch (err) {
      console.log(err);
    }
  };

  //loads in all the home page projects
  const getProjectInfo = async (user_id) => {
    try {
      const info = await fetch(
        `${BASE_URL}/projects/homepage?userId=${user_id}`
      );
      const result = await info.json();
      setProjectInfo(result.data);
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  //gets the creator info on the curr project shown
  const getCreatorInfo = async (user_id) => {
    try {
      const info = await fetch(`${BASE_URL}/users/${user_id}`);
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: project_id, userId: user_id }),
      };
      const res = await fetch(`${BASE_URL}/projects/swipeleft`, requestOptions);
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
    */
  };

  //call endpoint on accept
  const swipeRight = async (project_id, user_id) => {
    /*
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: project_id, userId: user_id }),
      };
      const res = await fetch(
        `${BASE_URL}/projects/swiperight`,
        requestOptions
      );
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }*/
  };

  //on first render
  useEffect(() => {
    console.log('user');
    console.log(user || '');
    if (user !== null) getAllInfo(user._id).then(setLoading(false));
    else getAllInfo('').then(setLoading(false));
  }, []);

  //on counter changing
  useEffect(() => {
    if (projectInfo[counter]) getCreatorInfo(projectInfo[counter].creator);
    //.log('counter' + counter);
    //console.log(projectInfo[counter]);
  }, [counter]);

  return (
    <View style={styles.screen}>
      <Modal
        isVisible={modalVisible}
        animationIn={'slideInUp'}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modal}>
          <Text style={styles.modal_title}>Filter brainstorms by:</Text>
          <View style={styles.singleinput}>
            <DropDownPicker
              multiple={true}
              min={1}
              open={open}
              value={skillsets}
              items={possibleSkills}
              setOpen={setOpen}
              setValue={setSkillsets}
              setItems={setPossibleSkills}
              style={styles.dropdown}
              textStyle={styles.dd_text}
            />
          </View>
          {/* dont show on feed empty view */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: 'Poppins-Bold',
              }}
            >
              Update Filters
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.container}>
        {/* <Logo width={'15%'} height={'15%'} /> */}
        <Image
          source={require('../assets/spark_logo.png')}
          style={styles.logo}
        />
        {loading && (
          <>
            <Skeleton animation="wave" width={'80%'} height={'50%'} />
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
              bio={projectInfo[counter].summary || 'Project bio here'}
              creator_name={creator.name || 'No User'}
              creator_username={creator.username ? `@${creator.username}` : ''}
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
                //user_id={user._id || ''}
              />
              <AcceptProject
                counter={counter}
                setCounter={setCounter}
                swipeRight={swipeRight}
                project_id={projectInfo[counter]._id}
                //user_id={user._id || ''}
              />
            </View>
          </>
        )}
        {!loading && counter >= projectInfo.length && <EmptyFeed />}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filter}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Icon name={'tune'} color={'white'} size={35} />
        </TouchableOpacity>
        <CreatePostButton
          style={styles.postBtn}
          navigation={navigation}
          //user_id={user._id || ''}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtn: {
    marginRight: 0,
  },
  filter: {
    borderRadius: '50%',
    backgroundColor: POLISHED_PINE,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.7,
  },
  bottomButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: '3%',
    marginLeft: '3%',
    marginBottom: '3%',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: '5%',
  },
  actions: {
    flexDirection: 'row',
  },
  screen: {
    flex: 1,
    backgroundColor: BLOND,
  },
  modal: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: '#e7e8e8',
    borderRadius: '15%',
  },
  modalinput: {
    backgroundColor: GAINSBORO,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: '5%',
  },
  dropdown: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: '5%',
    borderWidth: 0,
    marginBottom: '50%',
  },
  dd_text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: POLISHED_PINE,
  },
  btn: {
    marginTop: '10%',
    backgroundColor: MUSTARD,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  modal_title: {
    marginTop: '8%',
    fontSize: 20,
    marginBottom: '5%',
    fontFamily: 'Poppins-Bold',
  },
});
