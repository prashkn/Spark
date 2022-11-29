//button on homepage to decline the project
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { POLISHED_PINE } from '../styles/palette';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AcceptProject({
  setCounter,
  counter,
  swipeRight,
  project_id,
  user_id,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.btn}
      onPress={() => {
        setCounter(counter + 1);
        swipeRight(project_id, user_id);
      }}
    >
      <Image source={require('../assets/accept.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: POLISHED_PINE,
    paddingVertical: 21,
    paddingHorizontal: 19,
    marginTop: '20%',
    borderRadius: 5,
    marginLeft: 35,
  },
});
