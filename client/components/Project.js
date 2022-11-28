import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

export default function Project() {
    const [openProj, setOpenProj] = useState("");

    return (
        <TouchableHighlight onPress={() => setOpenProj("projectID")}>
            <View style={styles.card}>
                <View style={styles.info}>
                    <Text style={styles.title}>Project Title</Text>
                    <Text numberOfLines={2} style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </View>
                <Text style={styles.arrow} >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        shadowOffset: { width: 3, height: 4 },
        shadowColor: "#333",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    info: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    description: {
        flex: 1,
        color: '#c2c2c2',
        fontFamily: 'Poppins-Italic',
        fontSize: 14
    },
    arrow: {
        alignSelf: 'center',
        paddingRight: 5
    }
})