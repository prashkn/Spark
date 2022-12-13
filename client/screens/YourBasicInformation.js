import * as EmailValidator from 'email-validator';
import { useContext, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { NewUserInfoContext } from '../components/NewUserInfoContext';
import ProgressBar from '../components/ProgressBar';
import WarningMessage from '../components/WarningMessage';

export default function YourBasicInformation({ navigation }) {
  const { newUserInfo, setNewUserInfo } = useContext(NewUserInfoContext);

  const [nameValid, setNameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [phoneNumberValid, setPhoneNumberValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [usernameValid, setUsernameValid] = useState(null);

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

    if (newUserInfo.number === undefined || newUserInfo.length < 10) {
      // TODO: Check if it's a real number
      setPhoneNumberValid(false);
      allFieldsValid = false
    } else {
      setPhoneNumberValid(true);
    }

    // TODO: Check if email is valid (does user with email exist in DB?)

    // Check if name is valid
    if (newUserInfo.name === undefined || newUserInfo.name.length === 0) {
      setNameValid(false);
      allFieldsValid = false;
    } else {
      setNameValid(true);
    }

    // Check if username is valid
    if (
      newUserInfo.username === undefined ||
      newUserInfo.username.length === 0
    ) {
      setUsernameValid(false);
      allFieldsValid = false;
    } else {
      setUsernameValid(true);
    }

    // TODO: Check if username exists in DB

    // Check if password is valid
    if (newUserInfo.password === undefined || newUserInfo.password.length < 8) {
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
            returnKeyType="done"
          />

          {/* TODO: Use object instead of individual booleans to store if fields are invalid and store a message in the object so warning message can be dynamically updated */}
          {nameValid === false && (
            <WarningMessage message="Please enter your full name." />
          )}

          <View>
            <LoginTextInput
              placeholder="username"
              onChangeText={(text) => {
                setNewUserInfo({ ...newUserInfo, username: text });
              }}
              onSubmitEditing={submitForm}
              returnKeyType="done"
              style={{ paddingLeft: 28 }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
                color: '#BDBDBD',
                position: 'absolute',
                paddingLeft: 10,
                paddingTop: 12,
                // top: '22%',
                // left: 10,
              }}
            >
              @
            </Text>
          </View>

          {usernameValid === false && (
            <WarningMessage message="Please enter a username." />
          )}

          <LoginTextInput
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, email: text });
            }}
            onSubmitEditing={submitForm}
            returnKeyType="done"
          />

          {emailValid === false && (
            <WarningMessage message="Please enter a valid email address." />
          )}

          <LoginTextInput
            placeholder="Phone number"
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, number: text });
            }}
            onSubmitEditing={submitForm}
            returnKeyType="done"
          />

          {phoneNumberValid === false && (
            <WarningMessage message="Please enter a valid phone number." />
          )}

          <LoginTextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => {
              setNewUserInfo({ ...newUserInfo, password: text });
            }}
            onSubmitEditing={submitForm}
            returnKeyType="done"
          />

          {passwordValid === false && (
            <WarningMessage message="Please enter a password with at least 8 characters." />
          )}
        </View>
        <LoginButton title="Continue" onPress={submitForm} />
      </KeyboardAwareScrollView>

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
