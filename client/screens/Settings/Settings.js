import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GAINSBORO, MIDNIGHT_GREEN } from '../../styles/palette';

// TODO: Remove inline styling

export default function Settings({ navigation }) {
  return (
    <ScrollView>
      {[
        { name: 'Account Information', icon: 'person-circle-outline'},
        { name: 'Security', icon: 'lock-closed-outline' },
        { name: 'Help', icon: 'help-outline' },
        { name: 'About', icon: 'information-circle-outline' },
      ].map((setting, i) => (
        <Pressable onPress={() => navigation.push(setting.name)} key={i}>
          <View
            style={{
              minHeight: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              paddingVertical: 15,
            }}
          >
            <Icon
              name={setting.icon}
              size={30}
              color={MIDNIGHT_GREEN}
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: MIDNIGHT_GREEN,
              }}
            >
              {setting.name}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: GAINSBORO,
              borderBottomWidth: 2,
              borderRadius: 10,
              marginHorizontal: 20,
            }}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}
