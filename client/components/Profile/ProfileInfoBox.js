import { StyleSheet, Text, View } from 'react-native';
import { MIDNIGHT_GREEN } from '../../styles/palette';

export default function ProfileInfoBox(props) {
  return (
    <View
      style={[
        styles.container,
        props.style, // Use additional styles if specified by parent
      ]}
    >
      {/* Heading */}
      <View style={styles.heading}>
        <Text style={[styles.text, styles.headingText]}>{props.header}</Text>
      </View>

      {/* Content */}
      <View>
        <Text style={[styles.text, styles.contentText]}>{props.children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10, // Rounded corners
    marginBottom: 15, // Vertical spacing between boxes

    // Cool shadow
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: '10px',
    shadowOpacity: 0.10,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: MIDNIGHT_GREEN,
  },
  heading: {
    marginBottom: 5,
  },
  headingText: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 20,
  },
  contentText: {
    fontSize: 15,
  },
});
