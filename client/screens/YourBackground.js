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
import { skillset_list } from '../data/skillsets';
import DropDownPicker from 'react-native-dropdown-picker';

export default function YourBackground({ navigation }) {
  const { newUserInfo, setNewUserInfo } = useContext(NewUserInfoContext);
  const [progress, setProgress] = useState(90);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [possibleSkills, setPossibleSkills] = useState(skillset_list);

  const [selectedSkills, setSelectedSkills] = useState([]);

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

  useEffect(() => {
    if (dropdownValue === null) {
      return;
    }
    setSelectedSkills(
      skillset_list
        .filter((item) => dropdownValue.includes(item.value))
        .map((skill) => skill.label)
    );
  }, [dropdownValue]);

  const [fieldsValid, setFieldsValid] = useState({
    bio: true,
    experience: true,
  });

  function submitForm() {
    console.log(newUserInfo);
    console.log(fieldsValid);

    let allFieldsValid = true;

    let newFieldsValid = { ...fieldsValid };

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
          password: '', // Important: don't pass password to backend
          experience: newUserInfo.experience,
          skills: selectedSkills,
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
          width: '100%',
          maxWidth: 600,
          marginHorizontal: 'auto',
          paddingHorizontal: 20,
        }}
      >
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
          {/* <LoginTextInput placeholder="Headline" />
          <LoginTextInput placeholder="Current Role" /> */}
          <LoginTextInput
            placeholder="Location"
            // multiline={true}
            // scrollEnabled={true}
            // style={{ height: 125, paddingTop: 10 }}
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, location: text });
            }}
          />

          <LoginTextInput
            placeholder="Bio"
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

          <DropDownPicker
            multiple={true}
            min={0}
            open={dropdownOpen}
            value={dropdownValue}
            items={possibleSkills}
            setOpen={setDropdownOpen}
            setValue={setDropdownValue}
            setItems={setPossibleSkills}
            mode="BADGE"
            zIndex={3}
            style={{
              borderWidth: 1,
              backgroundColor: '#F6F6F6',
              borderColor: '#E8E8E8',
              minHeight: 50,
              borderRadius: 8,
              padding: 10,
              width: '100%',
              marginBottom: 10,
            }}
            extendableBadgeContainer={true}
            dropDownContainerStyle={{
              borderColor: '#E8E8E8',
              // backgroundColor: 'red',
              borderRadius: 8,
              // maxHeight: 300,
            }}
            dropDownDirection="AUTO"
            placeholder="Skills"
            placeholderStyle={{
              // fontFamily: 'Poppins-Medium',
              // fontSize: 16,
              color: '#BDBDBD',
            }}
            textStyle={{
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              color: 'black',
              // color: 'red',
            }}
            showBadgeDot={false}
            badgeStyle={{ borderRadius: 6 }}
            // badgeTextStyle={{color: 'purple'}}
            labelStyle={{ color: 'red' }}
            customItemLabelStyle={{ fontStyle: 'italic' }}
            listChildLabelStyle={{ fontStyle: 'italic' }}
            iconContainerStyle={{ display: 'none' }}
            // listItemLabelStyle={{fontStyle: 'italic'}}
            // selectedItemContainerStyle={{backgroundColor: 'red'}}
            // setItems={setPossibleSkills}
            // style={styles.dropdown}
            // textStyle={styles.dd_text}
          />

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
            <WarningMessage message="Please enter your experience." />
          )}
        </View>

        <LoginButton title="Start Brainstorming!" onPress={submitForm} />
      </KeyboardAwareScrollView>
      {/* </View> */}

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
