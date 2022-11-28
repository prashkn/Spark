import { TextInput } from 'react-native';

export default function LoginTextInput(props) {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        backgroundColor: '#F6F6F6',
        borderColor: '#E8E8E8',
        minHeight: 50,
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
      }}
      placeholderTextColor="#BDBDBD"
      {...props}
    />
  );
}
