import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { MIDNIGHT_GREEN, POLISHED_PINE } from '../styles/palette';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreatePostButton({ navigation, user_id }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.btn}
      onPress={() =>
        navigation.navigate('Your Brainstorm', {
          title: '',
          summary: '',
          members: 3,
          skillsets: [],
          timeline: 6,
        })
      }
    >
      {/*<Image style={styles.pencil} source={require('../assets/create.png')} />*/}
      <Icon name={'edit'} size={35} color={'white'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: '50%',
    backgroundColor: MIDNIGHT_GREEN,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.7,
  },
  pencil: {
    width: '40%',
    height: '40%',
  },
});
