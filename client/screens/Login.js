import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
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
import { BLOND, GAINSBORO, MUSTARD } from '../styles/palette';

export default function Login({ navigation }) {
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetch('https://spark-api.owenhay.es/api/projects/homepage?userId=63824360149a7a6b1f4eea69');
  //     console.log(await data.text());
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   signOut(auth)
  // }, [])

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      user.getIdToken(true).then((thing) => {
        console.log(thing);
      })
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* <View> */}
      <Image source={require('../assets/spark_logo.png')} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Spark</Text>
        <Text style={{ maxWidth: '100%' }}>{JSON.stringify(user)}</Text>

        <LoginTextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <LoginTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <LoginButton
          title="Log in"
          backgroundColor={MUSTARD}
          backgroundColorPressed="#ffd333"
          onPress={() => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                console.log(userCredential);
              })
              .catch((error) => {
                console.log(JSON.stringify(error));
              });
          }}
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
      {/* </View> */}
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
    marginLeft: 'auto',
    marginRight: 'auto',
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
