import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from '@react-navigation/elements';
import { MIDNIGHT_GREEN } from '../styles/palette';
import Projects from "./Projects";
import { ProjectDetail } from "../components/ProjectDetail";

export function MyProjects() {
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
                name="MyProjects"
                component={Projects}
                options={{
                    // Hide header on profile page
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Details" component={ProjectDetail} />
        </Stack.Navigator>
    )
}