import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { BLOND, MIDNIGHT_GREEN, POLISHED_PINE, MUSTARD } from '../styles/palette';
import { useEffect, useState } from 'react';
import { Applicant } from './Applicant';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BASE_URL } from '../data/util';

export function ProjectDetail({ navigation, route }) {
  const id = route.params.id;
  const fromApps = route.params.fromApps
  const [projectInfo, setProjectInfo] = useState();
  const [onApplicants, setOnApplicants] = useState(true);
  const [accepted, setAccepted] = useState();
  const [applicants, setApplicants] = useState();

  async function getProject(id) {
    try {
      const info = await fetch(
        `${BASE_URL}/projects/${id}`
      );
      const result = await info.json();
      setProjectInfo(result.data)
      setAccepted(result.data.participants)
      setApplicants(result.data.applicants)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProject(id)
  }, [])

  navigation.addListener('focus', () => {
    // reset marker state
    getProject(id)
  });

  function handleStartProj() {
    if (projectInfo.membersNeeded > accepted.length) {
      Alert.alert('Warning!', 'You have not accepted the amount of participants you described in the description. Are you sure you want to start this project?', [
        { text: 'Yes' },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
    if (projectInfo.membersNeeded < accepted.length) {
      Alert.alert('Warning!', 'You have accepted more than the amount of participants you described in the description. Are you sure you want to start this project?', [
        { text: 'Yes' },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: BLOND,
        flex: 1,
      }}
    >
      {projectInfo &&
        <View style={project.container}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              style={{ display: 'flex', flexDirection: 'row', flex: 2 }}
              onPress={() => navigation.navigate(fromApps ? 'Applications' : 'Projects')}
            >
              <FontAwesomeIcon style={project.backIcon} icon={faChevronLeft} />
              <Text style={project.header}>{projectInfo.title}</Text>
            </Pressable>
            {!fromApps &&
              <Pressable
                style={{ display: 'flex', justifyContent: 'center' }}
                onPress={() =>
                  navigation.navigate('Editing Project', {
                    title: projectInfo.title,
                    biography: '',
                    description: projectInfo.description,
                    members: projectInfo.members,
                    skillsets: projectInfo.skillset,
                    timeline: projectInfo.timeline,
                    projectId: projectInfo._id
                  })
                }
              >
                <Text
                  style={{
                    color: MIDNIGHT_GREEN,
                    alignSelf: 'center',
                    fontSize: 16,
                    fontFamily: 'Poppins-Regular'
                  }}
                >
                  Edit
                </Text>
              </Pressable>
            }
          </View>
          <View style={project.card}>
            <View style={project.information}>
              <Text style={details.container}>
                <Text style={{ fontFamily: 'Poppins-Bold' }}>Description: </Text>
                <Text style={{ fontFamily: 'Poppins-LightItalic' }}>
                  {projectInfo.description}
                </Text>
              </Text>
              <View style={details.container}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: MIDNIGHT_GREEN, alignSelf: 'center' }}>
                  Number of people wanted:{' '}
                </Text>
                <View style={details.greenButton}>
                  <Text style={{ color: 'white', fontFamily: 'Poppins-Regular' }}>{`${projectInfo.membersNeeded} Members`}</Text>
                </View>
              </View>
              <View style={details.container}>
                <Text style={{ fontFamily: 'Poppins-Bold', color: MIDNIGHT_GREEN, alignSelf: 'center' }}>Skills wanted: </Text>
                {projectInfo.skillset.map((skill, i) => (
                  <View style={{ ...details.yellowButton, margin: 5 }} key={i}>
                    <Text style={{ fontFamily: 'Poppins-Regular' }}>{skill}</Text>
                  </View>
                ))}
              </View>
              <Text style={details.timeline}>
                <Text style={{ fontFamily: 'Poppins-Bold' }}>Timeline: </Text>
                <Text style={{ fontFamily: 'Poppins-Regular' }}>{`Approx. ${projectInfo.timeline} months`}</Text>
              </Text>
            </View>
          </View>
          {!fromApps &&
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: 10,
                paddingBottom: 15,
              }}
            >
              <Pressable
                onPress={() => setOnApplicants(true)}
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: onApplicants ? 3 : 1,
                }}
              >
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular' }}>Applicants</Text>
              </Pressable>
              <Pressable
                onPress={() => setOnApplicants(false)}
                style={{
                  flex: 1,
                  borderBottomColor: 'black',
                  borderBottomWidth: !onApplicants ? 3 : 1,
                }}
              >
                <Text style={{ alignSelf: 'center', fontFamily: 'Poppins-Regular' }}>Accepted</Text>
              </Pressable>
            </View>
          }
          {!fromApps &&
            <ScrollView style={{ display: 'flex' }}>
              {onApplicants
                ? (applicants && applicants.map((applicant, i) => (
                  <Applicant
                    key={i}
                    userId={applicant}
                    navigation={navigation}
                    isAccepted={false}
                    projectInfo={projectInfo}
                    setAccepted={setAccepted}
                    setApplicants={setApplicants}
                    applicants={applicants}
                    accepted={accepted}
                  />
                )))
                : (accepted && accepted.map((applicant, i) => (
                  <Applicant
                    key={i}
                    userId={applicant}
                    navigation={navigation}
                    isAccepted={true}
                    projectInfo={projectInfo}
                    setAccepted={setAccepted}
                    setApplicants={setApplicants}
                    applicants={applicants}
                    accepted={accepted}
                  />
                )))}
            </ScrollView>
          }
          {(!onApplicants && !fromApps) &&
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Pressable style={project.startProj} onPress={handleStartProj}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, alignSelf: 'center' }}>Start Project</Text>
              </Pressable>
            </View>
          }
        </View>
      }
    </SafeAreaView>
  );
}

export const project = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  card: {
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: MIDNIGHT_GREEN,
    flex: 2,
  },
  backIcon: {
    color: MIDNIGHT_GREEN,
    alignSelf: 'center',
    paddingRight: 5,
  },
  information: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOffset: { width: 3, height: 4 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: 'flex',
    width: 345,
  },
  applicant: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOffset: { width: 3, height: 4 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    display: 'flex',
    width: 345,
    flexDirection: 'row',
  },
  startProj: {
    backgroundColor: MUSTARD,
    margin: 10,
    marginBottom: 25,
    width: 150,
    height: 40,
    justifyContent: 'center',
    borderRadius: 15
  }
});

const details = StyleSheet.create({
  container: {
    color: MIDNIGHT_GREEN,
    paddingBottom: 20,
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  timeline: {
    color: MIDNIGHT_GREEN,
    paddingBottom: 10,
  },
  greenButton: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: POLISHED_PINE,
    borderRadius: 5,
    alignItems: 'center'
  },
  yellowButton: {
    padding: 5,
    backgroundColor: BLOND,
    borderRadius: 5,
  },
});
