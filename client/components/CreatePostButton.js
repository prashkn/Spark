import { StyleSheet } from 'react-native';
import React from 'react';
import { POLISHED_PINE } from '../styles/palette';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreatePostButton({ navigation, user_id }) {
  return (
    <Icon
      name={'add-circle'}
      size={70}
      color={POLISHED_PINE}
      style={styles.btn}
      onPress={() =>
        navigation.navigate('Create a Brainstorm', {
          user_id: user_id,
        })
      }
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
  },
});
