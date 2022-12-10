import { View, Text } from 'react-native';
import React from 'react';
import FeedEmpty from '../assets/feed_empty.svg';

export default function EmptyFeed() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '80%',
      }}
    >
      <FeedEmpty height={'50%'} />
      <Text
        style={{
          fontWeight: 'bold',
          marginVertical: 10,
          textAlign: 'center',
          fontSize: 20,
        }}
      >
        This is the end of everyone's brainstorms. Why not create your own?
      </Text>
    </View>
  );
}
