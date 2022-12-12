import { DefaultTheme } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GAINSBORO, MIDNIGHT_GREEN } from '../../styles/palette';

export default function Settings({ navigation }) {
  return (
    <ScrollView>
      {/* Map each settings menu to a pressable button and separator */}
      {[
        { name: 'Account Information', icon: 'person-circle-outline' },
        { name: 'Security', icon: 'lock-closed-outline' },
        { name: 'Help', icon: 'help-outline' },
        { name: 'About', icon: 'information-circle-outline' },
        { name: 'Log Out', icon: 'log-out', onPress: () => {const auth = getAuth(); auth.signOut();} },
      ].map((setting, i) => (
        <View key={i}>
          <Pressable
            // Navigate to menu when pressed
            onPress={setting.onPress ? setting.onPress : () => navigation.push(setting.name)}
            style={({ pressed, hovered }) => [
              {
                ...styles.menuButton,

                // Make background color slightly darker when pressed/hovered
                backgroundColor:
                  pressed || hovered
                    ? '#e8e8e8'
                    : DefaultTheme.colors.background,
              },
            ]}
          >
            <Icon
              name={setting.icon}
              size={30}
              color={MIDNIGHT_GREEN}
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>{setting.name}</Text>
          </Pressable>

          {/* Separator */}
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    minHeight: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  menuIcon: { marginRight: 5 },

  menuText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: MIDNIGHT_GREEN,
  },

  separator: {
    borderBottomColor: GAINSBORO,
    borderBottomWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
