import React, { useEffect, useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Project from '../components/Project';
import { BLOND, MIDNIGHT_GREEN } from '../styles/palette';
import { Skeleton } from '@rneui/themed';
import { BASE_URL } from '../data/util';


export const Applications = ({ navigation }) => {
    const [applications, setApplications] = useState([]);
    const [projects, setProjects] = useState([])
    const NUM_OF_SKELETONS = 7;

    const getApplications = async (id) => {
        //! get applications
        try {
            const info = await fetch(
                `${BASE_URL}/users/applications?userId=${id}`
            );
            const result = await info.json();
            if (result.data.length === 0) {
                setApplications([]);
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    setApplications(apps => [...apps, result.data[i]]);
                    try {
                        const info2 = await fetch(`${BASE_URL}/projects/${result.data[i].projectId}`)
                        const result2 = await info2.json()
                        setProjects(projects => [...projects, result2.data])
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };


    const skeletons = [];
    for (let i = 0; i < NUM_OF_SKELETONS; i++) {
        skeletons.push(
            <View style={styles.applications} key={i}>
                <View style={styles.card}>
                    <Skeleton animation="wave" width={345} height={90} />
                </View>
            </View>
        );
    }

    useEffect(() => {
        //! change to variable
        getApplications('63823c924a0de95cddc54052');
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: BLOND,
                flex: 1,
            }}
        >
            <ScrollView style={styles.container}>
                <Text style={styles.header}>My Applications</Text>
                {projects.length === 0 ?
                    <View style={{ height: '100%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center' }}>You have not applied to any projects.</Text>
                    </View>
                    :
                    <View style={styles.applications}>
                        {!projects ? (
                            skeletons
                        ) : (
                            projects.map((proj, i) => {
                                console.log(applications[i].status)
                                return (
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('Details', { id: proj._id, fromApps: true })
                                    }
                                    key={i}
                                >
                                    <Project project={proj} status={applications[i].status} />
                                </Pressable>
                                )
                            })
                        )}
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
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
    applications: {
        alignItems: 'center',
        display: 'flex',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        shadowOffset: { width: 3, height: 4 },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
})