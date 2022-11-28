import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import { POLISHED_PINE } from '../styles/palette';

export default function CreatePostButton({ navigation }) {
  return (
    //fix this
    <TouchableHighlight
      style={styles.btn}
      onPress={() => navigation.navigate('Create a Brainstorm')}
    >
      <Image source={require('../assets/create.png')} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: '50%',
    backgroundColor: POLISHED_PINE,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.7,
  },
});
