import { ScrollView, Text, StyleSheet } from "react-native"
import { MIDNIGHT_GREEN, BLOND } from '../styles/palette';


export const Applications = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>My Applications</Text>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: BLOND,
        flex: 1,
        paddingHorizontal: 18,
    },
    header: {
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        color: MIDNIGHT_GREEN,
    },
})