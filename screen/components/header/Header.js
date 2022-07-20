import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { faArrowLeft, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FONT } from '../../../common/Theme'
import { useNavigation } from '@react-navigation/native'
const Header = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} color="#000" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.option_button}>
        <FontAwesomeIcon icon={faListUl} color="#000" size={24} />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  back_button: {
    margin: 16,
  },

  option_button: {
    margin: 16
  },

  title: {
    margin: 16,
    fontSize: 24,
    fontWeight: 'bold'

  }

})