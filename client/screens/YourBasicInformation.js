import { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { GAINSBORO, MUSTARD } from '../styles/palette';

export default function YourBasicInformation(props) {
  const [progress, setProgress] = useState(20);
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
        {/* Progress bar */}
        <View
          style={{
            display: 'flex',
            alignSelf: 'center',
            width: '100%',
            height: 20,
            backgroundColor: GAINSBORO,
            borderRadius: 10,

            marginTop: 25,
            marginBottom: 20,
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
          <LoginTextInput placeholder="Name"></LoginTextInput>
          <LoginTextInput
            placeholder="Email"
            keyboardType="email-address"
          ></LoginTextInput>
          <LoginTextInput
            placeholder="Password"
            secureTextEntry
          ></LoginTextInput>
        </View>
        <LoginButton
          title="Continue"
          onPress={() => {
            props.navigation.navigate('Home/Create');
          }}
        />
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
