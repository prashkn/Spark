import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import FeedEmpty from '../assets/feed_empty.svg';

export default function EmptyFeed() {
  return (
    <View style={styles.container}>
      <FeedEmpty width={'100%'} height={'50%'} style={styles.img} />
      <Text style={styles.message}>
        This is the end of everyone's brainstorms. Why not create your own?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '80%',
  },
  message: {
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  img: {
    width: '100%',
    height: '50%',
  },
});
