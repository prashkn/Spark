//button on homepage to decline the project
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { POLISHED_PINE } from '../styles/palette';

export default function AcceptProject() {
  return (
    <View style={styles.btn}>
      <Image source={require('../assets/accept.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: POLISHED_PINE,
    paddingVertical: 21,
    paddingHorizontal: 19,
    marginTop: '5%',
    borderRadius: 5,
    marginLeft: 35,
  },
});
