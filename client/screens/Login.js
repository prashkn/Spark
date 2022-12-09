import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { BLOND, GAINSBORO, MUSTARD } from '../styles/palette';

export default function Login() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Image source={require('../assets/spark_logo.png')} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Spark</Text>

        <LoginTextInput placeholder="Email" keyboardType="email-address" />
        <LoginTextInput placeholder="Password" secureTextEntry />
        <LoginButton
          title="Log in"
          backgroundColor={MUSTARD}
          backgroundColorPressed="#ffd333"
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
        />
      </View>

      {/* Spacer (same height as logo) to keep input text and login buttons centered */}
      <View style={styles.bottomSpacer}></View>

      <StatusBar style="dark" />
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
