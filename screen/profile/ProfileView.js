import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

import Header from '../components/header/Header'
const ProfileView = ({ route, navigation }) => {
    const profileDetail = route.params
    console.log(`ProfileView: ${profileDetail}`)
    return (
        <SafeAreaView style={styles.container}>
            <Header />
        </SafeAreaView>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})