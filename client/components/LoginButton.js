import { Pressable, Text } from 'react-native';

export default function LoginButton(props) {
  return (
    <Pressable
      style={({ pressed, hovered }) => [
        {
          backgroundColor:
            pressed || hovered
              ? props.backgroundColorPressed
              : props.backgroundColor,
          width: '100%',
          height: 50,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        },
      ]}
    >
      {/* <View> */}
      <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 22 }}>
        {props.title}
      </Text>
      {/* </View> */}
    </Pressable>
  );
}
