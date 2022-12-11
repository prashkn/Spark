import { View } from 'react-native';
import { MUSTARD } from '../styles/palette';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default function WarningMessage(props) {
  return (
    <View
      style={{
        backgroundColor: MUSTARD,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
      }}
    >
      <Icon name="warning" size={20} color="black" style={{ marginRight: 5 }} />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: 'black',
          fontSize: 16,
          flex: 1
        }}
      >
        {props.message}
      </Text>
    </View>
  );
}

WarningMessage.propTypes = {
  message: PropTypes.string,
};
