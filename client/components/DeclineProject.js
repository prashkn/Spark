//button on homepage to decline the project
import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { GAINSBORO } from '../styles/palette';

export default function DeclineProject() {
  return (
    <View style={styles.btn}>
      <Image source={require('../assets/reject.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: GAINSBORO,
    padding: 20,
    marginTop: '5%',
    borderRadius: 5,
    marginRight: 35,
  },
});
