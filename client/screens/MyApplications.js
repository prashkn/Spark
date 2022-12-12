import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from '@react-navigation/elements';
import { Applications } from './Applications';
import { MIDNIGHT_GREEN } from '../styles/palette';
import { ProjectDetail } from "../components/ProjectDetail";


export const MyApplications = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerTitleStyle: {
                    fontFamily: 'Poppins-SemiBold',
                    color: MIDNIGHT_GREEN,
                },

                // Make header back button green
                headerLeft: () => (
                    <HeaderBackButton
                        tintColor={MIDNIGHT_GREEN}
                        onPress={navigation.goBack}
                    />
                ),
            })}
        >
            <Stack.Screen
                name="Applications"
                component={Applications}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Details"
                component={ProjectDetail}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}
