import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Platform,
} from 'react-native';
import React, { useContext } from 'react';
import { POLISHED_PINE, GAINSBORO, MUSTARD } from '../styles/palette';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import { skillset_list } from '../data/skillsets';
import { BASE_URL } from '../data/util';
import { UserContext } from '../components/UserContext';

export default function CreatePost({ navigation, route }) {
  DropDownPicker.setMode('BADGE');
  DropDownPicker.setListMode('SCROLLVIEW');
  const [title, setTitle] = React.useState(route.params.title || '');
  const [summary, setSummary] = React.useState(route.params.summary || '');
  const [description, setDescription] = React.useState(
    route.params.description || ''
  );
  const [members, setMembers] = React.useState(route.params.members || 3);
  const [skillsets, setSkillsets] = React.useState(
    route.params.skillsets || []
  );
  const [open, setOpen] = React.useState(false);
  const [possibleSkills, setPossibleSkills] = React.useState(skillset_list);
  const [timeline, setTimeline] = React.useState(
    parseInt(route.params.timeline) || 6
  );
  const toast = useToast();
  const { user } = useContext(UserContext);
  const isCreating =
    route.params.isCreating === false ? route.params.isCreating : true; //is this render posting a new project, or editing an old one?

  //verify that all fields are valid
  const verify = () => {
    if (title === '' || summary === '') {
      Alert.alert('Invalid Form', 'All fields must be non-empty.', [
        { text: 'Ok' },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    if (description.length < 50) {
      Alert.alert('Invalid Form', 'Please write a longer description.', [
        { text: 'Ok' },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    return true;
  };

  //post project to db
  const postToDB = async () => {
    const shouldPost = verify();
    if (shouldPost) {
      await fetch(`${BASE_URL}/projects/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          description: description,
          skillset: skillsets,
          timeline: timeline,
          creator: user._id,
          membersNeeded: members,
        }),
      }).catch((error) => console.log(error));

      toast.show('Brainstorm Posted!', {
        type: 'success',
        placement: 'top',
        duration: 'zoom-in',
        duration: 2500,
      });
      navigation.navigate('Home Page');
    }
  };

  //put project to db
  async function editProject(id) {
    const shouldPost = verify();
    if (shouldPost) {
      await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          summary: summary,
          description: description,
          skillset: skillsets,
          timeline: timeline,
          creator: user._id,
          membersNeeded: members,
        }),
      }).catch((error) => console.log(error));

      toast.show('Brainstorm updated!', {
        type: 'success',
        placement: 'top',
        duration: 'zoom-in',
        duration: 2500,
      });
      navigation.navigate('Details', { id: id, fromApps: false });
    }
  }

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={{ alignItems: 'center' }}
      nestedScrollEnabled={true}
    >
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={'Title'}
      />
      <TextInput
        style={styles.input}
        value={summary}
        onChangeText={setSummary}
        placeholder={'Summary'}
      />
      <TextInput
        multiline
        style={[styles.input, { paddingBottom: 20, paddingTop: 20 }]}
        value={description}
        onChangeText={setDescription}
        placeholder={'Description'}
      />
      <View
        style={{
          width: '80%',
          alignItems: 'stretch',
          justifyContent: 'center',
          marginBottom: '5%',
          backgroundColor: 'white',
          padding: '5%',
          borderRadius: '5%',
        }}
      >
        <Text
          style={{
            color: 'gray',
            marginBottom: '1%',
            fontFamily: 'Poppins-Regular',
          }}
        >
          Members needed: {members}
        </Text>
        {Platform.OS === 'web' && (
          <TextInput
            value={members}
            onChangeText={(value) => setMembers(value)}
            placeholder={'Members'}
            keyboardType="number-pad"
            style={styles.input}
          />
        )}
        {Platform.OS !== 'web' && (
          <NumericInput
            value={members}
            onChange={(value) => setMembers(value)}
            totalWidth={240}
            totalHeight={30}
            iconSize={25}
            step={1}
            valueType="real"
            rounded
            textColor={POLISHED_PINE}
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor={POLISHED_PINE}
            leftButtonBackgroundColor={POLISHED_PINE}
          />
        )}
        <Text
          style={{
            color: 'gray',
            marginTop: '10%',
            marginBottom: '1%',
            fontFamily: 'Poppins-Regular',
          }}
        >
          Timeline: {timeline} months
        </Text>
        {Platform.OS === 'web' && (
          <TextInput
            value={timeline}
            onChangeText={(value) => setTimeline(value)}
            placeholder={'Time length'}
            keyboardType="number-pad"
            style={styles.input}
          />
        )}
        {Platform.OS !== 'web' && (
          <NumericInput
            value={timeline}
            onChange={(value) => setTimeline(value)}
            totalWidth={240}
            totalHeight={30}
            iconSize={25}
            step={1}
            valueType="real"
            rounded
            textColor={POLISHED_PINE}
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor={POLISHED_PINE}
            leftButtonBackgroundColor={POLISHED_PINE}
          />
        )}
      </View>
      <DropDownPicker
        multiple={true}
        min={1}
        open={open}
        value={skillsets}
        items={possibleSkills}
        setOpen={setOpen}
        setValue={setSkillsets}
        setItems={setPossibleSkills}
        style={styles.dropdown}
        textStyle={styles.dd_text}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderColor: GAINSBORO,
        }}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={
          isCreating
            ? postToDB
            : () => editProject(route.params.projectId || '')
        }
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            fontFamily: 'Poppins-Bold',
          }}
        >
          {isCreating ? 'Post Brainstorm' : 'Update Brainstorm'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: '5%',
  },
  input: {
    backgroundColor: GAINSBORO,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '80%',
    borderRadius: '5%',
    marginBottom: '5%',
    color: POLISHED_PINE,
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: '5%',
    borderWidth: 0,
  },
  dd_text: {
    fontSize: 14,
    color: POLISHED_PINE,
    fontFamily: 'Poppins-Regular',
  },
  btn: {
    marginTop: '10%',
    backgroundColor: MUSTARD,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  membersInput: {},
});
