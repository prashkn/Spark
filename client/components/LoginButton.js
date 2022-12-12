import { Pressable, Text } from 'react-native';
import { MUSTARD } from '../styles/palette';

export default function LoginButton(props) {
  return (
    <Pressable
      style={({ pressed, hovered }) => [
        {
          backgroundColor: pressed
            ? props.backgroundColorPressed || "#ffd333"
            : props.backgroundColor || MUSTARD,
          width: '100%',
          height: 50,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          zIndex: -1
        },
      ]}
      onPress={props.onPress}
    >
      {/* <View> */}
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 22 }}>
        {props.title}
      </Text>
      {/* </View> */}
    </Pressable>
  );
}
