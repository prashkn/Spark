import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import ProgressBar from '../components/ProgressBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { NewUserInfoContext } from '../components/SignUp';
import { GAINSBORO, MUSTARD } from '../styles/palette';
import * as EmailValidator from 'email-validator';
import WarningMessage from '../components/WarningMessage';

export default function YourBasicInformation({ navigation }) {
  const { newUserInfo, setNewUserInfo } = useContext(NewUserInfoContext);

  const [nameValid, setNameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [progress, setProgress] = useState(20);

  function submitForm() {
    let allFieldsValid = true;

    // Check if email is valid
    if (!EmailValidator.validate(newUserInfo.email)) {
      setEmailValid(false);
      allFieldsValid = false;
    } else {
      // Set back to true in case user comes back
      setEmailValid(true);
    }

    // Check if name is valid
    if (
      newUserInfo.name === undefined ||
      newUserInfo.name.length === 0
    ) {
      setNameValid(false);
      allFieldsValid = false;
    } else {
      setNameValid(true);
    }

    // Check if password is valid
    if (
      newUserInfo.password === undefined ||
      newUserInfo.password.length < 8
    ) {
      setPasswordValid(false);
      allFieldsValid = false;
    } else {
      setPasswordValid(true);
    }

    if (allFieldsValid) {
      navigation.navigate('YourBackground');
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          width: '100%',
          maxWidth: 600,
          marginHorizontal: 'auto',
        }}
      >
        <ProgressBar progress={progress} />
        <ScrollView
          style={{
            height: '100%',
          }}
        >
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24 }}>
            Your Basic Information
          </Text>

          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: '#989898',
            }}
          >
            Welcome to Spark! We can't wait to see what amazing ideas you turn
            into reality.
          </Text>

          <View
            style={{
              marginTop: 20,
            }}
          >
            {/* TODO: Add asterisks */}
            <LoginTextInput
              placeholder="Name"
              onChangeText={(text) => {
                setNewUserInfo({ ...newUserInfo, name: text });
              }}
              onSubmitEditing={submitForm}
              returnKeyType='done'
            />

            {nameValid === false && (
              <WarningMessage message="Please enter your full name." />
            )}

            <LoginTextInput
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(text) => {
                setNewUserInfo({ ...newUserInfo, email: text });
              }}
              onSubmitEditing={submitForm}
              returnKeyType='done'
            />

            {emailValid === false && (
              <WarningMessage message="Please enter a valid email address." />
            )}

            <LoginTextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => {
                setNewUserInfo({ ...newUserInfo, password: text });
              }}
              onSubmitEditing={submitForm}
              returnKeyType='done'
            />
            

            {passwordValid === false && (
              <WarningMessage message="Please enter a password with at least 8 characters." />
            )}
          </View>
          <LoginButton
            title="Continue"
            onPress={submitForm}
          />
        </ScrollView>
      </View>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
