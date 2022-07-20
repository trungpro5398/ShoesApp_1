import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { faInfoCircle, faListUl, faArrowRightFromBracket, faUser, faBox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { FONT } from '../../common/Theme';
import Header from '../components/header/Header';
import ContextButton from '../components/Button/ContextButton';
import { removeLocalStorage } from '../../common/LocalStorage';
import { KEY_LOCAL_TOKEN } from '../../common/Constant';
import { useNavigation } from '@react-navigation/native';
import { getLocalAccessToken } from '../authentication/AuthThunk';
import { getProfileInformation } from './ProfileThunk';
const Profilescreen = () => {
  const dispatch = useDispatch()
  let avatar = "http://svcy3.myclass.vn/images/user-icon.png"
  const navigation = useNavigation()
  const accessToken = useSelector(state => state.auth.accessToken)
  const isLoading = useSelector(state => state.profile.isLoading)
  const profileDetail = useSelector(state => state.profile.profileDetail)
  const logOut = () => {

    removeLocalStorage(KEY_LOCAL_TOKEN)

    console.log('logging out')
    navigation.navigate('Auth')

  }

  const editProfile = () => {
    navigation.navigate("ProfileView", profileDetail)
  }


  useEffect(() => {
    dispatch(getProfileInformation(accessToken))
  }, [accessToken])

  return (
    <View>
      <Header />
      <View style={styles.profile}>
        <View style={styles.circleView}>
          <Image source={{ uri: profileDetail.avatar }} resizeMode="contain" style={styles.avatar} />
        </View>
        <Text style={styles.profileName}>{profileDetail.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ContextButton icon={faUser} size={24} color="#000" text="Edit Profile" onPress={editProfile} />
        <ContextButton icon={faBox} size={24} color="#000" text="View Orders" />
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
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 75,

  },

  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },

  buttonContainer: {
  },

  logoutBtn: {

  },
});

export default Profilescreen;
