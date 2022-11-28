import { SafeAreaView, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { BLOND, GAINSBORO, MUSTARD } from '../styles/palette';

export default function Login() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          display: 'flex',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <Text
          style={{ fontFamily: 'Poppins-Bold', fontSize: 36, marginBottom: 10 }}
        >
          Spark
        </Text>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginVertical: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              borderBottomColor: GAINSBORO,
              borderBottomWidth: 1,
              borderRadius: 10,
              marginHorizontal: 20,
              width: '40%',
            }}
          ></View>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#DADADA',
              fontSize: 18,
            }}
          >
            or
          </Text>
          <View
            style={{
              borderBottomColor: GAINSBORO,
              borderBottomWidth: 1,
              borderRadius: 10,
              marginHorizontal: 20,
              width: '40%',
            }}
          ></View>
        </View>
        <LoginButton
          title="Create account"
          backgroundColor={MUSTARD}
          backgroundColorPressed="#ffd333"
        />
      </View>
    </SafeAreaView>
  );
}
