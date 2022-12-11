//button on homepage to decline the project
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { GAINSBORO } from '../styles/palette';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DeclineProject({
  setCounter,
  counter,
  swipeLeft,
  project_id,
  user_id,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.btn}
      onPress={() => {
        setCounter(counter + 1);
        swipeLeft(project_id, user_id);
        console.log(project_id);
        console.log(user_id);
      }}
    >
      <Icon name={'close'} color={'white'} size={55} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: GAINSBORO,
    padding: 15,
    marginTop: '20%',
    borderRadius: 5,
    marginRight: 35,
  },
  img: {
    width: '15%',
    height: '15%',
  },
});
