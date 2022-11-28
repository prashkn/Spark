import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { POLISHED_PINE } from '../styles/palette';

export default function CreatePostButton() {
  return (
    <View style={styles.btn}>
      <Image source={require('../assets/create.png')} />
    </View>
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
  },
});
