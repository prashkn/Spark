import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { GAINSBORO, MUSTARD } from '../styles/palette';

export default function YourBackground(props) {
  const [progress, setProgress] = useState(90);
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

      <ScrollView
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
          <LoginTextInput placeholder="Headline"></LoginTextInput>
          <LoginTextInput placeholder="Current Role"></LoginTextInput>
          <LoginTextInput
            placeholder="About me"
            multiline={true}
            style={{ height: 125 }}
          ></LoginTextInput>
          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            style={{ height: 125 }}
          ></LoginTextInput>
          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            style={{ height: 125 }}
          ></LoginTextInput>
          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            style={{ height: 125 }}
          ></LoginTextInput>
          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            style={{ height: 125 }}
          ></LoginTextInput>
        </View>

        <LoginButton
          title="Start Brainstorming!"
          onPress={() => {
            props.navigation.navigate('Home/Create');
          }}
        />
      </ScrollView>
      {/* </View> */}

      <StatusBar style="dark-content" />
    </SafeAreaView>
  );
}
