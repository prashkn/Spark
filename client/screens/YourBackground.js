import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { NewUserInfoContext } from '../components/NewUserInfoContext';
import { GAINSBORO, MUSTARD } from '../styles/palette';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { SPARK_API } from './BackendURL';
import { UserContext } from '../components/UserContext';
import WarningMessage from '../components/WarningMessage';

export default function YourBackground({ navigation }) {
  const { newUserInfo, setNewUserInfo } = useContext(NewUserInfoContext);
  const [progress, setProgress] = useState(90);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    // Redirect to signup flow page 1 if missing basic info (should be handled
    // in previous page, but in case someone goes to the URL for this page
    // directly without inputting basic info, we should redirect them)
    if (
      Object.keys(newUserInfo).length === 0 ||
      newUserInfo.name === undefined ||
      newUserInfo.email === undefined ||
      newUserInfo.password === undefined
    ) {
      navigation.navigate('YourBasicInformation');
      return;
    }
  }, []);

  const [fieldsValid, setFieldsValid] = useState({
    bio: true,
    experience: true,
  });

  function submitForm() {
    console.log(newUserInfo);
    console.log(fieldsValid);

    let allFieldsValid = true;

    let newFieldsValid = {...fieldsValid};

    // Check if bio is valid
    if (newUserInfo.bio === undefined || newUserInfo.bio.length === 0) {
      newFieldsValid = { ...newFieldsValid, bio: false };
      allFieldsValid = false;
    } else {
      newFieldsValid = { ...newFieldsValid, bio: true };
    }

    // Check if experience is valid
    if (
      newUserInfo.experience === undefined ||
      newUserInfo.experience.length === 0
    ) {
      newFieldsValid = { ...newFieldsValid, experience: false };
      allFieldsValid = false;
    } else {
      newFieldsValid = { ...newFieldsValid, experience: true };
    }

    setFieldsValid(newFieldsValid);

    if (!allFieldsValid) {
      return;
    }

    // Sign up user with Firebase
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      newUserInfo.email,
      newUserInfo.password
    )
      .then(async () => {
        const newUserToBackend = {
          ...newUserInfo,
          password: '',
          skills: newUserInfo.experience,
        };
        console.log(newUserToBackend);

        // Create user in DB
        const response = await fetch(`${SPARK_API}/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUserToBackend),
        });

        if (!response.ok) {
          console.log(response);
          return;
        }

        const body = await response.json();

        setUser(body.data);

        signInWithEmailAndPassword(
          auth,
          newUserInfo.email,
          newUserInfo.password
        );
      })
      .catch((error) => {
        console.log(error);
      });

    // navigation.navigate('Root', { screen: 'Home' });
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          width: '100%',
          maxWidth: 600,
          marginHorizontal: 'auto',

          // backgroundColor: 'red',
        }}
      >
        {/* Progress bar */}
        <View
          style={{
            display: 'flex',
            alignSelf: 'center',
            width: '100%',
            height: 20,
            backgroundColor: GAINSBORO,
            borderRadius: 10,

            marginVertical: 25,
          }}
        >
          <View
            style={{
              backgroundColor: MUSTARD,
              width: `${progress}%`,
              height: '100%',
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>

      <KeyboardAwareScrollView
        style={{
          height: '100%',
        }}
        contentContainerStyle={{
          maxWidth: 600,
          marginHorizontal: 'auto',
          paddingHorizontal: 20,
        }}
      >
        <Text>{JSON.stringify(newUserInfo)}</Text>
        <Text>{JSON.stringify(fieldsValid)}</Text>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24 }}>
          Your Background
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#989898',
          }}
        >
          Tell us about you. Briefly describe your professional background. It's
          ok to brag.
        </Text>
        <View
          style={{
            marginTop: 20,
          }}
        >
          {/* TODO: Add asterisks */}
          <LoginTextInput placeholder="Headline" />
          <LoginTextInput placeholder="Current Role" />
          <LoginTextInput
            placeholder="About me"
            multiline={true}
            scrollEnabled={true}
            style={{ height: 125, paddingTop: 10 }}
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, bio: text });
            }}
          />

          {fieldsValid.bio === false && (
            <WarningMessage message="Please enter a bio." />
          )}

          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            scrollEnabled={true}
            style={{ height: 125, paddingTop: 10 }}
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, experience: text });
            }}
          />

          {fieldsValid.experience === false && (
            <WarningMessage message="Please select experience." />
          )}
        </View>

        <LoginButton title="Start Brainstorming!" onPress={submitForm} />
      </KeyboardAwareScrollView>
      {/* </View> */}

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
