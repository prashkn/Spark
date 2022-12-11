import { View, Text, StyleSheet } from "react-native";
import React, {  } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

export default function Project(project) {
    const proj = project.project

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>{proj.title}</Text>
                <Text numberOfLines={2} style={styles.description}>{proj.description}</Text>
            </View>
            <Text style={styles.arrow} >
                <FontAwesomeIcon icon={faChevronRight} />
            </Text>
        </View>
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
        width: '345px'
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