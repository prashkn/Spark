import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MIDNIGHT_GREEN } from '../styles/palette';
import styles from '../screens/Profile/Profile-styles';
import { project } from '../components/ProjectDetail'
import ProfileInfoBox from '../screens/Profile/ProfileInfoBox';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export const OtherUser = ({ navigation, route }) => {
    const userInfo = route.params.userInfo
    const projectInfo = route.params.projectInfo
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Top bar area */}
                <View style={styles.topBar}>
                    <Pressable style={{ display: 'flex', flexDirection: 'row', flex: 2 }} onPress={() => navigation.navigate('Details', { projectInfo: projectInfo })}>
                        <FontAwesomeIcon style={project.backIcon} icon={faChevronLeft} />
                        <Text style={project.header}>Back</Text>
                    </Pressable>
                </View>
                {/* User info container with pic, name, username, and location */}
                <View style={styles.userInfoContainer}>
                    {/* Profile pic */}
                    <Image
                        style={{ width: '100px', height: '100px' }}
                        source={require('../assets/profile_pic_placeholder.png')}
                    />

                    {/* Sub-container with name, username, and location */}
                    <View style={styles.userInfoTextArea}>
                        <Text style={styles.name}>{userInfo.name}</Text>
                        <Text style={styles.poppinsSmall}>{`@${userInfo.username}`}</Text>

                        {/* Container for location pin and location name */}
                        <View style={styles.locationContainer}>
                            <Icon
                                name="map-marker"
                                size={30}
                                color={MIDNIGHT_GREEN}
                                style={styles.locationPin}
                            ></Icon>
                            <Text style={styles.poppinsSmall}>{userInfo.location}</Text>
                        </View>
                    </View>
                </View>
                {[
                    {
                        header: 'About me',
                        content: userInfo.bio,
                    },
                    {
                        header: 'Skills',
                        content: userInfo.skills,
                    },
                    {
                        header: 'Experience',
                        content: userInfo.experience
                    },
                ].map((profileInfoBox, i) => (
                    <ProfileInfoBox
                        key={i}
                        header={profileInfoBox.header}
                        style={styles.profileInfoBox}
                    >
                        {profileInfoBox.content}
                    </ProfileInfoBox>
                ))}
                <StatusBar style="dark" />
            </ScrollView>
        </SafeAreaView>
    );
}
