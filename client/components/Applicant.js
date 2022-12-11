import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { MIDNIGHT_GREEN } from '../styles/palette';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../data/util';

export const Applicant = ({
  navigation,
  userId,
  isAccepted,
  projectInfo,
  setAccepted,
  setApplicants,
  applicants,
  accepted,
}) => {
  const [status, setStatus] = useState();
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    try {
      const info = await fetch(`${BASE_URL}/users/${userId}`);
      const result = await info.json();
      setUserInfo(result.data);
      setStatus(isAccepted ? true : false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = async () => {
    setStatus(!isAccepted);
    // if wasn't originally accepted, add to participants
    if (!isAccepted) {
      try {
        await fetch(`${BASE_URL}/projects/check?`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            projectId: projectInfo._id,
          }),
        });
        setAccepted(accepted => [...accepted, userId]);
        // remove from applicants
        const index = applicants.indexOf(userId);
        if (index > -1) {
          // only splice array when item is found
          applicants.splice(index, 1); 
        }
        setApplicants(applicants);
      } catch (err) {
        console.log(err);
      }
    } else {
      // remove from participants
      try {
        await fetch(`${BASE_URL}/projects/uncheck?`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            projectId: projectInfo._id,
          }),
        });
        setApplicants(applicants => [...applicants, userId]);
        // remove from accepted
        const index = accepted.indexOf(userId);
        if (index > -1) {
          // only splice array when item is found
          accepted.splice(index, 1);
        }
        setAccepted(accepted);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <View style={styles.card}>
      <View style={styles.applicant}>
        <Pressable
          onPress={handleCheck}
          style={{
            backgroundColor: MIDNIGHT_GREEN,
            height: 20,
            width: 20,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        >
          {status && (
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: 'white', alignSelf: 'center' }}
            />
          )}
        </Pressable>
        {userInfo && (
          <Pressable
            style={{ flex: 2, marginLeft: 10 }}
            onPress={() =>
              navigation.navigate('Other User', {
                projectInfo: projectInfo,
                userInfo: userInfo,
              })
            }
          >
            <Text>{userInfo.username}</Text>
            <Text numberOfLines={2} style={{ color: 'grey' }}>
              {userInfo.bio}
            </Text>
          </Pressable>
        )}
        <Pressable
          style={{ alignSelf: 'center' }}
          onPress={() =>
            navigation.navigate('Other User', {
              projectInfo: projectInfo,
              userInfo: userInfo,
            })
          }
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    display: 'flex',
  },
  applicant: {
    margin: 20,
    marginVertical: 5,
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
});
