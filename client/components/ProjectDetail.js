import { Text, View, Pressable, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { BLOND, MIDNIGHT_GREEN, POLISHED_PINE } from '../styles/palette';
import { useState } from 'react';
import { Applicant } from './Applicant';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export function ProjectDetail({ navigation, route }) {
    const projectInfo = route.params.projectInfo
    const [onApplicants, setOnApplicants] = useState(true)
    const [accepted, setAccepted] = useState(projectInfo.participants)
    const [applicants, setApplicants] = useState(projectInfo.applicants)

    return (
        <SafeAreaView
            style={{
                backgroundColor: BLOND,
                flex: 1,
            }}
        >
            <ScrollView style={project.container}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Pressable style={{ display: 'flex', flexDirection: 'row', flex: 2 }} onPress={() => navigation.navigate('Projects')}>
                        <FontAwesomeIcon style={project.backIcon} icon={faChevronLeft} />
                        <Text style={project.header}>{projectInfo.title}</Text>
                    </Pressable>
                    <Pressable style={{ display: 'flex', justifyContent: 'center' }} onPress={() => navigation.navigate('Editing Project', {projectInfo: projectInfo})}>
                        <Text style={{ color: MIDNIGHT_GREEN, alignSelf: 'center' }}>Edit</Text>
                    </Pressable>
                </View>
                <View style={project.card}>
                    <View style={project.information}>
                        <Text style={details.container}>
                            <Text style={{ fontWeight: 'bold' }}>Description: </Text>
                            <Text style={{ fontWeight: '200', fontStyle: 'italic' }}>{projectInfo.description}</Text>
                        </Text>
                        <Text style={details.container}>
                            <Text style={{ fontWeight: 'bold' }}>Number of people wanted: </Text>
                            <Text style={details.greenButton}>{`${projectInfo.membersNeeded} Members`}</Text>
                        </Text>
                        <Text style={details.container}>
                            <Text style={{ fontWeight: 'bold' }}>Skills wanted: </Text>
                            {projectInfo.skillset.map((skill, i) => (
                                <View style={{ margin: '5px' }} key={i}>
                                    <Text style={details.yellowButton}>{skill}</Text>
                                </View>
                            ))}
                        </Text>
                        <Text style={details.timeline}>
                            <Text style={{ fontWeight: 'bold' }}>Timeline: </Text>
                            <Text>{`Approx. ${projectInfo.timeline} months`}</Text>
                        </Text>
                    </View>
                </View>
                <View style={{ display: 'flex' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: '10px', paddingBottom: '15px' }}>
                        <Pressable onPress={() => setOnApplicants(true)} style={{ flex: 1, textAlign: 'center', borderBottomColor: 'black', borderBottomWidth: (onApplicants ? 3 : 1) }}>
                            <Text>Applicants</Text>
                        </Pressable>
                        <Pressable onPress={() => setOnApplicants(false)} style={{ flex: 1, textAlign: 'center', borderBottomColor: 'black', borderBottomWidth: (!onApplicants ? 3 : 1) }}>
                            <Text>Accepted</Text>
                        </Pressable>
                    </View>
                    {onApplicants ? applicants.map((applicant, i) => (
                        <Applicant key={i} userId={applicant} navigation={navigation} isAccepted={false} projectInfo={projectInfo} setAccepted={setAccepted} setApplicants={setApplicants} applicants={applicants} accepted={accepted}/>
                    ))
                        :
                        accepted.map((applicant, i) => (
                            <Applicant key={i} userId={applicant} navigation={navigation} isAccepted={true} projectInfo={projectInfo} setAccepted={setAccepted} setApplicants={setApplicants} applicants={applicants} accepted={accepted}/>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export const project = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
    },
    card: {
        alignItems: 'center',
        display: 'flex',
    },
    header: {
        fontSize: 30,
        fontFamily: 'Poppins-SemiBold',
        color: MIDNIGHT_GREEN,
        flex: 2,
    },
    backIcon: {
        fontFamily: 'Poppins-SemiBold',
        color: MIDNIGHT_GREEN,
        alignSelf: 'center',
        paddingRight: '5px'
    },
    information: {
        margin: '20px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowOffset: { width: 3, height: 4 },
        shadowColor: "#333",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        display: 'flex',
        width: '345px'
    },
    applicant: {
        margin: '20px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowOffset: { width: 3, height: 4 },
        shadowColor: "#333",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        display: 'flex',
        width: '345px',
        flexDirection: 'row'
    }
});

const details = StyleSheet.create({
    container: {
        color: MIDNIGHT_GREEN,
        paddingBottom: '20px',
        fontSize: 14
    },
    timeline: {
        color: MIDNIGHT_GREEN,
        paddingBottom: '10px'
    },
    greenButton: {
        padding: '5px',
        marginLeft: '5px',
        backgroundColor: POLISHED_PINE,
        borderRadius: 5,
        color: 'white'
    },
    yellowButton: {
        padding: '5px',
        backgroundColor: BLOND,
        borderRadius: 5
    }
})
