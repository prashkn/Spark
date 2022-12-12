import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { UserContext } from '../components/UserContext';
import WarningMessage from '../components/WarningMessage';
import { BLOND, GAINSBORO, MUSTARD } from '../styles/palette';
import * as EmailValidator from 'email-validator';
import { ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validForm, setValidForm] = useState({
    email: { valid: true, message: '' },
    password: { valid: true, message: '' },
  });

  const passwordBox = useRef();

  const auth = getAuth();

  function login() {
    let allFieldsValid = true;

    // Check if email is valid
    if (!EmailValidator.validate(email)) {
      setValidForm({
        ...validForm,
        email: { valid: false, message: 'Please enter a valid email.' },
      });
      allFieldsValid = false;
    } else {
      // Set back to true in case user comes back
      setValidForm({
        ...validForm,
        email: { valid: true, message: '' },
      });
    }

    if (!allFieldsValid) {
      return;
    }

    // If all fields valid, sign in
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        if (error.code === 'auth/user-not-found') {
          setValidForm({
            ...validForm,
            email: {
              valid: false,
              message: 'User not found. Would you like to create an account?',
            },
          });
        } else if (error.code === 'auth/wrong-password') {
          setValidForm({
            ...validForm,
            password: {
              valid: false,
              message: 'Incorrect password. Try again.',
            },
          });
        }
      });
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          width: '100%',
        }}
        contentContainerStyle={{
          flex: 1,
          // Put logo on top, input and buttons in center, and spacer at bottom
          justifyContent: 'space-between',

          // Horizontally center items
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/spark_logo.png')}
          style={styles.logo}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Spark</Text>
          {/* <Text style={{ maxWidth: '100%' }}>{JSON.stringify(user)}</Text> */}

          <LoginTextInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordBox.current.focus();
            }}
          />

          {validForm.email.valid === false && (
            <WarningMessage message={validForm.email.message} />
          )}

          <LoginTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={login}
            returnKeyType="done"
            ref={passwordBox}
          />

          {validForm.password.valid === false && (
            <WarningMessage message={validForm.password.message} />
          )}

          <LoginButton
            title="Log in"
            backgroundColor={MUSTARD}
            backgroundColorPressed="#ffd333"
            onPress={login}
          />

          <LoginButton
            title="Forgot password?"
            backgroundColor={BLOND}
            backgroundColorPressed="#ffea80"
          />

          <View style={styles.orContainer}>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.horizontalLine}></View>
          </View>

          <LoginButton
            title="Create account"
            backgroundColor={MUSTARD}
            backgroundColorPressed="#ffd333"
            onPress={() => navigation.navigate('SignUpRoot')}
          />
        </View>

        {/* Spacer (same height as logo) to keep input text and login buttons centered */}
        <View style={styles.bottomSpacer}></View>

        <StatusBar barStyle="dark-content" />
      </ScrollView>
    </SafeAreaView>
  );
}

const logoSize = 80;

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'white',
    flex: 1,

    // Put logo on top, input and buttons in center, and spacer at bottom
    justifyContent: 'space-between',

    // Horizontally center items
    alignItems: 'center',
  },

  container: {
    paddingHorizontal: 20,

    // Horizontally center items that don't take up 100% width
    alignItems: 'center',

    // Width should be 400 px max
    maxWidth: 400,
    width: '100%',

    // Center contents
    marginHorizontal: 'auto',
  },

  logo: { height: logoSize, width: logoSize },

  title: { fontFamily: 'Poppins-Bold', fontSize: 36, marginBottom: 10 },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },

  horizontalLine: {
    borderBottomColor: GAINSBORO,
    borderBottomWidth: 1,
    borderRadius: 10,
    flex: 1,
    maxWidth: 100,
  },

  orText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#DADADA',
    fontSize: 18,
    marginHorizontal: 20,
  },

  bottomSpacer: { height: logoSize },
});
