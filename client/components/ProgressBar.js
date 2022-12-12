import { View } from 'react-native';
import PropTypes from 'prop-types';
import { GAINSBORO, MUSTARD } from '../styles/palette';

export default function ProgressBar(props) {
  return (
    <View
      style={{
        display: 'flex',
        alignSelf: 'center',
        width: '100%',
        height: 20,
        backgroundColor: GAINSBORO,
        borderRadius: 10,

        marginTop: 25,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          backgroundColor: MUSTARD,
          width: `${props.progress}%`,
          height: '100%',
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
}
