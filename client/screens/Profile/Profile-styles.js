import { StyleSheet } from 'react-native';
import { BLOND, MIDNIGHT_GREEN } from '../../styles/palette';

const profilePicSize = 125;

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BLOND },

  // TODO: Use navigation stack bar instead
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: 18,
  },

  scrollContent: { alignItems: 'center' },

  // Container for profile pic, name, username, and location
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10, // Space in between user info and about me, skills, etc.
    alignItems: 'center',

    // When container is big enough, center and constrain width
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
  },

  // Container for name, username, and location
  userInfoTextArea: {
    paddingLeft: 10,
    flex: 1,
  },

  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2,
  },

  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: MIDNIGHT_GREEN,
  },

  poppinsSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: MIDNIGHT_GREEN,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  locationPin: { marginRight: 5 },

  profileInfoBox: {
    // When container is big enough, center and constrain width
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
  },
});
