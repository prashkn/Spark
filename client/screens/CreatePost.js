import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import { POLISHED_PINE, GAINSBORO } from '../styles/palette';
import Tags from 'react-native-tags';

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
      <Tags
        maxNumberOfTags={10}
        style={styles.tagInput}
        initialText=""
        textInputProps={{
          placeholder: 'Skill set required',
        }}
        onChangeTags={(tags) => (skills = tags)}
        containerStyle={{ justifyContent: 'center' }}
        tagContainerStyle={{ fontSize: 15 }}
        inputStyle={{
          backgroundColor: GAINSBORO,
          borderRadius: '5%',
          fontSize: 14,
          color: POLISHED_PINE,
        }}
        renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
          <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
            <View
              style={{
                borderRadius: '5%',
                backgroundColor: '#F1F1F1',
                padding: 5,
                marginRight: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: POLISHED_PINE,
                }}
              >
                {tag}
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
  tagInput: {
    borderRadius: '5%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
