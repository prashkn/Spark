import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import { NewUserInfoContext } from '../components/SignUp';
import { GAINSBORO, MUSTARD } from '../styles/palette';

export default function YourBackground({ navigation }) {
  const { newUserInfo, setNewUserInfo } = useContext(NewUserInfoContext);
  const [progress, setProgress] = useState(90);

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
        <Text>{JSON.stringify(newUserInfo)}</Text>
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
            style={{ height: 125 }}
          />
          <LoginTextInput
            placeholder="Experience"
            multiline={true}
            style={{ height: 125 }}
          />
        </View>

        <LoginButton
          title="Start Brainstorming!"
          onPress={() => {
            navigation.navigate('Root', { screen: 'Home' });
          }}
        />
      </ScrollView>
      {/* </View> */}

      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
