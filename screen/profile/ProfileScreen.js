import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import { Portal, Modal, Button, TextInput, Badge } from 'react-native-paper';
import { faKey, faArrowRightFromBracket, faUser, faBox, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { FONT } from '../../common/Theme';
import Header from '../components/header/Header';
import ContextButton from '../components/Button/ContextButton';
import { removeLocalStorage } from '../../common/LocalStorage';
import { KEY_LOCAL_TOKEN } from '../../common/Constant';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getLocalAccessToken } from '../authentication/AuthThunk';
import { changePassword, getProfileInformation } from './ProfileThunk';
const Profilescreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const accessToken = useSelector(state => state.auth.accessToken)
  const isLoading = useSelector(state => state.profile.isLoading)
  const profileDetail = useSelector(state => state.profile.profileDetail)
  const isFocus = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const orders = profileDetail.ordersHistory

  //Logout
  const logOut = () => {

    removeLocalStorage(KEY_LOCAL_TOKEN)

    console.log('logging out')
    navigation.navigate('Auth')

  }

  //Edit Profile
  const editProfile = () => {
    navigation.navigate("ProfileView", { profileDetail, accessToken })
  }

  //Change password
  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)



  const confirmChangePassword = () => {
    const newPass = {
      newPassword
    }
    console.log(newPass.password)
    dispatch(changePassword({ token: accessToken, password: newPass }))
    hideModal()

  }

  //View order
  const viewOrder = () => {
    navigation.navigate("Order")
  }

  useEffect(() => {
    dispatch(getProfileInformation(accessToken))
  }, [accessToken, isFocus])




  return (
    <View>
      <Header title="Profile" />
      <Portal>


        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={{ fontFamily: FONT.regular, fontSize: 16, alignSelf: 'center', marginBottom: 8 }}>Type in your new password</Text>
          <TextInput label="New Password" secureTextEntry defaultValue={newPassword} onChangeText={data => setNewPassword(data)} />
          <View style={styles.modalButtonContainer}>
            <Button mode='contained' color='white' onPress={() => hideModal()}>Cancel</Button>
            <Button mode='contained' color='black' onPress={() => confirmChangePassword()}>Confirm</Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.profile}>
        <View style={styles.circleView}>
          <Image source={{ uri: profileDetail.avatar }} resizeMode="contain" style={styles.avatar} />
        </View>
        <Text style={styles.profileName}>{profileDetail.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ContextButton icon={faUser} size={24} color="#000" text="Edit Profile" onPress={editProfile} />
        <ContextButton icon={faKey} size={24} color="#000" text="Change password" onPress={showModal} />
        <ContextButton icon={faBox} size={24} color="#000" text="View Orders" onPress={viewOrder} badge={orders?.length} />
        <ContextButton icon={faArrowRightFromBracket} size={24} color="#EB1D36" text="Logout" onPress={logOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  profileName: {
    fontFamily: FONT.semiBold,
    fontSize: 24,
    marginBottom: 8
  },

  buttonContainer: {
  },

  logoutBtn: {

  },

  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 5
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: 24
  }
});

export default Profilescreen;
