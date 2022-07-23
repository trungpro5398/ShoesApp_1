import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RadioGroup from 'react-native-radio-buttons-group';
import { TextInput, Button } from 'react-native-paper'
import Header from '../components/header/Header'
import ContextButton from '../components/Button/ContextButton';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileInformation } from './ProfileThunk';
import { FONT } from '../../common/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';



const ProfileView = ({ route, navigation }) => {
    const { profileDetail, accessToken } = route.params
    const [name, setName] = useState(profileDetail.name)
    const [phone, setPhone] = useState(profileDetail.phone)
    const dispatch = useDispatch()






    let genderType = profileDetail.gender //Để map gender từ Profile Screen vào radio buttons

    //Radio option cho gender
    const genderButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: true,
        selected: genderType ? true : false
    }, {
        id: '2',
        label: 'Female',
        value: false,
        selected: genderType ? false : true
    }]


    //Radio button state
    const [genderButton, setGenderButton] = useState(genderButtonsData)
    const onPressGenderButton = radioButtonArray => {
        setGenderButton(radioButtonArray)

    }



    const onPressSaveButton = () => {
        const profile = {
            email: profileDetail.email,
            name,
            phone
        }
        dispatch(editProfileInformation({ token: accessToken, profile: profile }))
        navigation.navigate('Profile')
    }

    const onPressCancelButton = () => {
        navigation.navigate('Profile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.profile}>
                <View style={styles.circleView}>
                    <Image source={{ uri: profileDetail.avatar }} resizeMode="contain" style={styles.avatar} />
                    <TouchableOpacity style={styles.avatarChangeBtn} >
                        <FontAwesomeIcon icon={faCamera} size={20} color={"white"} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.infoContainer}>
                <TextInput value={profileDetail.email} disabled label="Email" />
                <TextInput value={name} label="Name" onChangeText={value => setName(value)} />
                <TextInput value={phone} label="Phone" onChangeText={value => setPhone(value)} keyboardType="phone-pad" />
                <Text style={styles.infoLable}>Gender</Text>
                <RadioGroup
                    onPress={onPressGenderButton}
                    layout="row"
                    radioButtons={genderButton}
                    containerStyle={{ marginTop: 8, marginLeft: 8 }}
                />
                <View style={styles.btnContainer}>

                    <TouchableOpacity style={styles.cancelBtn} onPress={onPressCancelButton}>
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveBtn} onPress={onPressSaveButton}>
                        <Text style={styles.saveBtnText}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    profile: {
        alignItems: 'center'
    },

    circleView: {
        width: 150,
        height: 150,
        margin: 15,
        borderRadius: 75,
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar: {
        width: 140,
        height: 140,
        borderRadius: 75,

    },
    avatarChangeBtn: {
        position: 'absolute',
        right: 5,
        bottom: -10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',

    },


    infoContainer: {
        marginTop: 16
    },

    infoField: {
        width: "95%",
        backgroundColor: "#CFD2CF",
        borderRadius: 5,
        padding: 16,
        margin: 8,
        color: 'black',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black'
    },
    infoFieldDisable: {
        color: 'gray',
        borderWidth: 0,
    },
    infoLable: {
        marginLeft: 8,
        fontSize: 16
    },


    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },


    cancelBtn: {
        alignItems: 'center',
        backgroundColor: 'white',

        padding: 16,
        borderRadius: 10,
        width: "40%",
        margin: 8,
        borderWidth: 1,
        borderColor: "black"
    },
    cancelBtnText: {
        fontFamily: FONT.semiBold,
    },

    saveBtn: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 16,
        borderRadius: 10,
        width: "40%",
        margin: 8
    },
    saveBtnText: {
        fontFamily: FONT.semiBold,

        color: "white"

    },
})