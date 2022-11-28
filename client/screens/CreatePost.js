import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { POLISHED_PINE, GAINSBORO } from '../styles/palette';

export default function CreatePost() {
  const [title, setTitle] = React.useState('');
  const [biography, setBiography] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [members, setMembers] = React.useState(0);
  const [timeline, setTimeline] = React.useState(); //https://github.com/miblanchard/react-native-slider
  let skills = [];

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={'Title'}
      />
      <TextInput
        style={styles.input}
        value={biography}
        onChangeText={setBiography}
        placeholder={'Biography'}
      />
      <TextInput
        multiline
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder={'Description'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: GAINSBORO,
    paddingHorizontal: 15,
    paddingVertical: 7,
    width: '80%',
    borderRadius: '5%',
    marginBottom: '5%',
    color: POLISHED_PINE,
  },
});
